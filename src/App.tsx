import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { SearchPage } from './pages/SearchPage';
import { AnimeDetailPage } from './pages/AnimeDetailPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/anime/:id" element={<AnimeDetailPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;