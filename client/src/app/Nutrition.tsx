import React, { useState, useEffect } from 'react';
import { Container, Card, Button, ProgressBar, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Parallax } from 'react-parallax';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

import { API_BASE_URL, FDC_API_KEY } from '../config';
import { setPlayerData } from './redux/levelUpSlice';
import { RootState } from './redux/store';
import store from './redux/store';

import panel from '../assets/panel.png';
import backgroundImage from '../assets/tavern.jpg';
import calendar_icon from '../assets/icons/calendar.svg';
import FoodSearchResults from './menu/food-search';

// Define an interface for the food data
interface FoodData {
    fdcId: number;
    description: string;
    foodNutrients: Array<{
        nutrientId: number;
        nutrientName: string;
        unitName: string;
        value: number;
    }>;
}

const NutritionTracker: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const playerData = useSelector((state: RootState) => state.levelUp.playerData);

    const [inputFoodItem, setInputFoodItem] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Array<{ description: string; calories: number | string }>>([]);
    const [selectedFoodDetails, setSelectedFoodDetails] = useState<null | {
        description: string;
        calories: number | string;
        protein?: number;
        fat?: number;
        carbs?: number;
        fiber?: number;
        totalSugars?: number;
    }>(null);
    
    const [submittedFoods, setSubmittedFoods] = useState<Array<{
        description: string;
        calories: number | string;
        protein?: number;
        fat?: number;
        carbs?: number;
        fiber?: number;
        totalSugars?: number;
    }>>([]);

    const fetchFoodData = async (query: string) => {
        try {
            const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&api_key=${FDC_API_KEY}`);
            const foodData: FoodData[] = response.data.foods.slice(0, 10);
            console.log('Food Data:', foodData);
    
            // Extract calorie information directly from the initial response
            const resultsWithCalories = foodData.map((food: FoodData) => {
                const calories = food.foodNutrients.find(nutrient => 
                    nutrient.nutrientId === 1008 // Use nutrientId for calories
                );
                const protein = food.foodNutrients.find(nutrient => 
                    nutrient.nutrientId === 1003 // Use nutrientId for protein
                );
                const carbs = food.foodNutrients.find(nutrient => 
                    nutrient.nutrientId === 1005 // Use nutrientId for carbs
                );
                const fat = food.foodNutrients.find(nutrient => 
                    nutrient.nutrientId === 1004 // Use nutrientId for fat
                );
                const fiber = food.foodNutrients.find(nutrient => 
                    nutrient.nutrientId === 1079 // Use nutrientId for fiber
                );
                const totalSugars = food.foodNutrients.find(nutrient => 
                    nutrient.nutrientId === 2000 // Use nutrientId for total sugars
                );

                return {
                    description: food.description,
                    calories: calories ? calories.value : 'N/A',
                    protein: protein ? protein.value : 'N/A',
                    carbs: carbs ? carbs.value : 'N/A',
                    fat: fat ? fat.value : 'N/A',
                    fiber: fiber ? fiber.value : 'N/A',
                    totalSugars: totalSugars ? totalSugars.value : 'N/A'
                };

            });
    
            setSearchResults(resultsWithCalories);
        } catch (error) {
            console.error('Error fetching food data:', error);
        }
    };

    const handleSearch = async () => {
        if (inputFoodItem.trim() !== '') {
            await fetchFoodData(inputFoodItem);
        } else {
            console.log('Please enter a food item to search.');
        }
    };

    useEffect(() => {
        const fetchPlayerData = async () => {
            if (inputFoodItem) {
                await fetchFoodData(inputFoodItem);
            }
            try {
                const response = await axios.get(`${API_BASE_URL}/api/user-info?name=John Doe`);
                const data = response.data;
    
                const parsedData = {
                    ...data,
                    level: typeof data.level === 'string' ? JSON.parse(data.level) : data.level,
                    xp: typeof data.xp === 'string' ? JSON.parse(data.xp) : data.xp,
                    levelRequirements: typeof data.levelRequirements === 'string' ? 
                        JSON.parse(data.levelRequirements) : data.levelRequirements,
                };
                dispatch(setPlayerData(parsedData));
            } catch (error) {
                console.error('Error fetching player data:', error);
            }
        };

        // Only fetch if we don't have meaningful data
        if (!playerData || playerData.name === 'Unknown') {
            fetchPlayerData();
        }
    }, [dispatch, playerData, inputFoodItem]);

    const handleSaveFood = (food: {
        description: string;
        calories: number | string;
        protein?: number;
        fat?: number;
        carbs?: number;
        fiber?: number;
        totalSugars?: number;
    }) => {
        setSelectedFoodDetails(food);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Check if a food item is selected
        if (!selectedFoodDetails || !selectedFoodDetails.description) {
            console.error('Please select a food item before submitting.');
            return;
        }

        // Add the selected food to the list of submitted foods
        setSubmittedFoods(prevFoods => [...prevFoods, selectedFoodDetails]);

        // Log the data being sent to the server
        console.log('Submitting nutrition data:', selectedFoodDetails);

        // Here you can add logic to handle the submission, such as updating the UI or storing the data locally
        console.log('Nutrition data ready for submission:', selectedFoodDetails);
    };

    const handleDelete = (index: number) => {
        setSubmittedFoods(prevFoods => prevFoods.filter((_, i) => i !== index));
    };

    // Add immediate feedback for debugging
    let calories = 2000;
    let caloriesConsumed = 1200;
    let caloriesRemaining = calories - caloriesConsumed;
    let caloriesBarProgress = (caloriesConsumed / calories) * 100;

    let carb = 250;
    let carbConsumed = 150;
    let carbRemaining = carb - carbConsumed;
    let carbBarProgress = (carbConsumed / carb) * 100;

    let protein = 60;
    let proteinConsumed = 35;
    let proteinRemaining = protein - proteinConsumed;
    let proteinBarProgress = (proteinConsumed / protein) * 100;
    
    let fat = 65;
    let fatConsumed = 40;
    let fatRemaining = fat - fatConsumed;
    let fatBarProgress = (fatConsumed / fat) * 100;

    let fiber = 25;
    let fiberConsumed = 15;
    let fiberRemaining = fiber - fiberConsumed;
    let fiberBarProgress = (fiberConsumed / fiber) * 100;

    let water = 2500;
    let waterConsumed = 1500;
    let waterRemaining = water - waterConsumed;
    let waterBarProgress = (waterConsumed / water) * 100;

    return (
        <Parallax bgImage={backgroundImage} strength={0}>
            <Container id="nutrition-tracker">
                <h1 className="nutrition-tracker-header">Nutrition Tracker</h1>
                <h5 className="nutrition-tracker-date"> 
                    <img src={calendar_icon} alt="Calendar Icon" className="calendar-icon" /> 
                    Date: {new Date().toLocaleDateString()} (Today)
                </h5>

                {/* Nutrition Tracker Units */}
                <div className="unit-grid">
                    <Card 
                        className="panel-unit"
                        style={{ 
                            backgroundImage: `url(${panel})`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundColor: 'transparent',
                            border: 'none',
                        }}>
                        <Card.Body>
                            <h5 className="unit-header">Calories</h5>
                            <h5 className="unit-body">{caloriesRemaining} remaining</h5>
                            <ProgressBar className="unit-bar" variant="info" now={caloriesBarProgress} />
                        </Card.Body>
                    </Card>

                    <Card 
                        className="panel-unit"
                        style={{ 
                            backgroundImage: `url(${panel})`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundColor: 'transparent',
                            border: 'none',
                        }}>
                        <Card.Body>
                            <h5 className="unit-header">Protein</h5>
                            <h5 className="unit-body">{proteinRemaining}g remaining</h5>
                            <ProgressBar className="unit-bar" variant="info" now={proteinBarProgress} />
                        </Card.Body>
                    </Card>

                    <Card 
                        className="panel-unit"
                        style={{ 
                            backgroundImage: `url(${panel})`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundColor: 'transparent',
                            border: 'none',
                        }}>
                        <Card.Body>
                            <h5 className="unit-header">Carbs</h5>
                            <h5 className="unit-body">{carbRemaining}g remaining</h5>
                            <ProgressBar className="unit-bar" variant="info" now={carbBarProgress} />
                        </Card.Body>
                    </Card>

                    <Card 
                        className="panel-unit"
                        style={{ 
                            backgroundImage: `url(${panel})`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundColor: 'transparent',
                            border: 'none',
                        }}>
                        <Card.Body>
                            <h5 className="unit-header">Fat</h5>
                            <h5 className="unit-body">{fatRemaining}g remaining</h5>
                            <ProgressBar className="unit-bar" variant="info" now={fatBarProgress} />
                        </Card.Body>
                    </Card>

                    <Card 
                        className="panel-unit"
                        style={{ 
                            backgroundImage: `url(${panel})`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundColor: 'transparent',
                            border: 'none',
                        }}>
                        <Card.Body>
                            <h5 className="unit-header">Fiber</h5>
                            <h5 className="unit-body">{fiberRemaining}g remaining</h5>
                            <ProgressBar className="unit-bar" variant="info" now={fiberBarProgress} />
                        </Card.Body>
                    </Card>

                    <Card 
                        className="panel-unit"
                        style={{ 
                            backgroundImage: `url(${panel})`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundColor: 'transparent',
                            border: 'none',
                        }}>
                        <Card.Body>
                            <h5 className="unit-header">Water</h5>
                            <h5 className="unit-body">{waterRemaining} remaining</h5>
                            <ProgressBar className="unit-bar" variant="info" now={waterBarProgress} />
                        </Card.Body>
                    </Card>
                </div>
                
                <div className="nutrition-tracker-forms-container">
                    <Card className="nutrition-tracker-form"> 
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formFoodItem" className="d-flex align-items-center">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter food item"
                                    value={inputFoodItem}
                                    onChange={(e) => setInputFoodItem(e.target.value)}
                                    className="me-2"
                                />
                                <Button className="search-button" variant="secondary" onClick={handleSearch} type="button">
                                    Search
                                </Button>
                            </Form.Group>
                            {searchResults.length > 0 && <FoodSearchResults results={searchResults} onSave={handleSaveFood} />}
                        </Form>
                    </Card>

                    <Card className="nutrition-tracker-results-container">
                        {submittedFoods.map((food, index) => (
                            <Card key={index} className="nutrition-tracker-results-content">
                                <Card.Body>
                                    <b>{food.description}</b>
                                    <p>Calories: {food.calories}</p>
                                    <p>Protein: {food.protein}g</p>
                                    <p>Carbs: {food.carbs}g</p>
                                    <p>Fat: {food.fat}g</p>
                                    <p>Fiber: {food.fiber}g</p>
                                    <p>Total Sugars: {food.totalSugars}g</p>
                                    <FontAwesomeIcon icon={faX} className="delete-icon" onClick={() => handleDelete(index)} />
                                </Card.Body>
                            </Card>
                        ))}
                    </Card>
                </div>

                {/* Button to go back to town */}
                <Button 
                    variant="outline-secondary"
                    className="home-button"
                    onClick={() => navigate('/town')}
                >
                    Back to Town
                </Button>
            </Container>
        </Parallax>
    );
};

export default NutritionTracker;