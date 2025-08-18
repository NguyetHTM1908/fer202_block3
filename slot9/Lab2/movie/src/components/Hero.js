import React from 'react';
import { Carousel, Container } from 'react-bootstrap';

const Hero = () => {
  const carouselItems = [
    {
      id: 1,
      image: 'images/movie1.jpg',
      title: 'Galactic Wars',
      description: 'Epic space battles decide the fate of a fractured galaxy as rival factions clash for control.'
    },
    {
      id: 2,
      image: 'images/movie3.jpg',
      title: 'Deep Blue',
      description: 'A gripping survival drama set far from shore when a voyage goes wrong.'
    },
    {
      id: 3,
      image: 'images/movie4.jpg',
      title: 'Haunted House',
      description: 'A teen dares to spend one night in a house with a dark past—and uncovers the truth.'
    }
  ];

  return (
    <section className="hero-section">
      <Container>
        <Carousel 
          interval={5000} 
          pause="hover"
          fade
          indicators
          controls
        >
          {carouselItems.map((item) => (
            <Carousel.Item key={item.id}>
              <div 
                style={{
                  height: '400px',
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Carousel.Caption>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default Hero;

