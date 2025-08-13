# Healthy Recipe Finder

A modern React application for discovering simple, healthy recipes with filtering and search capabilities.

## Features

- **Navigation Bar**: Logo, navigation links, and browse recipes button
- **Hero Section**: Title and description about the recipe collection
- **Filtering & Search**: 
  - Dropdown filters for Max Prep Time and Max Cook Time
  - Search functionality with 300ms debounce
  - Combined filtering and searching
- **Recipe Grid**: Responsive grid displaying recipe cards
- **Recipe Cards**: Individual cards with images, titles, descriptions, and details
- **Recipe Modal**: Detailed view with "Add to Cart" and "Close" buttons
- **Responsive Design**: 
  - 3 columns on desktop
  - 2 columns on tablet
  - 1 column on mobile
- **Footer**: Social media links and branding

## Project Structure

```
src/
├── App.js              # Main application component
├── App.css             # Global styles
├── recipes.js          # Recipe data array
├── Navbar.js           # Navigation component
├── Navbar.css          # Navigation styles
├── Hero.js             # Hero section component
├── Hero.css            # Hero section styles
├── Filters.js          # Filter and search component
├── Filters.css         # Filter styles
├── RecipeGrid.js       # Recipe grid component
├── RecipeGrid.css      # Grid layout styles
├── RecipeCard.js       # Individual recipe card component
├── RecipeCard.css      # Card styles
├── RecipeModal.js      # Recipe detail modal component
├── RecipeModal.css     # Modal styles
├── Footer.js           # Footer component
└── Footer.css          # Footer styles
```

## Setup Instructions

1. **Install Dependencies** (if not already installed):
   ```bash
   npm install
   ```

2. **Add Recipe Images**:
   - Create an `images` folder in the `public` directory (already exists)
   - Add the following images to `public/images/`:
     - mediterranean-chickpea-salad.jpg
     - avocado-tomato-toast.jpg
     - one-pan-lemon-garlic-salmon.jpg
     - quinoa-veggie-power-bowl.jpg
     - sweet-potato-black-bean-tacos.jpg
     - greek-yogurt-berry-parfait.jpg
     - lentil-spinach-soup.jpg
     - banana-oat-pancakes.jpg

3. **Start the Development Server**:
   ```bash
   npm start
   ```

4. **Open the Application**:
   - Navigate to `http://localhost:3000` in your browser

## Recipe Data

The application uses a predefined array of 8 healthy recipes with the following structure:

```javascript
{
  title: "Recipe Name",
  description: "Recipe description",
  servings: 2,
  prep: 10,        // minutes
  cook: 0,         // minutes
  image: "/images/recipe-image.jpg"
}
```

## Functionality

- **Search**: Type in the search bar to filter recipes by name or ingredients
- **Filters**: Use dropdown menus to filter by maximum prep time and cook time
- **Recipe Details**: Click "View Recipe" on any card to see detailed information
- **Add to Cart**: Click "Add to Cart" in the modal (currently shows an alert)
- **Responsive**: The layout adapts to different screen sizes

## Technologies Used

- React 19.1.1
- CSS3 with Flexbox and Grid
- Modern JavaScript (ES6+)
- Responsive design principles

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The application is built without external UI libraries for maximum control over styling
- All components are functional components using React hooks
- The search functionality includes a 300ms debounce to improve performance
- The modal can be closed by clicking outside, the close button, or the "Close" button
