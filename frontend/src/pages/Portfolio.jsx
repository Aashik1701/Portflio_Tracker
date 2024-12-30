// src/components/Portfolio.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const Portfolio = () => {
    const [stock, setStock] = useState(null);
    const [portfolio, setPortfolio] = useState({});
    const [searchSymbol, setSearchSymbol] = useState('');
    const [allStocks, setAllStocks] = useState([]); // To hold all available stocks

    // Function to fetch stock data
    const fetchStockData = async (symbol) => {
        const apiKey = 'DS96KDC5Z0M7XNU3'; // Replace with your API key
        const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

        try {
            const response = await axios.get(apiUrl);
            console.log(response.data); // Log the full response
            const data = response.data['Global Quote'];
            if (data) {
                setStock({
                    symbol: data['01. symbol'],
                    price: parseFloat(data['05. price']),
                    high: parseFloat(data['03. high']),
                    low: parseFloat(data['04. low'])
                });
            } else {
                setStock(null);
                alert('Stock data not found.');
            }
        } catch (error) {
            console.error('Error fetching stock data:', error);
            setStock(null);
            alert('Failed to fetch stock data. Please try again.');
        }
    };

    // Function to buy stock
    const buyStock = () => {
        if (stock && stock.symbol) {
            setPortfolio((prevPortfolio) => {
                const newPortfolio = { ...prevPortfolio };
                if (newPortfolio[stock.symbol]) {
                    newPortfolio[stock.symbol].shares += 1;
                } else {
                    newPortfolio[stock.symbol] = {
                        shares: 1,
                        price: stock.price
                    };
                }
                return newPortfolio;
            });
        }
    };

    // Function to sell stock
    const sellStock = () => {
        if (stock && stock.symbol && portfolio[stock.symbol]) {
            setPortfolio(( prevPortfolio) => {
                const newPortfolio = { ...prevPortfolio };
                if (newPortfolio[stock.symbol].shares > 1) {
                    newPortfolio[stock.symbol].shares -= 1;
                } else {
                    delete newPortfolio[stock.symbol];
                }
                return newPortfolio;
            });
        }
    };

    // Function to handle stock search
    const handleSearch = () => {
        if (searchSymbol.trim() !== '') {
            fetchStockData(searchSymbol.trim().toUpperCase());
        }
    };

    // Fetch all available stocks (this is a placeholder, replace with your logic)
    useEffect(() => {
        const fetchAllStocks = async () => {
            // Replace with your logic to fetch all available stocks
            const availableStocks = ['AAPL']; // Example stock symbols
            const stockData = await Promise.all(availableStocks.map(symbol => fetchStockData(symbol)));
            setAllStocks(stockData);
        };

        fetchAllStocks();
    }, []);

    return (
        <div className="space-y-6 p-4">
            {/* Header Section */}
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Stock Trading Platform</h1>
                
                {/* Search Section */}
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={searchSymbol}
                        onChange={(e) => setSearchSymbol(e.target.value)}
                        placeholder="Enter stock symbol (e.g., AAPL)"
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button 
                        onClick={handleSearch}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Search
                    </button>
                </div>

                {/* Stock Info Card */}
                <div className="bg-gray-50 rounded-lg p-4">
                    {stock ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h3 className="text-gray-500 text-sm font-medium">Symbol</h3>
                                <p className="text-xl font-bold text-gray-900">{stock.symbol}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h3 className="text-gray-500 text-sm font-medium">Current Price</h3>
                                <p className="text-xl font-bold text-gray-900">${stock.price.toFixed(2)}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h3 className="text-gray-500 text-sm font-medium">Day High</h3>
                                <p className="text-xl font-bold text-green-600">${stock.high.toFixed(2)}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h3 className="text-gray-500 text-sm font-medium">Day Low</h3>
                                <p className="text-xl font-bold text-red-600">${stock.low.toFixed(2)}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-4">Search for a stock to view details</p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-4">
                    <button 
                        onClick={buyStock} 
                        disabled={!stock}
                        className="flex-1 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                        Buy Stock
                    </button>
                    <button 
                        onClick={sellStock} 
                        disabled={!stock}
                        className="flex-1 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                        Sell Stock
                    </button>
                </div>
            </div>

            {/* Portfolio Section */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Your Portfolio</h2>
                    {Object.keys(portfolio).length > 0 ? (
                        <div className="divide-y divide-gray-200">
                            {Object.entries(portfolio ).map(([symbol, data]) => (
                                <div key={symbol} className="py-3">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">{symbol}</span>
                                        <span className="text-gray-600">
                                            {data.shares} shares @ ${data.price.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-4">No stocks in your portfolio</p>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Available Stocks</h2>
                    <div className="divide-y divide-gray-200">
                        {allStocks.map((stock) => (
                            <div key={stock.symbol} className="py-3">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">{stock.symbol}</span>
                                    <span className="text-gray-600">${stock.price.toFixed(2)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;