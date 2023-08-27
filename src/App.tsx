import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import Game from './pages/game';
import Main from './pages/main';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Main />} />
          <Route path="game/:id" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;