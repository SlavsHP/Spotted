import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Recommendation, User, Place } from '../../types';

interface RecommendationCardProps {
  recommendation: Recommendation;
  user: User;
  place: Place;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, user, place }) => {
  // Format date
  const formattedDate = new Date(recommendation.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 transition-shadow hover:shadow-lg">
      <div className="p-4">
        <div className="flex items-center mb-3">
          <Link to={`/profile/${user.id}`} className="flex-shrink-0">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="h-10 w-10 rounded-full object-cover"
            />
          </Link>
          <div className="ml-3">
            <Link to={`/profile/${user.id}`} className="font-medium text-gray-900 hover:text-coral-500">
              {user.name}
            </Link>
            <div className="flex items-center text-sm text-gray-500">
              <span>Spotted at </span>
              <Link to={`/places/${place.id}`} className="ml-1 text-coral-500 hover:underline">
                {place.name}
              </Link>
            </div>
          </div>
          <div className="ml-auto flex items-center bg-coral-100 text-coral-700 px-2 py-1 rounded-full">
            <Star className="h-4 w-4 fill-current mr-1" />
            <span>{recommendation.rating.toFixed(1)}</span>
          </div>
        </div>
        
        {recommendation.images && recommendation.images.length > 0 && (
          <div className="mb-3 rounded-lg overflow-hidden">
            <img 
              src={recommendation.images[0]} 
              alt="Recommendation"
              className="w-full h-48 object-cover"
            />
          </div>
        )}
        
        <p className="text-gray-700 mb-2">{recommendation.text}</p>
        
        <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
          <span>{formattedDate}</span>
          <div className="flex space-x-2">
            <button className="hover:text-coral-500">Like</button>
            <button className="hover:text-coral-500">Comment</button>
            <button className="hover:text-coral-500">Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;