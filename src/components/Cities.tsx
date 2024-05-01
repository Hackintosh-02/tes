import React from 'react'
import { Button } from "@/components/ui/button"

interface CityDisplayProps {
    cities: string[];
}

const Cities = () => {
    const cities = [
        'Mumbai',
        'Delhi-NCR',
        'Bengaluru',
        'Hyderabad',
        'Ahmedabad',
        'Chandigarh',
        'Chennai',
        'Pune',
        'Kolkata',
        'Kochi',
      ];
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
      {cities.map((city) => (
        <div className="ml-auto">
        <Button className='flex flex-col h-full' variant="default">
            <img src="https://media.istockphoto.com/id/1193451471/vector/map-pin-vector-glyph-icon.jpg?s=612x612&w=0&k=20&c=wuWVeHuthNAXzjOO5_VY9SUOd-6cxwpVH8VVfh6Y7Lc=" alt="Logo" className="h-8" />
            {city}</Button>
        </div>
      ))}
    </div>
  ) 
}

export default Cities