import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { MainPage } from './components/MainPage/MainPage';
import DetailsPage from './components/DetailsPage';
import NotFound from './components/NotFound';
import About from './components/About';
export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="/details/:id" element={<DetailsPage />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
