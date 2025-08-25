import React, { useMemo } from 'react';
import Carousel from '../components/Carousel';
import DishesList from '../components/DishesList';
import SearchAndSort from '../components/SearchAndSort';
import { useSearch } from '../context/SearchContext';

const HomePage = ({ dishes }) => {

  const { searchQuery, sortOption } = useSearch();


  
  const imageUrls = dishes.map(dish => dish.image);

  
  const filteredDishes = useMemo(() => {
    let filtered = dishes;

    // Lọc 
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = dishes.filter(dish => 
        dish.title.toLowerCase().includes(query) ||
        dish.name.toLowerCase().includes(query) ||
        dish.description.toLowerCase().includes(query) ||
        dish.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sắp xếp 
    switch (sortOption) {
      case 'name-asc':
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
      case 'price-asc':
        return [...filtered].sort((a, b) => {
          const priceA = a.salePrice || a.price;
          const priceB = b.salePrice || b.price;
          return parseFloat(priceA) - parseFloat(priceB);
        });
      case 'price-desc':
        return [...filtered].sort((a, b) => {
          const priceA = a.salePrice || a.price;
          const priceB = b.salePrice || b.price;
          return parseFloat(priceB) - parseFloat(priceA);
        });
      default:
        return filtered;
    }
  }, [dishes, searchQuery, sortOption]);

  return (
    <div className="home-page">

      <section className="hero-carousel">
        <Carousel 
          images={imageUrls} 
          autoPlayInterval={2000} 
        />
      </section>


      <section className="dishes-section">
        <h1>Chào mừng đến với Cửa hàng Điện thoại</h1>
        

        <SearchAndSort />
        
        <DishesList 
          dishes={filteredDishes} 
          searchQuery={searchQuery}
          sortOption={sortOption}
        />
      </section>
    </div>
  );
};

export default HomePage;
