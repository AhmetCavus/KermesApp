import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MealsPage from "./pages/MealsPage";
import { MealProvider } from './components/MealProvider';
import OrdersPage from './pages/OrdersPage';

const App: React.FC = () => {
  return (
    <MealProvider>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<MealsPage />} />
          <Route path="/aboutus" element={<MealsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </Router>
    </MealProvider>
  );
}

export default App;
