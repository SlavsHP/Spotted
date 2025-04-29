import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePlaces } from '../contexts/PlacesContext';
import RecommendationCard from '../components/ui/RecommendationCard';
import MapComponent from '../components/ui/Map';
import Button from '../components/ui/Button';
import { MapPin, SearchIcon, PlusCircle } from 'lucide-react';

const Home: React.FC = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const { places, recommendations, getFriendRecommendations } = usePlaces();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Spotted - Home';
  }, []);

  // If not authenticated, show landing page
  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen">
        {/* Hero Section */}
        <div 
          className="relative h-screen flex items-center justify-center bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/935835/pexels-photo-935835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Discover Local Spots from Friends You Trust
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Spotted connects you with authentic recommendations from your friends, making it easy to discover the best places in your city.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/register')}
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-transparent border-white text-white hover:bg-white/10"
                onClick={() => navigate('/login')}
              >
                Log In
              </Button>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How Spotted Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A new way to discover places you'll love, based on recommendations from people you trust.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-coral-500 mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-coral-100">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Discover Local Places</h3>
                <p className="text-gray-600">
                  Find hidden gems and popular spots in your city with our interactive map.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-coral-500 mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-coral-100">
                  <SearchIcon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Friend Recommendations</h3>
                <p className="text-gray-600">
                  See what places your friends recommend instead of relying on reviews from strangers.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-coral-500 mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-coral-100">
                  <PlusCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Share Your Favorites</h3>
                <p className="text-gray-600">
                  Recommend places you love and help your friends discover amazing experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* App Preview Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Your City Like Never Before</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Spotted makes it easy to discover new restaurants, cafés, shops, and activities based on what your friends recommend.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Find Places Your Friends Love</h3>
                <p className="text-gray-600 mb-6">
                  Instead of generic reviews from strangers, see recommendations from people you trust. Spotted helps you discover places that match your preferences through your social connections.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-coral-500 flex items-center justify-center text-white text-sm font-medium">✓</div>
                    <p className="ml-3 text-gray-600">Personalized recommendations from your network</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-coral-500 flex items-center justify-center text-white text-sm font-medium">✓</div>
                    <p className="ml-3 text-gray-600">Interactive map of recommended spots</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-coral-500 flex items-center justify-center text-white text-sm font-medium">✓</div>
                    <p className="ml-3 text-gray-600">Plan meetups and share favorite places</p>
                  </li>
                </ul>
                <div className="mt-8">
                  <Button onClick={() => navigate('/register')}>
                    Join Spotted Today
                  </Button>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden shadow-xl">
                <MapComponent places={places.slice(0, 5)} height="400px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If authenticated, show feed of recommendations from friends
  const friendIds = currentUser?.friendIds || [];
  const friendRecommendations = getFriendRecommendations(friendIds);
  
  // Sort recommendations by date (newest first)
  const sortedRecommendations = [...friendRecommendations].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4 sticky top-20">
            <div className="flex items-center mb-4">
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="h-12 w-12 rounded-full object-cover mr-3"
              />
              <div>
                <h2 className="font-semibold">{currentUser?.name}</h2>
                <p className="text-sm text-gray-500">University of Bath</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium mb-2">Your Activity</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button className="text-gray-600 hover:text-coral-500 w-full text-left">
                    Your recommendations
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 hover:text-coral-500 w-full text-left">
                    Saved places
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 hover:text-coral-500 w-full text-left">
                    Recent activity
                  </button>
                </li>
              </ul>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="font-medium mb-2">Explore</h3>
              <div className="bg-gray-50 rounded-lg p-3">
                <MapComponent 
                  places={places.slice(0, 3)} 
                  height="150px"
                  onMarkerClick={(placeId) => navigate(`/places/${placeId}`)}
                />
                <Button
                  variant="text"
                  fullWidth
                  className="mt-2"
                  onClick={() => navigate('/discover')}
                >
                  View Full Map
                </Button>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="font-medium mb-2">Quick Access</h3>
              <Button
                variant="primary"
                icon={<PlusCircle className="h-4 w-4" />}
                fullWidth
                className="mb-2"
                onClick={() => navigate('/add-spot')}
              >
                Add New Spot
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-6">Your Feed</h1>
          
          {sortedRecommendations.length > 0 ? (
            sortedRecommendations.map(recommendation => {
              const user = mockUsers.find(user => user.id === recommendation.userId);
              const place = places.find(place => place.id === recommendation.placeId);
              
              if (!user || !place) return null;
              
              return (
                <RecommendationCard
                  key={recommendation.id}
                  recommendation={recommendation}
                  user={user}
                  place={place}
                />
              );
            })
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-xl font-semibold mb-2">No recommendations yet</h2>
              <p className="text-gray-600 mb-4">
                Connect with friends or add your own spots to see recommendations here.
              </p>
              <div className="flex justify-center space-x-4">
                <Button 
                  variant="primary"
                  onClick={() => navigate('/friends')}
                >
                  Find Friends
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/add-spot')}
                >
                  Add a Spot
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Mock users for display in the feed
const mockUsers = [
  {
    id: '1',
    name: 'Ethan Humphrey',
    email: 'ethan@bath.ac.uk',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100',
    bio: 'Sociology student at University of Bath. Love discovering new cafés!',
    friendIds: ['2', '3'],
  },
  {
    id: '2',
    name: 'Emma Wilson',
    email: 'emma@bath.ac.uk',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100',
    bio: 'English Literature student. Always on the lookout for cozy reading spots.',
    friendIds: ['1', '3'],
  },
  {
    id: '3',
    name: 'Michael Lee',
    email: 'michael@bath.ac.uk',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
    bio: 'Computer Science student with a passion for good coffee and tech events.',
    friendIds: ['1', '2'],
  },
];

export default Home;