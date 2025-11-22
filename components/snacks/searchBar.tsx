import React from 'react';
import { Input } from '../ui/input';
import { Plus, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '@radix-ui/react-separator';
import { AddSnacks } from './addSnacks';


const SearchBar = () => {
  return (
    <div className="flex items-center md:flex-row flex-col gap-4">
      <div className="w-full flex items-center  justify-between bg-white border border-gray-300 rounded-2xl shadow-md p-4 transition-all duration-300 hover:border-gray-400 hover:shadow-lg">
        <div className="flex md:flex-row flex-c items-center gap-3 w-full">
          <Search className="text-gray-500 w-5 h-5" />
          <Input
            className="bg-transparent border-none focus:ring-0 focus:outline-none  text-gray-800 placeholder:text-gray-500 w-full"
            placeholder="Search for snacks or drinks..."
          />
        </div>

        <Button className="ml-4 py-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
          Search
        </Button>
      </div>

      <AddSnacks />
    </div>
  );
};


export default SearchBar;
