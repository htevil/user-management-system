// App.js
// Import necessary components from their respective files
import './App.css';
import {Routes, Route } from 'react-router-dom';
import Home from "./Page/Home";
import Detail from "./Page/Detail";
import "bootstrap/dist/css/bootstrap.min.css"

// Define the App component as a functional component
function App() {
  // JSX for routing using Routes and Route components
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Detail/:username" element={<Detail />} />
    </Routes>
  );
}

export default App;
