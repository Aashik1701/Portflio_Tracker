//Dashboard.jsx
import { usePortfolio } from '../context/PortfolioContext';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { stocks, loading, error } = usePortfolio();

  // Calculate portfolio metrics
  const calculateMetrics = () => {
    if (!stocks || stocks.length === 0) {
      return {
        totalValue: 0,
        totalInvestment: 0,
        topPerformer: null
      };
    }

    const totalValue = stocks.reduce((sum, stock) => 
      sum + (stock.quantity * stock.currentPrice), 0);
    
    const totalInvestment = stocks.reduce((sum, stock) => 
      sum + (stock.quantity * stock.buyPrice), 0);
    
    const topPerformer = [...stocks].sort((a, b) => 
      ((b.currentPrice - b.buyPrice) / b.buyPrice) - 
      ((a.currentPrice - a.buyPrice) / a.buyPrice)
    )[0];

    return { totalValue, totalInvestment, topPerformer };
  };

  const { totalValue, totalInvestment, topPerformer } = calculateMetrics();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error loading portfolio data: {error}
      </div>
    );
  }

  // Prepare data for charts
  const chartData = stocks.map(stock => ({
    symbol: stock.symbol,
    quantity: stock.quantity,
    currentValue: stock.quantity * stock.currentPrice,
    currentPrice: stock.currentPrice,
    buyPrice: stock.buyPrice
  }));

  return (
    <div className="space-y-6 p-4">
      {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h3 className="text-gray-500 text-sm font-medium">Total Portfolio Value</h3>
            <p className="text-xl md:text-2xl font-bold text-gray-900">${totalValue.toFixed(2)}</p>
            <p className="text-xs md:text-sm text-gray-600">
          Investment: ${totalInvestment.toFixed(2)}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h3 className="text-gray-500 text-sm font-medium">Number of Stocks</h3>
            <p className="text-xl md:text-2xl font-bold text-gray-900">{stocks.length}</p>
            <p className="text-xs md:text-sm text-gray-600">Active Positions</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h3 className="text-gray-500 text-sm font-medium">Top Performer</h3>
            {topPerformer && (
          <>
            <p className="text-xl md:text-2xl font-bold text-gray-900">{topPerformer.symbol}</p>
            <p className="text-xs md:text-sm text-green-600">
              Gain: {((topPerformer.currentPrice - topPerformer.buyPrice) / 
              topPerformer.buyPrice * 100).toFixed(2)}%
            </p>
          </>
            )}
          </div>
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h3 className="text-gray-500 text-sm font-medium">In Risk</h3>
            {stocks.length > 0 && (
          <>
            <p className="text-xl md:text-2xl font-bold text-gray-900">
              {[...stocks].sort((a, b) => 
            ((a.currentPrice - a.buyPrice) / a.buyPrice) - 
            ((b.currentPrice - b.buyPrice) / b.buyPrice)
              )[0].symbol}
            </p>
            <p className="text-xs md:text-sm text-red-600">
              Loss: {(([...stocks].sort((a, b) => 
            ((a.currentPrice - a.buyPrice) / a.buyPrice) - 
            ((b.currentPrice - b.buyPrice) / b.buyPrice)
              )[0].currentPrice - 
              [...stocks].sort((a, b) => 
            ((a.currentPrice - a.buyPrice) / a.buyPrice) - 
            ((b.currentPrice - b.buyPrice) / b.buyPrice)
              )[0].buyPrice) / 
              [...stocks].sort((a, b) => 
            ((a.currentPrice - a.buyPrice) / a.buyPrice) - 
            ((b.currentPrice - b.buyPrice) / b.buyPrice)
              )[0].buyPrice * 100).toFixed(2)}%
            </p>
          </>
            )}
          </div>
        </div>

        {/* Charts */}
      {stocks.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold mb-4">Portfolio Distribution</h3>
            <div className="h-60 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="symbol" tick={{fontSize: 12}} />
                  <YAxis tick={{fontSize: 12}} />
                  <Tooltip />
                  <Legend wrapperStyle={{fontSize: '12px'}} />
                  <Bar dataKey="currentValue" fill="#3B82F6" name="Current Value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold mb-4">Price Comparison</h3>
            <div className="h-60 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="symbol" tick={{fontSize: 12}} />
                  <YAxis tick={{fontSize: 12}} />
                  <Tooltip />
                  <Legend wrapperStyle={{fontSize: '12px'}} />
                  <Line 
                    type="monotone" 
                    dataKey="currentPrice" 
                    stroke="#3B82F6" 
                    name="Current Price" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="buyPrice" 
                    stroke="#10B981" 
                    name="Buy Price" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;