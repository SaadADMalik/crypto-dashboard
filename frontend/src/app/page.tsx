export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Welcome to Crypto Dashboard
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400">
          Real-time cryptocurrency tracking with portfolio management
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          <div className="p-6 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">50+</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">Cryptocurrencies</div>
          </div>
          
          <div className="p-6 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">Real-time</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">Price Updates</div>
          </div>
          
          <div className="p-6 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">Portfolio</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">Management</div>
          </div>
        </div>

        <div className="pt-8">
          <a
            href="/coins"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition shadow-lg"
          >
            View Markets
          </a>
        </div>
      </div>
    </div>
  );
}