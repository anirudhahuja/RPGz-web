import React, { useState, useCallback, useMemo } from 'react';
import { Container, Card, Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import character1 from "../../assets/character_creation/1.png"
import character2 from "../../assets/character_creation/2.png"
import character3 from "../../assets/character_creation/3.png"
import character4 from "../../assets/character_creation/4.png"
import character5 from "../../assets/character_creation/5.png"
import character6 from "../../assets/character_creation/6.png"
import headImage from "../../assets/character_creation/head.png"
import hairImage from "../../assets/character_creation/char_hair.png"

interface CharacterCreationProps {
    isOpen: boolean;    
    onClose: () => void;
}

interface CustomizationOption {
    label: string;
    options: string[];  // This will be replaced with actual options/images later
    currentIndex: number;
}

interface HairStyle {
    x: number;
    y: number;
    offsetX?: number;
    offsetY?: number;
    clipPath?: string;  // Add clipPath for variations
    name?: string;      // Optional name for the variation
    defaultColor?: string;  // Add default color option
}

interface HairColor {
    filter: string;
    name: string;
}

interface SkinTone {
    filter: string;
    name: string;
}

const CharacterCreation = React.memo(({ isOpen, onClose }: CharacterCreationProps) => {
    // Define hair colors with their filter values
    const hairColors = useMemo<HairColor[]>(() => [
        { filter: 'none', name: 'Natural Brown' },
        { filter: 'brightness(40%) saturate(50%)', name: 'Deep Black' },
        { filter: 'hue-rotate(-30deg) brightness(150%)', name: 'Golden Blonde' },
        { filter: 'hue-rotate(30deg) saturate(150%)', name: 'Auburn' },
        { filter: 'brightness(120%) saturate(90%)', name: 'Light Brown' },
        { filter: 'hue-rotate(330deg) saturate(60%)', name: 'Silver Gray' },
        { filter: 'hue-rotate(15deg) saturate(140%)', name: 'Chestnut' },
        { filter: 'brightness(70%) saturate(130%)', name: 'Dark Brown' },
        { filter: 'hue-rotate(-15deg) brightness(140%)', name: 'Honey Blonde' },
        { filter: 'hue-rotate(45deg) saturate(120%)', name: 'Copper Red' },
        { filter: 'brightness(85%) saturate(110%)', name: 'Ash Brown' },
        { filter: 'hue-rotate(90deg) saturate(150%)', name: 'Rich Red' }
    ], []);

    // Define skin tones with their filter values
    const skinTones = useMemo<SkinTone[]>(() => [
        { filter: 'brightness(95%) sepia(10%) saturate(90%)', name: 'Porcelain' },
        { filter: 'brightness(90%) sepia(20%) saturate(95%)', name: 'Ivory' },
        { filter: 'brightness(85%) sepia(30%) saturate(90%)', name: 'Warm Beige' },
        { filter: 'brightness(80%) sepia(40%) saturate(85%)', name: 'Golden' },
        { filter: 'brightness(75%) sepia(50%) saturate(85%)', name: 'Honey' },
        { filter: 'brightness(65%) sepia(60%) saturate(90%)', name: 'Caramel' },
        { filter: 'brightness(55%) sepia(70%) saturate(95%)', name: 'Amber' },
        { filter: 'brightness(45%) sepia(80%) saturate(100%)', name: 'Umber' },
        { filter: 'brightness(35%) sepia(90%) saturate(110%)', name: 'Mahogany' },
        { filter: 'brightness(25%) sepia(100%) saturate(120%)', name: 'Ebony' },
    ], []);

    // Define coordinates and variations for each hairstyle
    const hairStyles = useMemo<HairStyle[]>(() => [
        { x: 0, y: 0, offsetX: -10, name: "Long Straight" }, // 1
        { x: 3, y: 0, offsetX: -15, offsetY: -10, name: "Full Volume" }, // 2
        { x: 1, y: 0, offsetX: -12, clipPath: 'inset(0 0 40% 0)', name: "Tousled Bob" }, // 3
        { x: 2, y: 0, offsetX: -15, offsetY: -5, name: "Wavy Long" }, // 4  
        { x: 0, y: 0, offsetX: -10, clipPath: 'inset(0 0 20% 0)', name: "Classic Short" }, // 5
        { x: 1, y: 0, offsetX: -12, name: "Textured Long" }, // 6
        { x: 2, y: 0, offsetX: -15, offsetY: -5, clipPath: 'inset(0 0 45% 0)', name: "Wavy Medium" }, // 7
        { x: 0, y: 0, offsetX: -10, clipPath: 'inset(0 0 35% 0)', name: "Shoulder Length" }, // 8
        { x: 3, y: 0, offsetX: -15, offsetY: -10, clipPath: 'inset(0 10% 20% 26%)', name: "Long Bob" }, // 9
        { x: 0, y: 1, offsetX: -15, name: "Golden Waves" }, // 10
        { x: 1, y: 1, offsetX: -20, clipPath: 'inset(5% 0 0 0)', name: "Short Textured" }, // 11
        { x: 2, y: 1, offsetX: -20, offsetY: -10, name: "Layered Medium" }, // 12
        { x: 0, y: 1, offsetX: -15, clipPath: 'inset(0 0 45% 20%)', name: "Short Dense" }, // 13
        { x: 3, y: 1, offsetX: -17, name: "Dark Waves" }, // 14
        { x: 1, y: 1, offsetX: -20, clipPath: 'inset(5% 0 40% 0)', name: "Short Wavy" }, // 15
    ], []);

    const initialCustomization = useMemo(() => [
        { label: "Hair Style", options: hairStyles.map(h => h.name || ''), currentIndex: 0 },
        { label: "Hair Color", options: hairColors.map(c => c.name), currentIndex: 0 },
        { label: "Facial Hair", options: ["None", "Beard", "Mustache", "Goatee"], currentIndex: 0 },
        { label: "Skin Tone", options: skinTones.map(s => s.name), currentIndex: 0 },
        { label: "Outfit", options: ["Casual", "Formal", "Adventure", "Royal"], currentIndex: 0 },
    ], [hairStyles, hairColors, skinTones]);

    const [customization, setCustomization] = useState<CustomizationOption[]>(initialCustomization);

    const handlePrevious = useCallback((index: number) => {
        setCustomization(prev => prev.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    currentIndex: item.currentIndex === 0 ? 
                        item.options.length - 1 : 
                        item.currentIndex - 1
                };
            }
            return item;
        }));
    }, []);

    const handleNext = useCallback((index: number) => {
        setCustomization(prev => prev.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    currentIndex: item.currentIndex === item.options.length - 1 ? 
                        0 : 
                        item.currentIndex + 1
                };
            }
            return item;
        }));
    }, []);
    
    const getHairStyle = useCallback((index: number) => {
        const style = hairStyles[index];
        const currentColor = hairColors[customization[1].currentIndex];
        
        return {
            backgroundImage: `url(${hairImage})`,
            backgroundPosition: `-${style.x * 150}px -${style.y * 150}px`,
            backgroundSize: '600px 300px',
            width: '120px',
            height: '120px',
            position: 'absolute',
            top: style.offsetY || 0,
            left: `${style.offsetX || -10}px`,
            filter: currentColor.filter,
            clipPath: style.clipPath,
        } as React.CSSProperties;
    }, [hairStyles, hairColors, customization]);
    
    const getCharacterStyle = useCallback(() => {
        const currentSkinTone = skinTones[customization[3].currentIndex];
        
        return {
            filter: currentSkinTone.filter,
        } as React.CSSProperties;
    }, [skinTones, customization]);

    // Memoize the customization options to prevent unnecessary re-renders
    const customizationOptions = useMemo(() => {
        return customization.map((option, index) => (
            <div key={option.label} className="customization-row">
                <Button 
                    variant="primary" 
                    onClick={() => handlePrevious(index)}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Button>
                <span className="option-label">
                    {option.label === "Hair Style" 
                        ? `${option.label} ${option.currentIndex + 1}` 
                        : option.label
                    }
                </span>
                <Button 
                    variant="primary" 
                    onClick={() => handleNext(index)}
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </Button>
            </div>
        ));
    }, [customization, handlePrevious, handleNext]);

    return (
        <Container className="character-creation-container">
            <Card className={`character-creation-card ${isOpen ? 'open' : 'close'}`}>
                <Card.Body>
                    <div className="character-preview">
                        <div className="character-layers">
                            <Image 
                                src={headImage}
                                alt="Character Base" 
                                className="character-base"
                                style={getCharacterStyle()} 
                            />
                            <div 
                                className="hair-layer"
                                style={getHairStyle(customization[0].currentIndex)}
                            />
                        </div>
                    </div>
                    <div className="customization-options">
                        {customizationOptions}
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
});

export default CharacterCreation;
