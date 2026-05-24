import { useWallet } from "../hooks/useWallet";

const Navbar = () => {
  const { address, disconnect, connect } = useWallet();

  return (
    <header className="h-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-2xl flex items-center justify-between px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-white opacity-5"></div>
      
      <div className="flex items-center gap-3 relative z-10">
        <div className="bg-white p-2 rounded-xl shadow-lg">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          PharmaChain 💊
        </h1>
      </div>

      {!address ? (
        <button
          onClick={connect}
          className="relative z-10 bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          Connect Wallet
        </button>
      ) : (
        <div className="flex items-center gap-4 relative z-10">
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
            <span className="text-sm font-mono text-white font-medium">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          </div>
          <button
            onClick={disconnect}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Disconnect
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;