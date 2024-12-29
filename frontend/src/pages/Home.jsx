// Home.jsx
import Dashboard from '../components/Dashboard';
import StockList from '../components/StockList';

const Home = () => {
  return (
    <div className="space-y-8">
      <Dashboard />
      <StockList />
    </div>
  );
};

export default Home;