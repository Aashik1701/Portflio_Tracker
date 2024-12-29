// PortfolioContext.jsx
import { createContext, useContext, useReducer } from 'react';

// Create the context
const PortfolioContext = createContext(undefined);

// Initial state
const initialState = {
  stocks: [
    // Adding some sample data for testing
    {
      id: 1,
      symbol: 'AAPL',
      name: 'Apple Inc.',
      quantity: 10,
      buyPrice: 150.00,
      currentPrice: 175.50
    },
    {
      id: 2,
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      quantity: 5,
      buyPrice: 2800.00,
      currentPrice: 2950.00
    },
    {
      id: 3,
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      quantity: 8,
      buyPrice: 300.00,
      currentPrice: 325.50
    },
    {
      id: 4,
      symbol: 'AMZN',
      name: 'Amazon.com, Inc.',
      quantity: 3,
      buyPrice: 3000.00,
      currentPrice: 3050.00
    },
    {
      id: 5,
      symbol: 'TSLA',
      name: 'Tesla, Inc.',
      quantity: 2,
      buyPrice: 800.00,
      currentPrice: 850.00
    },
    
  ],
  totalValue: 0,
  loading: false,
  error: null
};

// Reducer function
const portfolioReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STOCKS':
      return {
        ...state,
        stocks: action.payload,
        loading: false
      };
    case 'ADD_STOCK':
      return {
        ...state,
        stocks: [...state.stocks, action.payload]
      };
    case 'UPDATE_STOCK':
      return {
        ...state,
        stocks: state.stocks.map(stock => 
          stock.id === action.payload.id ? action.payload : stock
        )
      };
    case 'DELETE_STOCK':
      return {
        ...state,
        stocks: state.stocks.filter(stock => stock.id !== action.payload)
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

// Provider component
export const PortfolioProvider = ({ children }) => {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);

  // Actions
  const addStock = async (stock) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // Simulating API call
      const newStock = {
        ...stock,
        id: Date.now(), // Temporary ID generation
        currentPrice: stock.buyPrice // For demo purposes
      };
      dispatch({ type: 'ADD_STOCK', payload: newStock });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const updateStock = async (id, stock) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // Simulating API call
      const updatedStock = {
        ...stock,
        id,
        currentPrice: stock.buyPrice // For demo purposes
      };
      dispatch({ type: 'UPDATE_STOCK', payload: updatedStock });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const deleteStock = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // Simulating API call
      dispatch({ type: 'DELETE_STOCK', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const value = {
    stocks: state.stocks,
    loading: state.loading,
    error: state.error,
    addStock,
    updateStock,
    deleteStock
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

// Custom hook to use the portfolio context
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

// Make sure to export the context itself if needed
export default PortfolioContext;