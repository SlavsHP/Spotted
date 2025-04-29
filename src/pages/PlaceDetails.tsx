import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { usePlaces } from '../contexts/PlacesContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import MapComponent from '../components/ui/Map';
import RecommendationCard from '../components/ui/RecommendationCard';
import { Star, MapPin, Clock, Share2, BookmarkPlus, ThumbsUp, ChevronLeft } from 'lucide-react';

const PlaceDetails: React.FC = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const { getPlaceById, getRecommendationsByPlaceId } = usePlaces();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // New recommendation form state
  const [recommendationText, setRecommendationText] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (!placeId) {
    return <div>Invalid place ID</div>;
  }
  
  const place = getPlaceById(placeId);
  
  if (!place) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Place not found</h2>
        <p className="text-gray-600 mb-8">The place you're looking for doesn't exist or has been removed.</p>
        <Button variant="primary" onClick={() => navigate('/discover')}>
          Discover Places
        </Button>
      </div>
    );
  }
  
  // Get recommendations for this place
  const recommendations = getRecommendationsByPlaceId(placeId);
  
  // Mock users for demo purposes
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
  
  document.title = `Spotted - ${place.name}`;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-coral-500 mb-6"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        <span>Back</span>
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Image gallery */}
        <div className="relative h-64 md:h-96 bg-gray-200">
          {place.images && place.images.length > 0 ? (
            <img
              src={place.images[0]}
              alt={place.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 w-full p-6">
            <h1 className="text-white text-3xl font-bold">{place.name}</h1>
            <div className="flex items-center mt-2">
              <div className="bg-coral-500 text-white px-2 py-1 rounded-md flex items-center">
                <Star className="h-4 w-4 fill-current mr-1" />
                <span>{place.rating.toFixed(1)}</span>
              </div>
              <span className="ml-2 text-white/90">{place.category}</span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <Button
              variant="outline"
              icon={<BookmarkPlus className="h-4 w-4" />}
            >
              Save
            </Button>
            <Button
              variant="outline"
              icon={<Share2 className="h-4 w-4" />}
            >
              Share
            </Button>
            <Button
              variant="outline"
              icon={<ThumbsUp className="h-4 w-4" />}
            >
              Like
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-gray-700">{place.description}</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <MapComponent 
                  places={[place]} 
                  center={place.location}
                  height="300px"
                />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
                
                {currentUser && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 className="font-medium mb-2">Add your recommendation</h3>
                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="text-gray-300 hover:text-coral-500"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              (hoverRating || rating) >= star ? 'text-coral-500 fill-current' : ''
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'Rate this place'}
                      </span>
                    </div>
                    <textarea
                      value={recommendationText}
                      onChange={(e) => setRecommendationText(e.target.value)}
                      placeholder="Share your experience with this place..."
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-coral-500 focus:border-coral-500"
                      rows={3}
                    ></textarea>
                    <div className="mt-3 flex justify-end">
                      <Button disabled={!rating || !recommendationText.trim()}>
                        Post Recommendation
                      </Button>
                    </div>
                  </div>
                )}
                
                {recommendations.length > 0 ? (
                  <div className="space-y-6">
                    {recommendations.map((recommendation) => {
                      const user = mockUsers.find((u) => u.id === recommendation.userId);
                      
                      if (!user) return null;
                      
                      return (
                        <RecommendationCard
                          key={recommendation.id}
                          recommendation={recommendation}
                          user={user}
                          place={place}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No recommendations yet. Be the first to recommend!</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-4 sticky top-20">
                <h3 className="font-semibold mb-4">Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-coral-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{place.address}</span>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-coral-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">Opening Hours</p>
                      <p className="text-sm text-gray-500">Mon-Fri: 9:00 - 18:00</p>
                      <p className="text-sm text-gray-500">Sat-Sun: 10:00 - 16:00</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-medium mb-2">Spotted by</h4>
                    <div className="flex flex-wrap -mx-1">
                      {recommendations.slice(0, 5).map((rec) => {
                        const user = mockUsers.find((u) => u.id === rec.userId);
                        
                        if (!user) return null;
                        
                        return (
                          <Link
                            key={rec.id}
                            to={`/profile/${user.id}`}
                            className="mx-1 mb-1"
                          >
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="h-8 w-8 rounded-full object-cover"
                              title={user.name}
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  
                  <Button fullWidth>
                    Plan a Visit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;