import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login'; 
import Lancamento from './Pages/Lancamento/Lancamento';
import Register from "./Pages/Register/Register";
import Carteira from "./Pages/Carteira/Carteira";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} /> 
          {/*<Route path="/home" element={<Home />} /> */}
          <Route path="/carteira" element={<Carteira />} />
          <Route path="/lancamento" element={<Lancamento />} /> 
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
