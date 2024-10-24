import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import { Home } from "./components/Home";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <h1>Hello World, This is iNotebook</h1>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/notes" element={<About />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
