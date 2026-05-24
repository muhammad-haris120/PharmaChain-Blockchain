import { BrowserProvider, Contract, ethers } from "ethers";
import { CONTRACT_ADDRESS } from "./contractAddress";
import PharmaChainABI from "./PharmaChain.json";
import { Role } from "../utils/roles";

// ===============================
// STATUS MAP (MUST MATCH SOLIDITY)
// ===============================
export const STATUS_MAP = ["Registered", "Distributed", "Retailing", "Sold"];

// ===============================
// TYPES
// ===============================
export interface ProductData {
  id: number;
  name: string;
  owner: string;
  status: string;

  registeredAt: Date;
  distributedAt?: Date;
  retailingAt?: Date;
  soldAt?: Date;

  lastTransferAt: Date;
}

// ===============================
// PRODUCT ACTIVITY (EVENT LOG)
// ===============================
export interface ProductActivity {
  type: "REGISTERED" | "TRANSFER" | "STATUS";
  from?: string;
  to?: string;
  status?: string;
  time: Date;
}

// ===============================
// METAMASK CHECK
// ===============================
declare global {
  interface Window {
    ethereum?: any;
  }
}

// ===============================
// CONTRACT INSTANCE
// ===============================
export const getPharmaChainContract = async (): Promise<Contract> => {
  if (!window.ethereum) {
    throw new Error("MetaMask not detected");
  }

  const provider = new BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();

  return new Contract(CONTRACT_ADDRESS, PharmaChainABI.abi, signer);
};

// ===============================
// READ PRODUCT (MAIN TRACKING API)
// ===============================
export const getProduct = async (productId: number): Promise<ProductData> => {
  const contract = await getPharmaChainContract();
  const p = await contract.products(productId);

  if (p.owner === ethers.ZeroAddress) {
    throw new Error("Product does not exist");
  }

  return {
    id: Number(p.id),
    name: p.name,
    owner: p.owner,
    status: STATUS_MAP[Number(p.status)],

    registeredAt: new Date(Number(p.registeredAt) * 1000),
    distributedAt:
      Number(p.distributedAt) > 0
        ? new Date(Number(p.distributedAt) * 1000)
        : undefined,
    retailingAt:
      Number(p.retailingAt) > 0
        ? new Date(Number(p.retailingAt) * 1000)
        : undefined,
    soldAt:
      Number(p.soldAt) > 0
        ? new Date(Number(p.soldAt) * 1000)
        : undefined,

    lastTransferAt: new Date(Number(p.lastTransferAt) * 1000),
  };
};

// ===============================
// USER ROLE
// ===============================
export const getUserRole = async (account: string): Promise<Role> => {
  try {
    const contract = await getPharmaChainContract();
    const roleValue = await contract.roles(account);
    return Number(roleValue) as Role;
  } catch (err) {
    console.error("Role fetch failed", err);
    return Role.NONE;
  }
};

// ===============================
// REGISTER PRODUCT
// ===============================
export const registerProduct = async (name: string): Promise<void> => {
  const contract = await getPharmaChainContract();
  const tx = await contract.registerProduct(name);
  await tx.wait();
};

// ===============================
// TRANSFER OWNERSHIP
// ===============================
export const transferOwnership = async (
  productId: number,
  newOwner: string
): Promise<void> => {
  const contract = await getPharmaChainContract();
  const tx = await contract.transferOwnership(productId, newOwner);
  await tx.wait();
};

// ===============================
// SELL PRODUCT (RETAILER)
// ===============================
export const sellProduct = async (
  productId: number,
  buyer: string
): Promise<void> => {
  const contract = await getPharmaChainContract();
  const tx = await contract.sellProduct(productId, buyer);
  await tx.wait();
};

// ===============================
// READ PRODUCT ACTIVITY (EVENTS)
// ===============================
export const getProductActivity = async (
  productId: number
): Promise<ProductActivity[]> => {
  const contract = await getPharmaChainContract();

  // Fetch events
  const registeredEvents = await contract.queryFilter(
    contract.filters.ProductRegistered(productId)
  );

  const transferEvents = await contract.queryFilter(
    contract.filters.OwnershipTransferred(productId)
  );

  const statusEvents = await contract.queryFilter(
    contract.filters.StatusUpdated(productId)
  );

  const activities: ProductActivity[] = [];

  // Product Registered
  for (const e of registeredEvents) {
    if (!("args" in e) || !e.args) continue;
    const { time } = e.args;
    activities.push({
      type: "REGISTERED",
      time: new Date(Number(time) * 1000),
    });
  }

  // Ownership Transfers
  for (const e of transferEvents) {
    if (!("args" in e) || !e.args) continue;
    const { oldOwner, newOwner, time } = e.args;
    activities.push({
      type: "TRANSFER",
      from: oldOwner,
      to: newOwner,
      time: new Date(Number(time) * 1000),
    });
  }

  // Status Updates
  for (const e of statusEvents) {
    if (!("args" in e) || !e.args) continue;
    const { status, time } = e.args;
    activities.push({
      type: "STATUS",
      status: STATUS_MAP[Number(status)],
      time: new Date(Number(time) * 1000),
    });
  }

  // Sort chronologically
  activities.sort((a, b) => a.time.getTime() - b.time.getTime());

  return activities;
};
