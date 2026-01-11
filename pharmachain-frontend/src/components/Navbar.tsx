import { useWallet } from "../hooks/useWallet";

const Navbar = () => {
  const { address, disconnect, connect } = useWallet();

  return (
    <header className="h-16 bg-white shadow-md flex items-center justify-between px-6">
      <h1 className="text-2xl font-bold text-blue-700">
        PharmaChain 💊
      </h1>

      {!address ? (
        <button
          onClick={connect}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="flex items-center gap-4">
          <span className="text-sm font-mono bg-slate-100 px-3 py-1 rounded">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          <button
            onClick={disconnect}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Disconnect
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
