import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';

interface TownProps {
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export function Town({ setIsLoggedIn }: TownProps) {
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
            <ImageBackground
                source={require('../../assets/village.gif')}
                style={styles.backgroundImage}
            >
            <View style={styles.content}>
                <Text style={styles.title}>Welcome</Text>
                
                {/* Menu Buttons */}
                <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuButton}>
                    <Text style={styles.menuButtonText}>Player Info</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.menuButton}>
                    <Text style={styles.menuButtonText}>Quest Log</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.menuButton}>
                    <Text style={styles.menuButtonText}>Skills</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.menuButton}>
                    <Text style={styles.menuButtonText}>Nutrition</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.menuButton}
                    onPress={() => setIsLoggedIn(false)}
                >
                    <Text style={styles.menuButtonText}>Logout</Text>
                </TouchableOpacity>
                </View>
            </View>
            </ImageBackground>
        </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    content: {
        flex: 1,
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
    },
    menuContainer: {
        gap: 10,
    },
    menuButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    menuButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
}); 