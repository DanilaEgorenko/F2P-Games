import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Game from './pages/game';
import Main from './pages/main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Main />} />
        <Route path="game/:id" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;