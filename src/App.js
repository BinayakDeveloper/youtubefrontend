import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import SearchVideo from "./components/SearchVideo.jsx";
import Watch from "./components/Watch.jsx";
import Watchlater from "./components/Watchlater.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import PNF from "./components/PageNotFound.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<SearchVideo />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/watchlater" element={<Watchlater />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PNF />} />
      </Routes>
    </Router>
  );
}

export default App;
