import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

interface FoodSearchResultsProps {
    results: Array<{
        description: string;
        calories: number | string;
        protein?: number;
        fat?: number;
        carbs?: number;
        fiber?: number;
        totalSugars?: number;
    }>;
    onSave: (food: {
        description: string;
        calories: number | string;
        protein?: number;
        fat?: number;
        carbs?: number;
        fiber?: number;
        totalSugars?: number;
    }) => void;
}


const FoodSearchResults: React.FC<FoodSearchResultsProps> = ({ results, onSave }) => {
    const [selectedFood, setSelectedFood] = useState<null | typeof results[0]>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedValues, setEditedValues] = useState<Partial<typeof results[0]>>({});

    const handleCardClick = (food: typeof results[0]) => {
        setSelectedFood(food);
        setEditedValues({});
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedValues(selectedFood || {});
    };

    const handleInputChange = (field: keyof typeof results[0], value: string) => {
        setEditedValues(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveClick = () => {
        if (selectedFood) {
            const updatedFood = { ...selectedFood, ...editedValues };
            setSelectedFood(updatedFood);
        }
        setIsEditing(false);
    };

    const handleSelectForSubmission = () => {
        if (selectedFood) {
            onSave(selectedFood);
        }
    };

    return (
        <div className="food-container" style={{ display: 'flex' }}>
            <div className="food-results-container" style={{ maxHeight: '400px', overflowY: 'auto', flex: 1 }}>
                {results.map((food, index) => (
                    <Card 
                        key={index} 
                        className="food-result-card" 
                        onClick={() => handleCardClick(food)}
                        style={{ cursor: 'pointer' }}
                    >
                        <Card.Body>
                            <Card.Title>
                                {food.description}
                            </Card.Title>
                            <Card.Text>
                                Calories: {food.calories}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            {selectedFood && (
                <div className="food-detail-container" style={{ maxHeight: '400px', flex: 1, marginLeft: '20px' }}>
                    <Card className="food-detail-card" style={{ overflowY: 'auto' }}>
                        <Card.Body>
                            <Card.Title>{selectedFood.description} Details</Card.Title>
                            {isEditing ? (
                                <>
                                    <Card.Text>
                                        Calories: <input className="edit-input" type="text" value={editedValues.calories || ''} onChange={(e) => handleInputChange('calories', e.target.value)} />
                                    </Card.Text>
                                    <Card.Text>
                                        Protein: <input className="edit-input" type="text" value={editedValues.protein || ''} onChange={(e) => handleInputChange('protein', e.target.value)} />g
                                    </Card.Text>
                                    <Card.Text>
                                        Carbs: <input className="edit-input" type="text" value={editedValues.carbs || ''} onChange={(e) => handleInputChange('carbs', e.target.value)} />g
                                    </Card.Text>
                                    <Card.Text>
                                        Fat: <input className="edit-input" type="text" value={editedValues.fat || ''} onChange={(e) => handleInputChange('fat', e.target.value)} />g
                                    </Card.Text>
                                    <Card.Text>
                                        Fiber: <input className="edit-input" type="text" value={editedValues.fiber || ''} onChange={(e) => handleInputChange('fiber', e.target.value)} />g
                                    </Card.Text>
                                    <Card.Text>
                                        Total Sugars: <input className="edit-input" type="text" value={editedValues.totalSugars || ''} onChange={(e) => handleInputChange('totalSugars', e.target.value)} />g
                                    </Card.Text>
                                    <button onClick={handleSaveClick} className="edit-button">Save</button>
                                </>
                            ) : (
                                <>
                                    <Card.Text>Calories: {selectedFood.calories}</Card.Text>
                                    <Card.Text>Protein: {selectedFood.protein !== undefined ? selectedFood.protein : 'N/A'}g</Card.Text>
                                    <Card.Text>Carbs: {selectedFood.carbs !== undefined ? selectedFood.carbs : 'N/A'}g</Card.Text>
                                    <Card.Text>Fat: {selectedFood.fat !== undefined ? selectedFood.fat : 'N/A'}g</Card.Text>
                                    <Card.Text>Fiber: {selectedFood.fiber !== undefined ? selectedFood.fiber : 'N/A'}g</Card.Text>
                                    <Card.Text>Total Sugars: {selectedFood.totalSugars !== undefined ? selectedFood.totalSugars : 'N/A'}g</Card.Text>
                                    <button className="edit-button" onClick={handleEditClick}>Edit</button>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                    <button className="submit-button" onClick={handleSelectForSubmission}>Submit</button>
                </div>
            )}
        </div>
    );
};

export default FoodSearchResults;