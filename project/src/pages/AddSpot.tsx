import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePlaces } from '../contexts/PlacesContext';
import Button from '../components/ui/Button';
import { Upload, MapPin, Star } from 'lucide-react';

const categories = ['Café', 'Restaurant', 'Bookstore', 'Shop', 'Bar', 'Activity'];

const AddSpot: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { addPlace, addRecommendation } = usePlaces();
  const navigate = useNavigate();
  
  // Form state
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [recommendation, setRecommendation] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // For a real app, we would use file uploads
  // For this MVP, we'll use a placeholder image URL
  const placeholderImages = {
    'Café': 'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'Restaurant': 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'Bookstore': 'https://images.pexels.com/photos/5710944/pexels-photo-5710944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'Shop': 'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'Bar': 'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'Activity': 'https://images.pexels.com/photos/2156327/pexels-photo-2156327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  };
  
  useEffect(() => {
    document.title = 'Spotted - Add a Spot';
    
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate form
    if (!name.trim() || !address.trim() || !category || !description.trim() || !rating || !recommendation.trim()) {
      return setError('All fields are required');
    }
    
    setIsLoading(true);
    
    try {
      // Add the place
      const placeId = addPlace({
        name,
        address,
        category,
        description,
        images: [placeholderImages[category as keyof typeof placeholderImages]],
        rating,
        location: {
          // For demo, just use Bath's coordinates with slight random offset
          lat: 51.3837 + (Math.random() * 0.01 - 0.005),
          lng: -2.3599 + (Math.random() * 0.01 - 0.005),
        },
      });
      
      // Add the recommendation
      addRecommendation({
        placeId,
        userId: '1', // Current user id (from auth context in a real app)
        text: recommendation,
        rating,
        images: [],
      });
      
      // Navigate to the place details page
      navigate(`/places/${placeId}`);
    } catch (err) {
      setError('Failed to add spot. Please try again.');
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Add a New Spot</h1>
      
      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Place Name *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-coral-500 focus:border-coral-500 sm:text-sm"
                placeholder="e.g. The Cozy Corner Café"
                required
              />
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address *
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-coral-500 focus:border-coral-500 sm:text-sm"
                  placeholder="e.g. 23 Milsom Street, Bath, BA1 1DE"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category *
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-coral-500 focus:border-coral-500 sm:text-sm"
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-coral-500 focus:border-coral-500 sm:text-sm"
                placeholder="Describe this place in a few sentences..."
                required
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Rating *
              </label>
              <div className="flex">
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
                      className={`h-8 w-8 ${
                        (hoverRating || rating) >= star ? 'text-coral-500 fill-current' : ''
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="recommendation" className="block text-sm font-medium text-gray-700">
                Your Recommendation *
              </label>
              <textarea
                id="recommendation"
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value)}
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-coral-500 focus:border-coral-500 sm:text-sm"
                placeholder="Share your experience with this place..."
                required
              ></textarea>
            </div>
            
            <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
              <div className="flex flex-col items-center">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">
                  Add photos to your recommendation
                </p>
                <p className="text-xs text-gray-400 mb-4">
                  JPG, PNG or GIF, up to 10MB each
                </p>
                <Button
                  variant="outline"
                  type="button"
                  disabled
                >
                  Upload Photos
                </Button>
                <p className="text-xs text-gray-400 mt-2">
                  (Photo upload disabled in MVP)
                </p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                variant="outline"
                type="button"
                onClick={() => navigate(-1)}
                className="mr-3"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={isLoading}
              >
                Add Spot
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSpot;