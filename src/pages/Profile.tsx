import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePlaces } from '../contexts/PlacesContext';
import Button from '../components/ui/Button';
import RecommendationCard from '../components/ui/RecommendationCard';
import { UserPlus, Settings, MapPin, Calendar, Mail } from 'lucide-react';

// Mock users data
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
  {
    id: '4',
    name: 'Sarah Johnson',
    email: 'sarah@bath.ac.uk',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    bio: 'Business student who loves trying new restaurants and food spots.',
    friendIds: [],
  },
];

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>();
  const { currentUser } = useAuth();
  const { places, getRecommendationsByUserId } = usePlaces();
  
  // If no userId is provided, show current user's profile
  const profileUserId = userId || currentUser?.id;
  
  // Get user data
  const profileUser = mockUsers.find(user => user.id === profileUserId);
  
  // Get user's recommendations
  const recommendations = profileUserId ? getRecommendationsByUserId(profileUserId) : [];
  
  // Check if current user is viewing their own profile
  const isOwnProfile = currentUser?.id === profileUserId;
  
  // Check if users are friends
  const isFriend = currentUser?.friendIds.includes(profileUserId || '') || false;
  
  useEffect(() => {
    document.title = profileUser ? `Spotted - ${profileUser.name}` : 'Spotted - Profile';
  }, [profileUser]);
  
  if (!profileUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">User not found</h2>
        <p className="text-gray-600 mb-8">The user you're looking for doesn't exist or has been removed.</p>
        <Link to="/">
          <Button variant="primary">Return Home</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Cover image */}
        <div className="h-40 bg-gradient-to-r from-coral-400 to-coral-500"></div>
        
        {/* Profile header */}
        <div className="relative px-4 sm:px-6 lg:px-8 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end -mt-12">
            <div className="inline-block h-24 w-24 sm:h-32 sm:w-32 rounded-full ring-4 ring-white overflow-hidden">
              <img
                src={profileUser.avatar}
                alt={profileUser.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4 sm:flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{profileUser.name}</h1>
              <p className="text-gray-600">{profileUser.bio}</p>
            </div>
            
            <div className="mt-4 sm:mt-0">
              {isOwnProfile ? (
                <Button
                  variant="outline"
                  icon={<Settings className="h-4 w-4" />}
                >
                  Edit Profile
                </Button>
              ) : (
                <Button
                  icon={isFriend ? undefined : <UserPlus className="h-4 w-4" />}
                  variant={isFriend ? "outline" : "primary"}
                >
                  {isFriend ? 'Friends' : 'Add Friend'}
                </Button>
              )}
            </div>
          </div>
          
          {/* Profile info */}
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Bath, UK</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Joined April 2024</span>
            </div>
            {isOwnProfile && (
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                <span>{profileUser.email}</span>
              </div>
            )}
          </div>
          
          {/* Stats */}
          <div className="mt-6 flex border-t border-gray-200 pt-6">
            <div className="w-1/3 text-center">
              <span className="block font-semibold text-gray-900">{recommendations.length}</span>
              <span className="text-sm text-gray-500">Recommendations</span>
            </div>
            <div className="w-1/3 text-center border-l border-r border-gray-200">
              <span className="block font-semibold text-gray-900">{profileUser.friendIds.length}</span>
              <span className="text-sm text-gray-500">Friends</span>
            </div>
            <div className="w-1/3 text-center">
              <span className="block font-semibold text-gray-900">32</span>
              <span className="text-sm text-gray-500">Spots Visited</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recommendations */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
        
        {recommendations.length > 0 ? (
          <div className="space-y-6">
            {recommendations.map((recommendation) => {
              const place = places.find(p => p.id === recommendation.placeId);
              
              if (!place) return null;
              
              return (
                <RecommendationCard
                  key={recommendation.id}
                  recommendation={recommendation}
                  user={profileUser}
                  place={place}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recommendations yet</h3>
            <p className="text-gray-500">
              {isOwnProfile 
                ? 'Start spotting places to share recommendations with your friends.'
                : `${profileUser.name} hasn't shared any recommendations yet.`}
            </p>
            {isOwnProfile && (
              <div className="mt-6">
                <Button
                  variant="primary"
                  onClick={() => window.location.href = '/add-spot'}
                >
                  Add Your First Spot
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;