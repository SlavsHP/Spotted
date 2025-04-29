import React from 'react';
import { MapPin, Mail, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-coral-400 mb-4">Spotted</h3>
            <p className="text-gray-300 mb-4">
              Connecting students with authentic local experiences through trusted recommendations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-coral-400">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-coral-400">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-coral-400">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-coral-400">For Businesses</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-coral-400">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-coral-400">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-coral-400">Terms of Service</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-coral-400" />
                <span className="text-gray-300">University of Bath, Bath, BA2 7AY</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-coral-400" />
                <a href="mailto:hello@spotted.com" className="text-gray-300 hover:text-coral-400">
                  hello@spotted.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Spotted. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;