
/**
 * @file App.js
 * @author Brendan Dileo, April 2025
 * 
 * This file contains the main App component for the Video Game Collection App.
 * It serves as the main entry point to the app, rendering the layout, setting 
 * up navigation, managing the tab and stack navigation, and rendering the components 
 * that will be interacted with by the user.
 * 
 * StAuth10244: I Brendan Dileo, 000879513 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import HomeScreen from './components/HomeScreen';
import CollectionScreen from './components/CollectionScreen';
import GameDetailsScreen from './components/GameDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * CollectionStack Component
 * 
 * This component is responsible for managing the navigation between the Collection screen and the 
 * Game Details screen. It uses a stack navigator to allow users to navigate back and forth between 
 * the screens. 
 * 
 * @returns {JSX.Element} - The stack navigator containing the Collection and GameDetails screens.
 */
const CollectionStack = () => {
    return (
        // Creates the Stack Navigator
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Speicifes the screens in the nav stack */}
            <Stack.Screen name="CollectionList" component={CollectionScreen} />
            <Stack.Screen name="GameDetails" component={GameDetailsScreen} />
        </Stack.Navigator>
    );
};

/**
 * App Component
 * 
 * This component is responsible for setting up the apps navigation and rendering
 * the apps layout. It sets up the bottom tab navigator with two options for the
 * user to switch between, Home and Collection. The Collection screen uses a stack
 * navigator that allows the user to navigate to the Game Details screen from the
 * Collection screen.
 * 
 * @returns {JSX.Element} - The main App Component that sets up the navigation and renders the tab and stack navigation.
 */
const App = () => {
  return (
    // Wraps in a GestureHandlerRootView to enable gesture handling
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Sets up the Navigation Container to manage navigation states */}
      <NavigationContainer>
        {/* Tab Navigator to switch between the Home and Collection screens */}
        <Tab.Navigator
          // Changes the tab bar icon based on which of the screens are active
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              // Sets the icon based on the name of the route and changes the outline
              // based on whether the tab is focused or not
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Collection') {
                iconName = focused ? 'game-controller' : 'game-controller-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            // Basic styles for the tab bar
            tabBarActiveTintColor: '#9370db',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}
        >
          {/* Screens in the bottom tab navigator */}
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Collection" component={CollectionStack} />
        </Tab.Navigator>
        {/* Sets style of the status bar based on the current screen */}
        <StatusBar style="auto" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;