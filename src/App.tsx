import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PlacesProvider } from './contexts/PlacesContext';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Discover from './pages/Discover';
import PlaceDetails from './pages/PlaceDetails';
import NotFound from './pages/NotFound';
import Friends from './pages/Friends';
import AddSpot from './pages/AddSpot';

function App() {
  return (
    <AuthProvider>
      <PlacesProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <NavBar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:userId" element={<Profile />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/places/:placeId" element={<PlaceDetails />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/add-spot" element={<AddSpot />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </PlacesProvider>
    </AuthProvider>
  );
}

export default App;