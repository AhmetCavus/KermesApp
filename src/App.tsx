import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MealsPage from "./pages/MealsPage";
import { MealProvider } from './components/MealProvider';

const App: React.FC = () => {
  return (
    <MealProvider>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<MealsPage />} />
        </Routes>
      </Router>
    </MealProvider>
  );
}

export default App;
