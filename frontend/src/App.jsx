import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx'
import MainApp from './pages/MainApp.jsx'
import SignUpPage from './pages/SignUpPage.jsx'

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<MainApp />} />
          <Route path="/signup" element={<SignUpPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;