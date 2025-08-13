import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Carousel.css';

const CarouselComponent = () => {
  const carouselItems = [
    {
      id: 1,
      image: '/images/avocado-tomato-toast.jpg',
      title: 'Avocado Tomato Toast',
      description: 'A healthy and delicious breakfast option',
      alt: 'Avocado tomato toast on bread'
    },
    {
      id: 2,
      image: '/images/banana-oat-pancakes.jpg',
      title: 'Banana Oat Pancakes',
      description: 'Nutritious pancakes perfect for any morning',
      alt: 'Fluffy banana oat pancakes'
    },
    {
      id: 3,
      image: '/images/greek-yogurt-berry-parfait.jpg',
      title: 'Greek Yogurt Berry Parfait',
      description: 'Fresh berries with creamy Greek yogurt',
      alt: 'Greek yogurt parfait with berries'
    },
    {
      id: 4,
      image: '/images/mediterranean-chickpea-salad.jpg',
      title: 'Mediterranean Chickpea Salad',
      description: 'Fresh and flavorful Mediterranean cuisine',
      alt: 'Colorful Mediterranean chickpea salad'
    },
    {
      id: 5,
      image: '/images/one-pan-lemon-garlic-salmon.jpg',
      title: 'Lemon Garlic Salmon',
      description: 'Easy one-pan salmon with zesty flavors',
      alt: 'Lemon garlic salmon fillet'
    }
  ];

  const carouselStyles = {
    carouselContainer: {
      marginBottom: '2rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      borderRadius: '0',
      overflow: 'visible'
    }
  };

  return (
    <div className="carousel-wrapper" style={carouselStyles.carouselContainer}>
      <Carousel 
        interval={4000}
        pause="hover"
        indicators={true}
        controls={true}
        fade={false}
        slide={true}
      >
        {carouselItems.map((item) => (
          <Carousel.Item key={item.id}>
            <img
              className="d-block w-100"
              src={item.image}
              alt={item.alt}
            />
            <Carousel.Caption>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
