const Unauthorized = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
      <div className="text-center">
        <div className="inline-block bg-gradient-to-br from-red-500 to-pink-600 p-6 rounded-3xl shadow-2xl mb-6">
          <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Unauthorized Access
        </h1>
        <p className="text-xl text-slate-600 mb-8">
          You don't have permission to access this page
        </p>
        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md mx-auto border-2 border-red-200">
          <p className="text-slate-700 mb-4">
            Please connect your wallet and ensure you have the correct role assigned.
          </p>
          <button className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;