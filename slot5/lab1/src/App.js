import React, { useCallback, useState } from 'react';
import './App.css';
import CarouselComponent from './components/Carousel';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import RecipeGrid from './components/RecipeGrid';
import RecipeModal from './components/RecipeModal';
import RecipeRequestForm from './components/RecipeRequestForm';
import Toast from './components/Toast';
import Filters from './Filters';
import { recipes } from './recipes';

function App() {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({ maxPrepTime: '', maxCookTime: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [favourites, setFavourites] = useState(new Set());
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [currentView, setCurrentView] = useState('home');
  const [showRecipeRequestForm, setShowRecipeRequestForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Filter, search and sort recipes
  const filterRecipes = useCallback((newFilters, newSearchTerm, newSortBy) => {
    let filtered = recipes;

    // Apply favourites filter first
    if (currentView === 'favourites') {
      filtered = filtered.filter((recipe, index) => favourites.has(index));
    }

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

    // Apply sorting
    if (newSortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (newSortBy) {
          case 'name-asc':
            return a.title.localeCompare(b.title);
          case 'name-desc':
            return b.title.localeCompare(a.title);
          case 'prep-asc':
            return a.prep - b.prep;
          case 'prep-desc':
            return b.prep - a.prep;
          case 'cook-asc':
            return a.cook - b.cook;
          case 'cook-desc':
            return b.cook - a.cook;
          default:
            return 0;
        }
      });
    }

    setFilteredRecipes(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [currentView, favourites]);

  // Handle filter changes
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    filterRecipes(newFilters, searchTerm, sortBy);
  }, [filterRecipes, searchTerm, sortBy]);

  // Handle search changes
  const handleSearchChange = useCallback((newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    filterRecipes(filters, newSearchTerm, sortBy);
  }, [filterRecipes, filters, sortBy]);

  // Handle sort changes
  const handleSortChange = useCallback((newSortBy) => {
    setSortBy(newSortBy);
    filterRecipes(filters, searchTerm, newSortBy);
  }, [filterRecipes, filters, searchTerm]);

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

  // Handle add to favourite
  const handleAddToFavourite = useCallback((recipe, index) => {
    const newFavourites = new Set(favourites);
    if (newFavourites.has(index)) {
      newFavourites.delete(index);
      setToastMessage(`${recipe.title} removed from favourites`);
    } else {
      newFavourites.add(index);
      setToastMessage(`${recipe.title} added to favourites`);
    }
    setFavourites(newFavourites);
    setShowToast(true);
  }, [favourites]);

  // Handle show home
  const handleShowHome = useCallback(() => {
    setCurrentView('home');
  }, []);

  // Handle show recipes
  const handleShowRecipes = useCallback(() => {
    setCurrentView('recipes');
  }, []);

  // Handle show favourites
  const handleShowFavourites = useCallback(() => {
    setCurrentView(currentView === 'favourites' ? 'home' : 'favourites');
  }, [currentView]);

  // Handle show recipe request form
  const handleShowRecipeRequest = useCallback(() => {
    setShowRecipeRequestForm(true);
  }, []);

  // Handle page change
  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
  }, []);

  // Handle items per page change
  const handleItemsPerPageChange = useCallback((newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  }, []);

  // Handle add to cart
  const handleAddToCart = useCallback(() => {
    alert(`${selectedRecipe.title} has been added to cart!`);
    handleCloseModal();
  }, [selectedRecipe, handleCloseModal]);

  return (
    <div className="App">
      <Navbar 
        favourites={favourites}
        onShowFavourites={handleShowFavourites}
        onShowHome={handleShowHome}
        onShowRecipes={handleShowRecipes}
        onShowRecipeRequest={handleShowRecipeRequest}
        currentView={currentView}
      />
      {currentView === 'home' && (
        <>
          <CarouselComponent />
          <Hero />
        </>
      )}
      {currentView === 'recipes' && (
        <div style={{
          backgroundColor: '#e8f5e8',
          border: '1px solid #c3e6c3',
          color: '#2c5530',
          padding: '1rem 2rem',
          textAlign: 'center',
          fontSize: '1.125rem',
          fontWeight: '500'
        }}>
          🍽️ Showing all recipes
        </div>
      )}
      {currentView === 'favourites' && (
        <div style={{
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          color: '#856404',
          padding: '1rem 2rem',
          textAlign: 'center',
          fontSize: '1.125rem',
          fontWeight: '500'
        }}>
          🖤 Showing {favourites.size} favourite recipe{favourites.size !== 1 ? 's' : ''}
        </div>
      )}
      <Filters 
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
      />
      <RecipeGrid 
        recipes={filteredRecipes}
        onViewRecipe={handleViewRecipe}
        onAddToFavourite={handleAddToFavourite}
        favourites={favourites}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <Footer />
      
      <RecipeModal
        recipe={selectedRecipe}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />
      
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        duration={5000}
      />
      
      {showRecipeRequestForm && (
        <RecipeRequestForm
          onClose={() => setShowRecipeRequestForm(false)}
        />
      )}
    </div>
  );
}

export default App;
