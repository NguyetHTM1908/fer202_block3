import React, { useState, useCallback } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Filters from './Filters';
import RecipeGrid from './components/RecipeGrid';
import Footer from './components/Footer';
import RecipeModal from './components/RecipeModal';
import { recipes } from './recipes';

function App() {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({ maxPrepTime: '', maxCookTime: '' });
  const [searchTerm, setSearchTerm] = useState('');

  // Filter and search recipes
  const filterRecipes = useCallback((newFilters, newSearchTerm) => {
    let filtered = recipes;

    // Apply search filter
    if (newSearchTerm) {
      const searchLower = newSearchTerm.toLowerCase();
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchLower) ||
        recipe.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply prep time filter
    if (newFilters.maxPrepTime) {
      filtered = filtered.filter(recipe => recipe.prep <= parseInt(newFilters.maxPrepTime));
    }

    // Apply cook time filter
    if (newFilters.maxCookTime) {
      filtered = filtered.filter(recipe => recipe.cook <= parseInt(newFilters.maxCookTime));
    }

    setFilteredRecipes(filtered);
  }, []);

  // Handle filter changes
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    filterRecipes(newFilters, searchTerm);
  }, [filterRecipes, searchTerm]);

  // Handle search changes
  const handleSearchChange = useCallback((newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    filterRecipes(filters, newSearchTerm);
  }, [filterRecipes, filters]);

  // Handle view recipe
  const handleViewRecipe = useCallback((recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  }, []);

  // Handle close modal
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  }, []);

  // Handle add to cart
  const handleAddToCart = useCallback(() => {
    alert(`${selectedRecipe.title} has been added to cart!`);
    handleCloseModal();
  }, [selectedRecipe, handleCloseModal]);

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Filters 
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
      />
      <RecipeGrid 
        recipes={filteredRecipes}
        onViewRecipe={handleViewRecipe}
      />
      <Footer />
      
      <RecipeModal
        recipe={selectedRecipe}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default App;
