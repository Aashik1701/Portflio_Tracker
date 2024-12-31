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
        const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=demo`;

        try {
            const response = await axios.get(apiUrl);
            const data = response.data['Global Quote'];
            if (data) {
                return {
                    symbol: data['01. symbol'],
                    price: parseFloat(data['05. price']),
                    high: parseFloat(data['03. high']),
                    low: parseFloat(data['04. low']),
                };
            } else {
                alert('Stock data not found.');
                return null;
            }
        } catch (error) {
            console.error('Error fetching stock data:', error);
            alert('Failed to fetch stock data. Please try again.');
            return null;
        }
    };

    // Function to fetch all available stocks
    const fetchAllStocks = async () => {
        const availableStocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA']; // Example stock symbols
        const stockDataPromises = availableStocks.map(symbol => fetchStockData(symbol));
        const stockData = await Promise.all(stockDataPromises);
        setAllStocks(stockData.filter(stock => stock !== null)); // Filter out any null responses
    };

    // Fetch all available stocks on component mount
    useEffect(() => {
        fetchAllStocks();
    }, []);

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
            setPortfolio((prevPortfolio) => {
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
            fetchStockData(searchSymbol.trim().toUpperCase()).then(data => {
                if (data) {
                    setStock(data);
                }
            });
        }
    };

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
                        className ="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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
                            {Object.entries(portfolio).map(([symbol, data]) => (
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
                
                {/* Available Stocks */}
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