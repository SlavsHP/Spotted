export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  friendIds: string[];
}

export interface Place {
  id: string;
  name: string;
  address: string;
  category: string;
  description: string;
  images: string[];
  rating: number;
  location: {
    lat: number;
    lng: number;
  };
}

export interface Recommendation {
  id: string;
  placeId: string;
  userId: string;
  text: string;
  rating: number;
  createdAt: string;
  images: string[];
}

export interface LocationPoint {
  lat: number;
  lng: number;
}