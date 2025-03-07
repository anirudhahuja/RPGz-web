import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './navigation/types';
import LoginScreen from './screens/LoginScreen';
import { Town } from './screens/Town';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
    return (
        <NavigationContainer>
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Town" component={Town} />
        </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
