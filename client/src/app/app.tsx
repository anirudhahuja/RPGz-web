import React from 'react';
import { Container, Row, Col, Button, Card, Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlay, faApple } from '@fortawesome/free-brands-svg-icons';
import { faGamepad, faChartLine, faMedal, faDownload, faDumbbell, faHeart, faUsers, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { Parallax } from 'react-parallax';
import './landing.scss';

// Importing assets for the Town showcase
import backgroundImage from '../assets/village.gif';
import playerGif from '../assets/player.gif';
import logo from '../assets/logo.png';

export function App() {
    const handleDownload = () => {
        // Replace with actual Google Play Store link
        window.open('https://play.google.com/store/apps/details?id=com.fitnessrpg.app', '_blank');
    };

    return (
        <div className="landing-page">
            {/* Hero Section with Town Showcase */}
            <section className="hero-section">
                <Parallax 
                    bgImage={backgroundImage} 
                    strength={0}
                    bgImageStyle={{
                        top: window.innerWidth <= 768 ? '-20%' : '0',
                        height: window.innerWidth <= 768 ? '120%' : '100%'
                    }}
                >
                    <Container className="hero-container">
                        {/* Logo Section */}
                        <Row className="logo-section">
                            <Col className="text-center">
                                <img src={logo} alt="FitnessRPG Logo" className="hero-logo" />
                            </Col>
                        </Row>

                        {/* Carousel Section - Full Width Row */}
                        <Row className="carousel-section">
                            <Col className="carousel-container">
                                <Carousel 
                                    className="hero-carousel"
                                    indicators={true}
                                    controls={true}
                                    interval={5000}
                                    pause="hover"
                                >
                                    {/* Slide 1: Hero Text Only */}
                                    <Carousel.Item>
                                        <div className="carousel-slide hero-slide">
                                            <h1 className="hero-title">
                                                Level Up Your <span className="text-primary">Fitness</span> Journey
                                            </h1>
                                            <p className="hero-subtitle">
                                                Transform your workouts into an epic RPG adventure. Complete quests, 
                                                level up your character, and track your nutrition - all while building 
                                                real-world strength and endurance.
                                            </p>
                                        </div>
                                    </Carousel.Item>

                                    {/* Slide 2: Features Only */}
                                    <Carousel.Item>
                                        <div className="carousel-slide features-slide">
                                            <h2 className="section-title text-center">Why Choose FitnessRPG?</h2>
                                            <p className="section-subtitle text-center">
                                                Gamify your fitness journey with RPG elements that make working out fun and engaging
                                            </p>
                                            <Row className="features-row">
                                                <Col md={4} className="mb-3">
                                                    <Card className="feature-card h-100">
                                                        <Card.Body className="text-center">
                                                            <div className="feature-icon mb-2">
                                                                <FontAwesomeIcon icon={faGamepad} size="2x" className="text-primary" />
                                                            </div>
                                                            <Card.Title>RPG Quest System</Card.Title>
                                                            <Card.Text>
                                                                Complete fitness quests to gain experience points and level up your character's 
                                                                strength, agility, intelligence, wisdom, and endurance stats.
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col md={4} className="mb-3">
                                                    <Card className="feature-card h-100">
                                                        <Card.Body className="text-center">
                                                            <div className="feature-icon mb-2">
                                                                <FontAwesomeIcon icon={faChartLine} size="2x" className="text-success" />
                                                            </div>
                                                            <Card.Title>Nutrition Tracking</Card.Title>
                                                            <Card.Text>
                                                                Track your daily nutrition with our comprehensive food database. 
                                                                Monitor calories, protein, carbs, fat, and fiber to optimize your gains.
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col md={4} className="mb-3">
                                                    <Card className="feature-card h-100">
                                                        <Card.Body className="text-center">
                                                            <div className="feature-icon mb-2">
                                                                <FontAwesomeIcon icon={faTrophy} size="2x" className="text-warning" />
                                                            </div>
                                                            <Card.Title>Character Progression</Card.Title>
                                                            <Card.Text>
                                                                Watch your character grow stronger as you complete workouts and achieve 
                                                                fitness milestones. Unlock new abilities and track your progress over time.
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Carousel.Item>


                                </Carousel>
                            </Col>
                        </Row>

                        {/* Player Character and Download Section - Separate Row Below */}
                        <Row className="player-section">
                            <Col className="player-download-section">
                                <div className="player-and-buttons">
                                    {/* Simple Player Character */}
                                    <div className="player-character">
                                        <img src={playerGif} alt="Player Character" className="player-gif" />
                                    </div>
                                    
                                    {/* Download Buttons Next to Player */}
                                    <div className="download-buttons">
                                        <Button 
                                            size="lg" 
                                            variant="primary" 
                                            className="download-btn mb-2"
                                            onClick={handleDownload}
                                        >
                                            <FontAwesomeIcon icon={faGooglePlay} className="me-2" />
                                            Download on Google Play
                                        </Button>
                                        <Button 
                                            size="lg" 
                                            variant="primary"
                                            className="download-btn"
                                            disabled
                                        >
                                            <FontAwesomeIcon icon={faApple} className="me-2" />
                                            Coming Soon on App Store
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Parallax>
            </section>

            {/* CTA Section */}
            <section className="cta-section py-5">
                <Container>
                    <Row className="text-center">
                        <Col>
                            <h2 className="cta-title">Ready to Start Your Fitness Adventure?</h2>
                            <p className="cta-subtitle mb-4">
                                Join thousands of players who have transformed their fitness journey with FitnessRPG
                            </p>
                            <Button 
                                size="lg" 
                                variant="primary" 
                                className="download-btn"
                                onClick={handleDownload}
                            >
                                <FontAwesomeIcon icon={faGooglePlay} className="me-2" />
                                Download Now - It's Free!
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Footer */}
            <footer className="footer py-4 bg-dark text-white">
                <Container>
                    <Row className="text-center">
                        <Col>
                            <p className="mb-0">
                                © 2024 FitnessRPG. All rights reserved. | 
                                <a href="#" className="text-white ms-2">Privacy Policy</a> | 
                                <a href="#" className="text-white ms-2">Terms of Service</a>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
}

export default App;
