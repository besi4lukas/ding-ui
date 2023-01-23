import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePageComponent from "./components/homePage";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePageComponent />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
