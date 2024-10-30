import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import { Home } from "./components/Home";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
function App() {
  return (
    <NoteState>
      <Router>
        <div className="App">
          <Navbar></Navbar>
          <Alert message="This is amazing React course" />
          <h1>Hello World, This is iNotebook</h1>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
            </Routes>
          </div>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
