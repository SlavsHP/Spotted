import React, { createContext, useState, useContext } from 'react';
import { Place, Recommendation } from '../types';

// Mock data for places
const mockPlaces: Place[] = [
  {
    id: '1',
    name: 'The Cozy Corner Café',
    address: '23 Milsom Street, Bath, BA1 1DE',
    category: 'Café',
    description: 'A charming café with great study spaces and amazing coffee.',
    images: ['https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=600'],
    rating: 4.5,
    location: { lat: 51.3837, lng: -2.3599 },
  },
  {
    id: '2',
    name: 'Pulteney Books',
    address: '45 Great Pulteney Street, Bath, BA2 4DB',
    category: 'Bookstore',
    description: 'Independent bookstore with a wonderful selection and quiet reading area.',
    images: ['https://images.pexels.com/photos/5710944/pexels-photo-5710944.jpeg?auto=compress&cs=tinysrgb&w=600'],
    rating: 4.7,
    location: { lat: 51.3825, lng: -2.3514 },
  },
  {
    id: '3',
    name: 'The Green Leaf',
    address: '78 Walcot Street, Bath, BA1 5BD',
    category: 'Restaurant',
    description: 'Plant-based restaurant with affordable student deals and great atmosphere.',
    images: ['https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=600'],
    rating: 4.2,
    location: { lat: 51.3867, lng: -2.3548 },
  },
  {
    id: '4',
    name: 'Bath Vintage Market',
    address: '12 Green Park Station, Bath, BA1 1JB',
    category: 'Shop',
    description: 'Weekend market with unique vintage finds and student-friendly prices.',
    images: ['https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg?auto=compress&cs=tinysrgb&w=600'],
    rating: 4.4,
    location: { lat: 51.3802, lng: -2.3658 },
  },
  {
    id: '5',
    name: 'Bytes Tech Café',
    address: '56 Lower Bristol Road, Bath, BA2 3BH',
    category: 'Café',
    description: 'Tech-friendly café with fast wifi, plenty of outlets, and coding events.',
    images: ['https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600'],
    rating: 4.6,
    location: { lat: 51.3781, lng: -2.3713 },
  },
];

// Mock data for recommendations
const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    placeId: '1',
    userId: '2',
    text: 'Perfect spot for studying! They have the best chai latte in Bath.',
    rating: 5,
    createdAt: new Date('2024-04-20').toISOString(),
    images: ['https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=300'],
  },
  {
    id: '2',
    placeId: '2',
    userId: '3',
    text: 'Found some rare CS books here. The staff is super helpful!',
    rating: 4,
    createdAt: new Date('2024-04-18').toISOString(),
    images: ['https://images.pexels.com/photos/1370298/pexels-photo-1370298.jpeg?auto=compress&cs=tinysrgb&w=300'],
  },
  {
    id: '3',
    placeId: '3',
    userId: '1',
    text: 'The student discount on Tuesdays makes this place so affordable!',
    rating: 4,
    createdAt: new Date('2024-04-15').toISOString(),
    images: ['https://images.pexels.com/photos/5961141/pexels-photo-5961141.jpeg?auto=compress&cs=tinysrgb&w=300'],
  },
  {
    id: '4',
    placeId: '4',
    userId: '2',
    text: 'Got an amazing vintage sweater for only £10! A must-visit on weekends.',
    rating: 5,
    createdAt: new Date('2024-04-10').toISOString(),
    images: ['https://images.pexels.com/photos/1844012/pexels-photo-1844012.jpeg?auto=compress&cs=tinysrgb&w=300'],
  },
  {
    id: '5',
    placeId: '5',
    userId: '3',
    text: 'Best place to code with friends. Their brownies are amazing too!',
    rating: 4,
    createdAt: new Date('2024-04-05').toISOString(),
    images: ['https://images.pexels.com/photos/1181294/pexels-photo-1181294.jpeg?auto=compress&cs=tinysrgb&w=300'],
  },
];

interface PlacesContextType {
  places: Place[];
  recommendations: Recommendation[];
  addRecommendation: (recommendation: Omit<Recommendation, 'id' | 'createdAt'>) => void;
  getFriendRecommendations: (friendIds: string[]) => Recommendation[];
  getPlaceById: (id: string) => Place | undefined;
  getRecommendationsByPlaceId: (placeId: string) => Recommendation[];
  getRecommendationsByUserId: (userId: string) => Recommendation[];
  addPlace: (place: Omit<Place, 'id'>) => string;
}

const PlacesContext = createContext<PlacesContextType | undefined>(undefined);

export const PlacesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [places, setPlaces] = useState<Place[]>(mockPlaces);
  const [recommendations, setRecommendations] = useState<Recommendation[]>(mockRecommendations);

  const getPlaceById = (id: string) => {
    return places.find(place => place.id === id);
  };

  const getRecommendationsByPlaceId = (placeId: string) => {
    return recommendations.filter(rec => rec.placeId === placeId);
  };

  const getRecommendationsByUserId = (userId: string) => {
    return recommendations.filter(rec => rec.userId === userId);
  };

  const getFriendRecommendations = (friendIds: string[]) => {
    return recommendations.filter(rec => friendIds.includes(rec.userId));
  };

  const addRecommendation = (recommendation: Omit<Recommendation, 'id' | 'createdAt'>) => {
    const newRecommendation: Recommendation = {
      ...recommendation,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setRecommendations([...recommendations, newRecommendation]);
  };

  const addPlace = (place: Omit<Place, 'id'>) => {
    const newPlace: Place = {
      ...place,
      id: Date.now().toString(),
    };
    setPlaces([...places, newPlace]);
    return newPlace.id;
  };

  const value = {
    places,
    recommendations,
    addRecommendation,
    getFriendRecommendations,
    getPlaceById,
    getRecommendationsByPlaceId,
    getRecommendationsByUserId,
    addPlace,
  };

  return <PlacesContext.Provider value={value}>{children}</PlacesContext.Provider>;
};

export const usePlaces = () => {
  const context = useContext(PlacesContext);
  if (context === undefined) {
    throw new Error('usePlaces must be used within a PlacesProvider');
  }
  return context;
};