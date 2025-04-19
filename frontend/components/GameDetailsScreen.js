
/**
 * @file GameDetailsScreen.js
 * @author Brendan Dileo - April 2025
 * 
 * This file contains the GameDetailsScreen component for the Video Game Collection App.
 * This component serves as a detailed view for a single game in the users collection, 
 * displaying information about the game not displayed in the list of games displayed in
 * the CollectionScreen component. It fetches the game data from the backend API server
 * and displays it in an organized layout.
 *
 * StAuth10244: I Brendan Dileo, 000879513 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
 */

import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import gameDetailsStyles from '../styles/gameDetailsStyles';

import api from '../api';

/**
 * This component renders the GameDetails screen of the app, which displays detailed information about a game
 * in the users collection. The game details are fetched from the backend API server and displayed in a card
 * containing the game data. The component also includes a back button to allow the user to go back to the 
 * Collection screen, and tracks the games in the users collection and whether the app is loading or not.
 * It also handles route parameters which allow the game data to be fetched from the Collection screen component.
 * 
 * @returns {JSX.Element} - The rendered GameDetailsScreen component
 */
const GameDetailsScreen = () => {
    // Hook to navigate back to the Collection screen
    const navigation = useNavigation();
    // Route hook to access the parameters containing the game ID
    const route = useRoute();
    // Extracts the game id from the route params
    const { gameId } = route.params;
    // Stores the list of games in the users collection
    const [game, setGame] = useState(null);
    // Tracks whether the app is waiting for data to load
    const [loading, setLoading] = useState(true);

    /**
     * Fetches details about a specific game by its id from the backend API server.
     * It makes a GET request to the backend to get the details of the game, and updates the
     * local state with the fetched game data. If an error occurs during the request, an alert
     * is displayed to the user indicating an error.
     */
    const fetchGameDetails = async () => {
        try {
            // Makes a GET request to the backend API server to get the details of the game by id
            const response = await api.get(`/api/${gameId}`);
            // Updates local state with the fetched game data
            setGame(response.data);
            setLoading(false);
        } catch (error) {
            Alert.alert('Error', 'Failed to load game details');
            setLoading(false);
        }
    };

    // Fetch the game details when the component first loads or when the gameId changes
    useEffect(() => {
        fetchGameDetails();
    }, [gameId]);

    // If the app is still loading, a loading indicator is displayed
    if (loading) {
        return (
            <View style={gameDetailsStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#9370db" />
                <Text style={gameDetailsStyles.loadingText}>Loading game details...</Text>
            </View>
        );
    }


    // If the game data couldnt be retrieved, an error message is displayed
    if (!game) {
        return (
            <View style={gameDetailsStyles.errorContainer}>
                <Ionicons name="alert-circle-outline" size={50} color="#ff7675" />
                <Text style={gameDetailsStyles.errorText}>Game not found</Text>
                <TouchableOpacity 
                    style={gameDetailsStyles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={gameDetailsStyles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={gameDetailsStyles.container}>
            {/* Header with the back button and screen title */}
            <View style={gameDetailsStyles.header}>
                {/* Back button to navigate back to the Collection screen */}
                <TouchableOpacity 
                    style={gameDetailsStyles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#2d3436" />
                </TouchableOpacity>
                <Text style={gameDetailsStyles.title}>Game Details</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={gameDetailsStyles.content}>
                {/* Game card containing the games details */}
                <View style={gameDetailsStyles.card}>
                    {/* Game title */}
                    <Text style={gameDetailsStyles.gameTitle}>{game.title}</Text>
                    
                    {/* Game platform */}
                    <View style={gameDetailsStyles.infoRow}>
                        <Text style={gameDetailsStyles.label}>Platform:</Text>
                        <Text style={gameDetailsStyles.value}>{game.platform}</Text>
                    </View>
                    
                    {/* Game genre */}
                    <View style={gameDetailsStyles.infoRow}>
                        <Text style={gameDetailsStyles.label}>Genre:</Text>
                        <Text style={gameDetailsStyles.value}>{game.genre || 'Not specified'}</Text>
                    </View>

                    {/* Hours played */}
                    <View style={gameDetailsStyles.infoRow}>
                        <Text style={gameDetailsStyles.label}>Hours Played:</Text>
                        <Text style={gameDetailsStyles.value}>{game.hours_played || 0}</Text>
                    </View>
                    
                    {/* Status */}
                    <View style={gameDetailsStyles.infoRow}>
                        <Text style={gameDetailsStyles.label}>Status:</Text>
                        <Text style={[
                            gameDetailsStyles.value,
                            gameDetailsStyles.statusText,
                            game.completed ? gameDetailsStyles.completedText : gameDetailsStyles.inProgressText
                        ]}>
                            {game.completed ? 'Completed' : 'In Progress'}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default GameDetailsScreen; 