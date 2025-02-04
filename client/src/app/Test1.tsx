import React, { useState } from 'react';
import { Container, Row, Col, Form, Dropdown, DropdownButton, ListGroup } from 'react-bootstrap';

// Define the structure of a food item
interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
  water: number;
}

// Sample food items
const foodItems: FoodItem[] = [
  { name: 'Apple', calories: 95, protein: 0.5, fat: 0.3, carbohydrates: 25, water: 86 },
  { name: 'Banana', calories: 105, protein: 1.3, fat: 0.3, carbohydrates: 27, water: 74 },
  { name: 'Chicken Breast', calories: 165, protein: 31, fat: 3.6, carbohydrates: 0, water: 65 },
  { name: 'Broccoli', calories: 55, protein: 3.7, fat: 0.6, carbohydrates: 11, water: 89 },
];

// Daily recommendations for macronutrients
const dailyRecommendations = {
  calories: 2000,
  protein: 50,
  fat: 70,
  carbohydrates: 310,
  water: 3700, // in ml
};

const CalorieTracker: React.FC = () => {
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  // Handle selection of a food item
  const handleSelect = (foodName: string) => {
    const food = foodItems.find(item => item.name === foodName);
    setSelectedFood(food || null);
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h2>Calorie and Macronutrient Tracker</h2>
          <DropdownButton id="dropdown-basic-button" title="Select Food Item">
            {foodItems.map((food) => (
              <Dropdown.Item key={food.name} onClick={() => handleSelect(food.name)}>
                {food.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>Selected Food Item</h4>
          {selectedFood ? (
            <ListGroup>
              <ListGroup.Item><strong>Name:</strong> {selectedFood.name}</ListGroup.Item>
              <ListGroup.Item><strong>Calories:</strong> {selectedFood.calories} kcal</ListGroup.Item>
              <ListGroup.Item><strong>Protein:</strong> {selectedFood.protein} g</ListGroup.Item>
              <ListGroup.Item><strong>Fat:</strong> {selectedFood.fat} g</ListGroup.Item>
              <ListGroup.Item><strong>Carbohydrates:</strong> {selectedFood.carbohydrates} g</ListGroup.Item>
              <ListGroup.Item><strong>Water:</strong> {selectedFood.water} ml</ListGroup.Item>
            </ListGroup>
          ) : (
            <p>Please select a food item from the dropdown.</p>
          )}
        </Col>
        <Col>
          <h4>Daily Recommendations</h4>
          <ListGroup>
            <ListGroup.Item><strong>Calories:</strong> {dailyRecommendations.calories} kcal</ListGroup.Item>
            <ListGroup.Item><strong>Protein:</strong> {dailyRecommendations.protein} g</ListGroup.Item>
            <ListGroup.Item><strong>Fat:</strong> {dailyRecommendations.fat} g</ListGroup.Item>
            <ListGroup.Item><strong>Carbohydrates:</strong> {dailyRecommendations.carbohydrates} g</ListGroup.Item>
            <ListGroup.Item><strong>Water:</strong> {dailyRecommendations.water} ml</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CalorieTracker;
