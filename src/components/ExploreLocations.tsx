import React from 'react';
import { Button } from "@/components/ui/button"

interface LocationCardProps {
  location: string;
  imageUrl: string;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, imageUrl }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img src={imageUrl} alt={location} className="w-full h-60" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{location} 
        </div>
        <Button className='' variant = "default">
            Explore More
          </Button>
      </div>
    </div>
  );
};

const ExploreLocations: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Explore Locations</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <LocationCard
          location="New Delhi"
          imageUrl="https://tinyurl.com/2zs7qmds"
        />
        <LocationCard
          location="Jaipur"
          imageUrl="https://tinyurl.com/ylxzg9tc"
        />
        <LocationCard
          location="Pune"
          imageUrl="https://tinyurl.com/2xxwuzxo"
        />
      </div>
    </div>
  );
};

export default ExploreLocations;
