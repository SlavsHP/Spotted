import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import { Search, UserPlus, UserCheck, UserX } from 'lucide-react';

interface MockUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  friendIds: string[];
}

const Friends: React.FC = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [friendTab, setFriendTab] = useState<'friends' | 'suggestions'>('friends');
  
  useEffect(() => {
    document.title = 'Spotted - Friends';
  }, []);
  
  // Mock users data
  const mockUsers: MockUser[] = [
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
    {
      id: '5',
      name: 'Daniel Brown',
      email: 'daniel@bath.ac.uk',
      avatar: 'https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=100',
      bio: 'Architecture student interested in design shops and creative spaces.',
      friendIds: [],
    },
    {
      id: '6',
      name: 'Olivia Chen',
      email: 'olivia@bath.ac.uk',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
      bio: 'Physics student who enjoys quiet study spots and science events.',
      friendIds: [],
    },
  ];
  
  if (!currentUser) {
    return <div>Please log in to view friends</div>;
  }
  
  // Get current user's friends
  const userFriends = mockUsers.filter(user => 
    currentUser.friendIds.includes(user.id)
  );
  
  // Get friend suggestions (users who aren't already friends with the current user)
  const friendSuggestions = mockUsers.filter(user => 
    user.id !== currentUser.id && !currentUser.friendIds.includes(user.id)
  );
  
  // Filter based on search term
  const filteredUsers = (friendTab === 'friends' ? userFriends : friendSuggestions)
    .filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Friends</h1>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => setFriendTab('friends')}
            className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
              friendTab === 'friends'
                ? 'bg-coral-500 text-white border-coral-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Your Friends
          </button>
          <button
            type="button"
            onClick={() => setFriendTab('suggestions')}
            className={`px-4 py-2 text-sm font-medium rounded-r-md border ${
              friendTab === 'suggestions'
                ? 'bg-coral-500 text-white border-coral-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Suggestions
          </button>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search friends..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-coral-500 focus:border-coral-500 sm:text-sm w-full"
          />
        </div>
      </div>
      
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-5">
                <div className="flex items-start">
                  <Link to={`/profile/${user.id}`} className="flex-shrink-0">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </Link>
                  <div className="ml-4 flex-1">
                    <Link to={`/profile/${user.id}`} className="text-lg font-medium text-gray-900 hover:text-coral-500">
                      {user.name}
                    </Link>
                    <p className="mt-1 text-sm text-gray-500">{user.bio}</p>
                  </div>
                  
                  {friendTab === 'friends' ? (
                    <button
                      className="inline-flex items-center text-gray-400 hover:text-gray-500"
                      title="Remove friend"
                    >
                      <UserX className="h-5 w-5" />
                    </button>
                  ) : (
                    <Button
                      size="sm"
                      icon={<UserPlus className="h-4 w-4" />}
                    >
                      Add Friend
                    </Button>
                  )}
                </div>
                
                {friendTab === 'friends' && (
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Friends since Apr 2024
                    </span>
                    <div className="flex space-x-2">
                      <button className="text-xs text-coral-500 hover:text-coral-600">
                        View shared spots
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          {friendTab === 'friends' ? (
            <>
              <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No friends found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm ? 'Try adjusting your search to find your friends.' : 'Add friends to see their recommendations.'}
              </p>
              <Button
                variant="primary"
                onClick={() => setFriendTab('suggestions')}
              >
                Find Friends
              </Button>
            </>
          ) : (
            <>
              <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No suggestions found</h3>
              <p className="text-gray-500">
                {searchTerm ? 'Try adjusting your search to find new friends.' : 'We\'ll suggest new friends as they join Spotted.'}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Friends;