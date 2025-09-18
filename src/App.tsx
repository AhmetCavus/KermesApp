import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MealsPage from "./pages/MealsPage";
import { MealProvider } from './provider/MealContext';
import OrdersPage from './pages/OrdersPage';
import { OrderProvider } from './provider/OrderContext';

const App: React.FC = () => {
  return (
    <MealProvider>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<MealsPage />} />
          <Route path="/aboutus" element={<MealsPage />} />
          <Route path="/orders" element={
            <OrderProvider>
              <OrdersPage />
            </OrderProvider>
          } />
        </Routes>
      </Router>
    </MealProvider>
  );
}

export default App;
