import React, { useState, useEffect } from 'react';
import { Container, Card, Button, ProgressBar, Form, Accordion } from 'react-bootstrap';
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

export function Nutrition() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const playerData = useSelector((state: RootState) => state.levelUp.playerData);

    // State to manage user input and search results
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
        servingSize?: number;
    }>(null);
    
    // State to track submitted foods
    const [submittedFoods, setSubmittedFoods] = useState<Array<{
        description: string;
        calories: number | string;
        protein?: number;
        fat?: number;
        carbs?: number;
        fiber?: number;
        totalSugars?: number;
        servingSize?: number;
    }>>([]);

    // State to track consumed nutrients
    const [consumedNutrients, setConsumedNutrients] = useState({
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        water: 0,
    });

    // Define daily nutritional goals
    const dailyGoals = {
        calories: 2000,
        protein: 50,
        carbs: 300,
        fat: 70,
        fiber: 30,
        water: 2500,
    };

    // Fetch food data from the API based on user query
    const fetchFoodData = async (query: string) => {
        try {
            const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&api_key=${FDC_API_KEY}`);
            const foodData: FoodData[] = response.data.foods.slice(0, 10);
            console.log('Food Data:', foodData);
    
            // Extract calorie and nutrient information from the response
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
                    totalSugars: totalSugars ? totalSugars.value : 'N/A',
                    servingSize: 1 // Default serving size to 1
                };

            });
    
            setSearchResults(resultsWithCalories);
        } catch (error) {
            console.error('Error fetching food data:', error);
        }
    };

    // Handle search button click
    const handleSearch = async () => {
        if (inputFoodItem.trim() !== '') {
            await fetchFoodData(inputFoodItem);
        } else {
            console.log('Please enter a food item to search.');
        }
    };

    // Fetch player data and food data on component mount
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

        if (!playerData || playerData.username === 'Unknown') {
            fetchPlayerData();
        }
    }, [dispatch, playerData, inputFoodItem]);

    // Handle saving a selected food item
    const handleSaveFood = (food: {
        description: string;
        calories: number | string;
        protein?: number;
        fat?: number;
        carbs?: number;
        fiber?: number;
        totalSugars?: number;
        servingSize?: number;
    }) => {
        console.log('Food selected for submission:', food);
        setSelectedFoodDetails(food);
    };

    // Update consumed nutrients based on a food item
    const updateConsumedNutrients = (food: {
        calories: number | string;
        protein?: number;
        fat?: number;
        carbs?: number;
        fiber?: number;
        totalSugars?: number;
        servingSize?: number;
    }) => {
        const servingSize = food.servingSize || 1;
        const multiplier = servingSize > 0 ? servingSize : 1;

        console.log('Food:', food);
        console.log('Serving Size:', servingSize);
        console.log('Multiplier:', multiplier);

        setConsumedNutrients(prev => {
            const calories = typeof food.calories === 'number' ? food.calories : parseFloat(food.calories as string) || 0;
            const protein = food.protein || 0;
            const carbs = food.carbs || 0;
            const fat = food.fat || 0;
            const fiber = food.fiber || 0;

            console.log('Before Update - Calories:', prev.calories, 'Protein:', prev.protein, 'Carbs:', prev.carbs, 'Fat:', prev.fat, 'Fiber:', prev.fiber);

            const newNutrients = {
                calories: prev.calories + calories * multiplier,
                protein: prev.protein + protein * multiplier,
                carbs: prev.carbs + carbs * multiplier,
                fat: prev.fat + fat * multiplier,
                fiber: prev.fiber + fiber * multiplier,
                water: prev.water, // Update if water is tracked
            };

            console.log('After Update - Calories:', newNutrients.calories, 'Protein:', newNutrients.protein, 'Carbs:', newNutrients.carbs, 'Fat:', newNutrients.fat, 'Fiber:', newNutrients.fiber);

            return newNutrients;
        });
    };

    // Handle form submission to add a food item
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Check if a food item is selected
        if (!selectedFoodDetails || !selectedFoodDetails.description) {
            console.error('Please select a food item before submitting.');
            return;
        }

        console.log('Submitting food:', selectedFoodDetails);

        // Directly use the selected food details without adjusting for serving size
        updateConsumedNutrients(selectedFoodDetails);

        // Add the food to the list of submitted foods
        setSubmittedFoods(prevFoods => [...prevFoods, selectedFoodDetails]);

        // Clear the selected food details after submission
        setSelectedFoodDetails(null);
    };

    // Handle deletion of a food item
    const handleDelete = (index: number) => {
        const foodToDelete = submittedFoods[index];
        const servingSize = foodToDelete.servingSize || 1;
        const multiplier = servingSize > 0 ? servingSize : 1;

        // Subtract the nutrients of the deleted food from the consumed nutrients
        setConsumedNutrients(prev => ({
            calories: prev.calories - (typeof foodToDelete.calories === 'number' ? foodToDelete.calories : parseFloat(foodToDelete.calories as string) || 0) * multiplier,
            protein: prev.protein - (foodToDelete.protein || 0) * multiplier,
            carbs: prev.carbs - (foodToDelete.carbs || 0) * multiplier,
            fat: prev.fat - (foodToDelete.fat || 0) * multiplier,
            fiber: prev.fiber - (foodToDelete.fiber || 0) * multiplier,
            water: prev.water,
        }));

        // Remove the food from the submitted foods list
        setSubmittedFoods(prevFoods => prevFoods.filter((_, i) => i !== index));
    };

    // Update a specific food entry in the submitted foods list
    const updateFoodEntry = (index: number, updatedFood: {
        description: string;
        calories: number | string;
        protein?: number;
        fat?: number;
        carbs?: number;
        fiber?: number;
        totalSugars?: number;
        servingSize?: number;
    }) => {
        if (index < 0 || index >= submittedFoods.length) {
            console.error('Invalid index for updating food entry');
            return;
        }

        setSubmittedFoods(prevFoods => {
            const newFoods = [...prevFoods];
            newFoods[index] = updatedFood;
            return newFoods;
        });

        // Update consumed nutrients
        setConsumedNutrients(prev => ({
            calories: prev.calories - (typeof submittedFoods[index].calories === 'number' ? submittedFoods[index].calories : parseFloat(submittedFoods[index].calories as string) || 0) + (typeof updatedFood.calories === 'number' ? updatedFood.calories : parseFloat(updatedFood.calories as string) || 0),
            protein: prev.protein - (submittedFoods[index].protein || 0) + (updatedFood.protein || 0),
            carbs: prev.carbs - (submittedFoods[index].carbs || 0) + (updatedFood.carbs || 0),
            fat: prev.fat - (submittedFoods[index].fat || 0) + (updatedFood.fat || 0),
            fiber: prev.fiber - (submittedFoods[index].fiber || 0) + (updatedFood.fiber || 0),
            water: prev.water, // Update if water is tracked
        }));
    };

    // Calculate remaining nutrients and progress
    const caloriesRemaining = (dailyGoals.calories - consumedNutrients.calories).toFixed(2);
    const caloriesBarProgress = parseFloat(((consumedNutrients.calories / dailyGoals.calories) * 100).toFixed(2));

    const proteinRemaining = (dailyGoals.protein - consumedNutrients.protein).toFixed(2);
    const proteinBarProgress = parseFloat(((consumedNutrients.protein / dailyGoals.protein) * 100).toFixed(2));

    const carbRemaining = (dailyGoals.carbs - consumedNutrients.carbs).toFixed(2);
    const carbBarProgress = parseFloat(((consumedNutrients.carbs / dailyGoals.carbs) * 100).toFixed(2));

    const fatRemaining = (dailyGoals.fat - consumedNutrients.fat).toFixed(2);
    const fatBarProgress = parseFloat(((consumedNutrients.fat / dailyGoals.fat) * 100).toFixed(2));

    const fiberRemaining = (dailyGoals.fiber - consumedNutrients.fiber).toFixed(2);
    const fiberBarProgress = parseFloat(((consumedNutrients.fiber / dailyGoals.fiber) * 100).toFixed(2));

    // Ensure water calculations are correct if used
    let water = 2500;
    let waterConsumed = consumedNutrients.water; // Use the consumed water value
    let waterRemaining = (water - waterConsumed).toFixed(2);
    let waterBarProgress = parseFloat(((waterConsumed / water) * 100).toFixed(2));

    useEffect(() => {
        // Check if user is logged in
        const username = localStorage.getItem('username');
        if (!username) {
            navigate('/'); // Redirect to home if not logged in
        }
    }, [navigate]);

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
                            {searchResults.length > 0 && <FoodSearchResults results={searchResults} onSave={handleSaveFood} onUpdate={updateFoodEntry} />}
                        </Form>
                    </Card>

                    {/* Container with submitted foods */}
                    <Card className="nutrition-tracker-results-container">
                        {submittedFoods.map((food, index) => {
                            const servingSize = food.servingSize || 1;
                            return (
                                <Accordion key={index} className="nutrition-tracker-results-content">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header className="nutrition-tracker-results-header">
                                            <b className="food-title">{food.description} - </b>
                                            <b>Serving Size: {servingSize}</b>
                                            <FontAwesomeIcon icon={faX} className="delete-button" onClick={() => handleDelete(index)} />
                                        </Accordion.Header>
                                        <Accordion.Body className="nutrition-tracker-results-body">
                                            <p>Calories: {((typeof food.calories === 'number' ? food.calories : parseFloat(food.calories as string) || 0) * servingSize).toFixed(2)}</p>
                                            <p>Protein: {((food.protein || 0) * servingSize).toFixed(2)}g</p>
                                            <p>Carbs: {((food.carbs || 0) * servingSize).toFixed(2)}g</p>
                                            <p>Fat: {((food.fat || 0) * servingSize).toFixed(2)}g</p>
                                            <p>Fiber: {((food.fiber || 0) * servingSize).toFixed(2)}g</p>
                                            <p>Total Sugars: {((food.totalSugars || 0) * servingSize).toFixed(2)}g</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            );
                        })}
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
}

export default Nutrition;