import { BrowserProvider, Contract, ethers } from "ethers";
import { CONTRACT_ADDRESS } from "./contractAddress";
import PharmaChainABI from "./PharmaChain.json";
import { Role } from "../utils/roles";

export interface ProductData {
  id: number;
  name: string;
  owner: string;
  status: string; // We will convert the enum number to a string
}

declare global {
  interface Window {
    ethereum?: any;
  }
}
/**
 * Returns a connected PharmaChain contract instance
 * using MetaMask as provider + signer
 */

/**
 * Fetches product details by ID
 * @param productId - The ID of the product to track
 */
export const getProduct = async (productId: number): Promise<ProductData> => {
  const contract = await getPharmaChainContract();

  console.log("Checking productId:", productId);

  const exists = await contract.productExists(productId);
  console.log("Exists:", exists);

  if (!exists) {
    throw new Error("Product not found");
  }

  const product = await contract.products(productId);

  const statusMap = ["Created", "In Transit", "Delivered"];

  return {
    id: Number(product.id),
    name: product.name,
    owner: product.owner,
    status: statusMap[Number(product.status)] ?? "Unknown",
  };
};

export const getPharmaChainContract = async (): Promise<Contract> => {
  // 1️⃣ Check if MetaMask is available
  if (!window.ethereum) {
    throw new Error("MetaMask not detected");
  }

  // 2️⃣ Create a provider (read access to blockchain)
  const provider = new BrowserProvider(window.ethereum);

  // 3️⃣ Request wallet connection if not already connected
  await provider.send("eth_requestAccounts", []);

  // 4️⃣ Get signer (write access — send transactions)
  const signer = await provider.getSigner();

  // 5️⃣ Create contract instance
  const contract = new Contract(
    CONTRACT_ADDRESS,
    PharmaChainABI.abi,
    signer
  );

  return contract;
};

/**
 * Get the role of a user from the smart contract
 * @param account - The wallet address to check
 * @returns The user's role
 */
export const getUserRole = async (account: string): Promise<Role> => {
  try {
    const contract = await getPharmaChainContract();

    // Call the contract's getUserRole function
    const roleValue = await contract.getUserRole(account);

    // Convert the returned value to Role enum
    // Assuming the contract returns 0=NONE, 1=MANUFACTURER, 2=DISTRIBUTOR, etc.
    return Number(roleValue) as Role;
  } catch (error) {
    console.error("Error fetching user role:", error);
    return Role.NONE;
  }
};

export async function registerProduct(name: string) {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    PharmaChainABI.abi,
    signer
  );

  const tx = await contract.registerProduct(name);
  await tx.wait();

  return true;
}

export async function transferOwnership(
  productId: number,
  newOwner: string
) {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    PharmaChainABI.abi,
    signer
  );

  const tx = await contract.transferOwnership(productId, newOwner);
  await tx.wait();

  return true;
}

// Add this to interact.ts to debug ownership
export const getProductDetails = async (productId: number) => {
  const contract = await getPharmaChainContract();
  const product = await contract.products(productId);

  console.log("Product ID:", productId);
  console.log("Current Owner:", product.owner);

  return product;
};

export const getContract = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new Contract(CONTRACT_ADDRESS, PharmaChainABI.abi, signer);
};

// ===============================
// TRACK PRODUCT (READ)
// ===============================
export const trackProduct = async (productId: string) => {
  const contract = await getContract();
  const product = await contract.getProduct(productId);

  return {
    id: product[0],
    name: product[1],
    owner: product[2],
    status: Number(product[3]),
    role: Number(product[4]),
  };
};

// ===============================
// SELL PRODUCT (WRITE)
// ===============================
export const sellProduct = async (
  productId: number,
  buyer: string
) => {
  const contract = await getContract();

  // 1️⃣ Transfer ownership
  const tx1 = await contract.transferOwnership(productId, buyer);
  await tx1.wait();

  // 2️⃣ Mark as delivered
  const tx2 = await contract.updateStatus(productId, 2); // 2 = DELIVERED
  await tx2.wait();
};