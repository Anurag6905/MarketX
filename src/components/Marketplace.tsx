import { useState, useEffect } from "react";
import Navbar from "./Navbar";

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  image: string;
  contact: string;
}

const listings: Product[] = [
  { id: 1, title: "Second-Hand Books", price: "₹200", category: "Books", contact: "https://wa.me/917499972586", image: "books.jpeg" },
  { id: 2, title: "Laptop (Used)", price: "₹25,000", category: "Electronics", contact: "https://wa.me/917499972586", image: "laptop.jpg" },
  { id: 3, title: "Bicycle", price: "₹4,500", category: "Vehicles", contact: "https://wa.me/917499972586", image: "bicycle2.jpg" },
  { id: 4, title: "Ipad (Used)", price: "₹15,000", category: "Electronics", contact: "https://wa.me/917499972586", image: "ipad.jpeg" },
  { id: 5, title: "Charger", price: "₹500", category: "Electronics", contact: "https://wa.me/917499972586", image: "charger.jpg" },
  { id: 6, title: "Bucket", price: "₹80", category: "General Items", contact: "https://wa.me/917499972586", image: "bucket.jpeg" },
  { id: 7, title: "Shampoo", price: "₹110", category: "General Items", contact: "https://wa.me/917499972586", image: "shampoo.jpg" },
  { id: 8, title: "FaceWash", price: "₹190", category: "General Items", contact: "https://wa.me/917499972586", image: "facewash.jpg" },
  { id: 9, title: "T-shirt", price: "₹500", category: "Clothes", contact: "https://wa.me/917499972586", image: "tshirt.jpg" },
  { id: 10, title: "Trousers", price: "₹700", category: "Clothes", contact: "https://wa.me/917499972586", image: "trousers.jpeg" },
  { id: 11, title: "Shoes", price: "₹2000", category: "Sports", contact: "https://wa.me/917499972586", image: "shoes.jpg" },
  { id: 12, title: "Table", price: "₹400", category: "General Items", contact: "https://wa.me/917499972586", image: "table.jpeg" },
  { id: 13, title: "Chair", price: "₹300", category: "General Items", contact: "https://wa.me/917499972586", image: "chair.jpeg" },
  { id: 14, title: "Bottle", price: "₹100", category: "General Items", contact: "https://wa.me/917499972586", image: "botle.jpeg" },
  { id: 15, title: "Jacket", price: "₹`500", category: "Clothes", contact: "https://wa.me/917499972586", image: "jacket.jpeg" },
  { id: 16, title: "Shev packs", price: "₹500", category: "Food", contact: "https://wa.me/917499972586", image: "shev.jpeg" },
  { id: 17, title: "Headphones", price: "₹2500", category: "Electronics", contact: "https://wa.me/917499972586", image: "headphones.jpeg" },
  { id: 18, title: "Football", price: "₹200", category: "Sports", contact: "https://wa.me/917499972586", image: "football.jpeg" },
  { id: 19, title: "₹5 coin", price: "₹5", category: "General Items", contact: "https://wa.me/917499972586", image: "5coin.jpeg" },
  { id: 20, title: "Sunglasses", price: "₹150", category: "General Items", contact: "https://wa.me/917499972586", image: "sunglasses.jpeg" },
  { id: 21, title: "Bag", price: "₹450", category: "General Items", contact: "https://wa.me/917499972586", image: "bag.jpeg" },
];

export default function Marketplace() {
  const [items] = useState(listings);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All"); 
  const [sortOption, setSortOption] = useState("default");
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Add or remove item from wishlist
  const toggleWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      const isAlreadyInWishlist = prevWishlist.some((item) => item.id === product.id);
      if (isAlreadyInWishlist) {
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        alert("Item Added to the Wishlist");
        return [...prevWishlist, product];
      }
    });
  };

  // To copy the link of the product
const copyLink = (id: number) => {
  if (!id) {
    console.error("Error: Product ID is missing!");
    alert("Failed to copy link. Product ID is missing!");
    return;
  }

  const productURL = `${window.location.origin}/product/${id}`; // Corrected URL format
  navigator.clipboard.writeText(productURL)
    .then(() => alert("Product link copied!"))
};

  //Filtering Products by Search & Category
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  //Sorting Products
  const sortedItems = [...filteredItems].sort((a, b) => {
    const priceA = parseInt(a.price.replace("₹", "").replace(",", ""));
    const priceB = parseInt(b.price.replace("₹", "").replace(",", ""));

    if (sortOption === "price-low") return priceA - priceB;
    else if (sortOption === "price-high") return priceB - priceA;
    else if (sortOption === "alphabetical") return a.title.localeCompare(b.title);
    return 0;
  });

  useEffect(() => {
    console.log("Items updated:", sortedItems);
  }, [sortedItems]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500); 
    }, []);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      );
    }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-5">
    
      <Navbar 
        searchQuery={searchText} 
        setSearchQuery={setSearchText} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
        onSortChange={setSortOption} 
        onCategoryChange={setSelectedCategory}
      />

      <h1 className="mt-5 text-3xl font-bold text-center mb-6">Marketplace</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sortedItems.length > 0 ? (
          sortedItems.map((item) => (
            <div key={item.id} className="bg-gray-800 p-4 rounded-lg shadow-lg relative hover:shadow-lg hover:scale-105 transition-transform">
                <img src={item.image} alt={item.title} className="w-full h-60 object-contain rounded-md mb-3" />

                {/* Title & Wishlist Button */}
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <button
                    onClick={() => copyLink(item.id)}
                    className="text-2xl"
                  >
                    {wishlist.some((wish) => wish.id === item.id) ? "❤️" : "🤍"}
                  </button>
                </div>

                {/* Price */}
                <div className="flex justify-between items-center mt-2">
                  <p className="text-lg text-green-600">{item.price}</p>
                </div>

                {/* Contact Seller & Wishlist Button */}
                <div className="flex mt-3 justify-center align-center gap-6">
                  <a
                    href={item.contact}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-700 w-[50%] hover:bg-green-600 text-white px-4 py-2 rounded-md text-center font-extrabold"
                  >
                    Contact Seller
                  </a>

                  {/* Share Product Button */}
                    <button
                      onClick={() => copyLink(item.id)}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-md"
                    >
                      📤 Share
                    </button>
            </div>
      </div>
          ))
        ) : (
          <p className="text-center text-gray-400 font-bold">No products found.</p>
        )}
      </div>

       {/* Wishlist Items */}
       {wishlist.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <div key={item.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                  <img src={item.image} alt={item.title} className="w-full h-60 object-contain rounded-md mb-3" />
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-lg text-green-600">{item.price}</p>
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="mt-2 block text-center bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Remove from Wishlist
                  </button>
                </div>
              ))}
            </div>
  </div>
)}
    </div>
  );
}

