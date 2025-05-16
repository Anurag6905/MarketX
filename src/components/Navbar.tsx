import React from "react";

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onSortChange: (sortOption: string) => void;
  onCategoryChange: (category: string) => void; 
}

const categories = ["All","Sports", "Books", "Electronics", "Vehicles", "Food" ,"General Items" ,"Clothes"];

const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onSortChange,
}) => {
  return (
    <nav className="bg-gray-900 px-6 py-4 flex flex-col md:flex-row items-center justify-between shadow-lg">
      {/* Logo */}
      <div className="text-white text-2xl font-semibold tracking-wide">
        MarketX.com
      </div>

      {/* Search Bar */}
      <div className="relative w-full md:w-1/3 my-3 md:my-0">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
        />
      </div>

      {/* Category & Sorting */}
      <div className="flex items-center space-x-4">
        <select
          className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 hover:bg-gray-700"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Sorting Dropdown */}
        <select
          className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 hover:bg-gray-700"
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="alphabetical">Alphabetical (A-Z)</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
