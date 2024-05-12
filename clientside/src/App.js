import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home/Home';
import Editing from './components/editing/Editing';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/editing' element={<Editing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
