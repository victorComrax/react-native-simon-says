import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { FunctionComponent } from 'react';
import { View } from 'react-native';
import GameScreen from '../screens/Game';
import ResultsScreen from '../screens/Results';


const Stack = createStackNavigator();

const RouterNavigation: FunctionComponent = () => {
    return (

        <View style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Game" component={GameScreen} />
                    <Stack.Screen name="Results" component={ResultsScreen} />
                </Stack.Navigator>
            </NavigationContainer>

        </View>
    )
}

export default RouterNavigation;