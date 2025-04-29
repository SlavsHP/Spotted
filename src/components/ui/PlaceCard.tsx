import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { Place } from '../../types';

interface PlaceCardProps {
  place: Place;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  return (
    <Link 
      to={`/places/${place.id}`}
      className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={place.images[0]} 
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-0 right-0 bg-coral-500 text-white px-2 py-1 rounded-bl-lg flex items-center">
          <Star className="h-4 w-4 fill-current mr-1" />
          <span>{place.rating.toFixed(1)}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-semibold text-lg">{place.name}</h3>
          <div className="flex items-center text-white/90 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="truncate">{place.address}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full mb-3">
          {place.category}
        </div>
        <p className="text-gray-600 text-sm line-clamp-2">{place.description}</p>
      </div>
    </Link>
  );
};

export default PlaceCard;