import React, { useRef, useEffect, useState } from 'react';
import { Place } from '../../types';
import { MapPin } from 'lucide-react';

interface MapComponentProps {
  places: Place[];
  center?: { lat: number; lng: number };
  onMarkerClick?: (placeId: string) => void;
  height?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  places, 
  center = { lat: 51.3837, lng: -2.3599 }, // Default center (Bath)
  onMarkerClick,
  height = '400px'
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

  // In a real implementation, this would use Mapbox, Google Maps, or Leaflet
  // For this MVP, we'll create a visual representation with CSS

  const handleMarkerClick = (placeId: string) => {
    setSelectedPlace(placeId === selectedPlace ? null : placeId);
    if (onMarkerClick) {
      onMarkerClick(placeId);
    }
  };

  return (
    <div className="relative rounded-lg overflow-hidden" style={{ height }}>
      {/* Simulated map background */}
      <div 
        ref={mapRef}
        className="w-full h-full bg-teal-50 relative" 
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/1036644/pexels-photo-1036644.jpeg?auto=compress&cs=tinysrgb&w=1200)', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(50%)'
        }}
      >
        {/* Overlay to lighten the background image */}
        <div className="absolute inset-0 bg-white/30"></div>
        
        {/* Place markers */}
        {places.map((place) => {
          // Calculate position based on lat/lng
          // In a real map implementation, these would be positioned properly
          // For our mock, we'll position them randomly within the container
          const randomLeft = Math.floor(Math.random() * 80) + 10; // 10-90%
          const randomTop = Math.floor(Math.random() * 80) + 10; // 10-90%
          
          const isSelected = selectedPlace === place.id;
          
          return (
            <div 
              key={place.id}
              className={`absolute z-10 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer
                ${isSelected ? 'z-20 scale-110' : 'hover:scale-110'}`}
              style={{ 
                left: `${randomLeft}%`, 
                top: `${randomTop}%` 
              }}
              onClick={() => handleMarkerClick(place.id)}
            >
              <div className="flex flex-col items-center">
                <div className={`p-2 rounded-full shadow-md ${isSelected ? 'bg-coral-500' : 'bg-white'}`}>
                  <MapPin className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-coral-500'}`} />
                </div>
                
                {isSelected && (
                  <div className="absolute top-full mt-2 bg-white rounded-lg shadow-lg p-2 w-48 z-30 text-sm">
                    <h3 className="font-medium text-gray-900">{place.name}</h3>
                    <p className="text-gray-600 text-xs">{place.category}</p>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <span className="flex items-center">
                        ★ {place.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Map attribution - would be required in a real implementation */}
      <div className="absolute bottom-0 right-0 bg-white/80 text-xs text-gray-500 py-1 px-2">
        © Spotted Map
      </div>
    </div>
  );
};

export default MapComponent;