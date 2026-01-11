import { createContext, useEffect, useState } from "react";
import { BrowserProvider } from "ethers";

export interface WalletContextType {
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  provider: BrowserProvider | null;
}

export const WalletContext = createContext<WalletContextType>({
  address: null,
  connect: async () => {},
  disconnect: () => {},
  provider: null,
});

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);

  const connect = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected");
      return;
    }
    const prov = new BrowserProvider(window.ethereum);
    const accounts = await prov.send("eth_requestAccounts", []);
    setAddress(accounts[0]);
    setProvider(prov);
  };

  const disconnect = () => {
    setAddress(null);
    setProvider(null);
  };

  return (
    <WalletContext.Provider value={{ address, connect, disconnect, provider }}>
      {children}
    </WalletContext.Provider>
  );
};
