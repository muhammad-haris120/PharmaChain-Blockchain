/**
 * Type definitions for MetaMask window.ethereum object
 * This allows TypeScript to recognize the ethereum property on the window object
 */

interface EthereumProvider {
  isMetaMask?: boolean;
  request(args: { method: string; params?: unknown[] }): Promise<unknown>;
  send(method: string, params: unknown[]): Promise<unknown>;
  on(eventName: string, listener: (...args: unknown[]) => void): void;
  removeListener(eventName: string, listener: (...args: unknown[]) => void): void;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export {};
