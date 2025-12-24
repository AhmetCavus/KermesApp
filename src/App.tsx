import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MealsPage from "./pages/MealsPage";
import { MealProvider } from "./provider/MealContext";
import OrdersPage from "./pages/OrdersPage";
import { OrderProvider } from "./provider/OrderContext";
import AboutusPage from "./pages/AboutusPage";
import Imprint from "./pages/Imprint";
import { AuthProvider } from "./provider/DataContext";
import ProjectPage from "./pages/ProjectPage";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MealProvider>
        <Router basename="/kermes">
          <Routes>
            <Route path="/" element={<MealsPage />} />
            <Route path="/aboutus" element={<AboutusPage />} />
            <Route path="/project" element={<ProjectPage />} />
            <Route
              path="/orders"
              element={
                <OrderProvider>
                  <OrdersPage />
                </OrderProvider>
              }
            />
            <Route path="/imprint" element={<Imprint />} />
          </Routes>
        </Router>
      </MealProvider>
    </AuthProvider>
  );
};

export default App;
