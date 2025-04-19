
/**
 * @file CollectionScreen.js
 * @author Brendan Dileo - April 2025
 * 
 * This file contains the CollectionScreen component for the Video Game Collection App.
 * This component serves as the screen for the user to view, add, edit, and delete games 
 * from their collection. It interacts with the backend api server to perform CRUD operations
 * on the game collection stored in a database by allowing the user to add, edit, and delete games.
 * 
 * StAuth10244: I Brendan Dileo, 000879513 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
 */

import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, SafeAreaView, Alert, RefreshControl, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collectionStyles } from '../styles/collectionStyles';
import { useNavigation } from '@react-navigation/native';

import api from '../api';

/**
 * This component renders the Collection screen of the app, which displays the users game collection.
 * It uses interactive buttons to display each of the games in the users collection, and allows the user
 * to edit or delete games, or delete all games from their collection. When the user clicks on a game, they
 * are redirected to the GameDetails screen where they can view more information about the game. If the user
 * clicks on the edit button, a modal is displayed with the games information allowing the user to edit it. 
 * If the user clicks on the fixed add button in the bottom right, another modal is displayed with a form where
 * the user can add a new game to their collection. This screen also includes a pull to refresh feature that 
 * allows refresh the collection by pulling down on the screen. 
 * 
 * @returns {JSX.Element} - The JSX containing the CollectionScreen component.
 */
const CollectionScreen = () => {
    // Navigation hook for screen navigation
    const navigation = useNavigation();
    
    // Stores the list of games in the users collection
    const [games, setGames] = useState([]);
    // Tracks whether the collection is being refreshed with the pull to refresh
    const [refreshing, setRefreshing] = useState(false);
    // Tracks whether the app is waiting for data to load
    const [loading, setLoading] = useState(true);
    // Tracks the visibility of the add and edit modals
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    // Tracks the current game being edited by the user
    const [currentGame, setCurrentGame] = useState(null);
    
    // Stores the data for the new game being added to the users collection
    const [newGame, setNewGame] = useState({
        title: '',
        platform: '',
        status: 'Not Started'
    });

    /**
     * Retreives all games from the backend server and updates the games state with
     * the response data. If an error occurs while fetching the data, an alert is 
     * displayed indicating an error.
     */
    const fetchGames = async () => {
        setLoading(true);
        try {
            // Makes the GET request to retrieve all games
            const response = await api.get('/api');
            // Store the response data containing the game collection
            // in the games state
            setGames(response.data);
            setLoading(false);
        } catch (error) {
            Alert.alert('Error', 'Failed to load games');
            setLoading(false);
        }
    };

    /**
     * Handles the pull to refresh functionality.
     * It sets the refreshing state to true, fetches the latest games data, and
     * then sets the refreshing state back to indicate its no longer refreshing.
     * The function is called when the user pulls down the screen to refresh.
     */
    const onRefresh = async () => {
        setRefreshing(true);
        await fetchGames();
        setRefreshing(false);
    };

    // Loads all games when the component first loads
    useEffect(() => {
        fetchGames();
    }, []);

    /**
     * Handles the deletion of a single game from the users collection.
     * First an alert is used to confirm the deletion with the user before proceeding
     * with the deleteion. If the user confirms, a DELETE request is sent to the backend
     * API server to delete the game. If the request is successful, meaning the game was
     * deleted, the local state is updated to remove the deleted game from the collection.
     * If the request fails, an alert is displayed to the user indicating an error with their
     * request.
     * 
     * @param {string} gameId - The id of the game being deleted.
     */
    const handleDelete = async (gameId) => {
        // Uses custom styles 'destructive' and 'cancel' to style the buttons in the alert
        Alert.alert(
            'Delete Game',
            'Are you sure you want to delete this game?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            // Makes the DELETE request to the backend API server
                            await api.delete(`/api/${gameId}`);
                            // Filters the game out from the local state if successful
                            setGames(games.filter(game => game.id !== gameId));
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete game');
                        }
                    },
                },
            ]
        );
    };

    /**
     * Handles the editing of a game in the collection by opening the edit modal.
     * All this function does is update the states to indicate the game being edited
     * and to open the edit modal.
     * 
     * @param {Object} game - The game object being edited by the user.
     */
    const handleEdit = (game) => {
        setCurrentGame(game);
        setEditModalVisible(true);
    };

    /**
     * Handles the user adding a new game to their collection.
     * It first validates that the new game title to ensure the user has entered a title.
     * Then a POST request is sent to the backend API server to add the new game. If the 
     * response from the server contains the new game data, the local games state is updated
     * to contain the newly added game, the add modal is closed, and the new game form is reset.
     * If the POST request fails for some reason, an alert is displayed to the user indicating an error.
     * 
     * @returns {void} - No return value, updates state.
     */
    const handleAddGame = async () => {
        // Check if the title is empty
        if (!newGame.title.trim()) {
            Alert.alert('Error', 'Game title is required');
            return;
        }

        try {
            // Makes the POST request to the backend API server with the new game data
            const response = await api.post('/api', newGame);
            // Check if the server response contains the new game data
            if (response.data) {
                // Updates local states
                setGames([...games, response.data]);
                setAddModalVisible(false);
                setNewGame({
                    title: '',
                    platform: '',
                    status: 'Not Started'
                });
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to add game');
        }
    };

    /**
     * Handles updating an existing game in the users collection after it has been edited.
     * It first validates that the updated game title is not empty, and then sends a PUT request
     * to the backend API server to update the games data with the new data. If the update is successful,
     * the local state is updated to reflect the changes. If the update fails, an error alert is displayed
     * to the user indicating there was something wrong with their request.
     * 
     * @returns {void} - No return value, updates state.
     */
    const handleUpdateGame = async () => {
        // Check if the title is empty
        if (!currentGame.title.trim()) {
            Alert.alert('Error', 'Game title is required');
            return;
        }

        try {
            // Makes the PUT request to the backend API server with the updated game data
            // and the game id to update
            const response = await api.put(`/api/${currentGame.id}`, currentGame);
            // Check if the server responded with the updated game data
            if (response.data) {
                // Updates the local games state with the updated game data by 
                // mapping over the current games and replacing the updated game data
                setGames(games.map(game => 
                    game.id === currentGame.id ? response.data : game
                ));
                // Closes the edit modal
                setEditModalVisible(false);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to update game');
        }
    };

    /**
     * Handles deleting all games from the users collection.
     * It first displays a confirmation alert to the user to confirm that they want to delete all 
     * games. If the user confirms, a DELETE request is sent to the backend API server deleting all
     * of the games from the users collection and database storage. If the request is successful,
     * the local state is updated to remove all games from the collection and a success alert is 
     * displayed to the user. If the request fails, an error alert is displayed to the user.
     */
    const handleDeleteAll = async () => {
        Alert.alert(
            'Delete All Games',
            'Are you sure you want to delete all games? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete All',
                    style: 'destructive',
                    // Triggered when the Delete All button is pressed
                    onPress: async () => {
                        try {
                            // Makes the DELETE request to delete all games
                            await api.delete('/api');
                            // Updates local state to empty list as all games have been deleted
                            setGames([]);
                            Alert.alert('Success', 'All games have been deleted');
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete all games');
                        }
                    },
                },
            ]
        );
    };

    /**
     * Renders a card for each game in the users collection. 
     * It displays brief information about the game and the users status with the game, aswell as 
     * buttons for editing and deleting the game from their collection. The card is wrapped in a 
     * TouchableOpacity so the user can click on it to navigate to the GameDetails screen, which
     * will display more information about the game in their collection.
     * 
     * @param {Object} game - The game object containing the game data to be displayed.
     * @returns {JSX.Element} - The game card component.
     */
    const renderGameCard = (game) => (
        // Wraps the game card in a TouchableOpacity to make it clickable
        // and navigate to the GameDetails screen when pressed
        <TouchableOpacity 
            key={game.id} 
            style={collectionStyles.gameCard}
            onPress={() => navigation.navigate('GameDetails', { gameId: game.id })}
        >
            {/* Section inside the card that displays some of the game data */}
            <View style={collectionStyles.gameCardContent}>
                <Text style={collectionStyles.gameTitle}>{game.title}</Text>
                <Text style={collectionStyles.gamePlatform}>{game.platform}</Text>
                <Text style={collectionStyles.gameStatus}>
                    Status: {game.status || 'Not Started'}
                </Text>
            </View>
            
            {/* Buttons for editing and deleting the game */}
            <View style={collectionStyles.gameActions}>
                <TouchableOpacity 
                    style={collectionStyles.actionButton}
                    onPress={() => handleEdit(game)}
                >
                    <Ionicons name="pencil" size={20} color="#9370db" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[collectionStyles.actionButton, collectionStyles.deleteButton]}
                    onPress={() => handleDelete(game.id)}
                >
                    <Ionicons name="trash" size={20} color="#ff7675" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    /**
     * Renders a modal for adding a new game to the users collection. 
     * The modal is displayed when the local add modal state is set to true, and is closed when the user 
     * chooses to close the modal, or the game has been saved to the users collection successfully. When 
     * displayed, the modal contains a form with fields that allow the user to enter the games title, 
     * platform, and status, which is up to the user to select. The modal also contains buttons that allow 
     * the user to either save the new game to their collection, or cancel the action and close the modal.
     * It also uses the KeyboardAvoidingView component to ensure the keyboard of the device does not cover 
     * the modal content.
     * 
     * @returns {JSX.Element} - The add game modal component.
     */
    const renderAddModal = () => (
        // Creates the modal component with a slide animation and transparent background
        // The modal is displayed when the addModalVisible state is true and closed when
        // the user presses the cancel button
        <Modal
            animationType="slide"
            transparent={true}
            visible={addModalVisible}
            onRequestClose={() => setAddModalVisible(false)}
        >
            {/* Ensures the keyboard does not cover the modal */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={collectionStyles.modalContainer}
            >   
                {/* Container for the modals content */}
                <View style={collectionStyles.modalContent}>
                    <Text style={collectionStyles.modalTitle}>Add New Game</Text>

                    {/* Form fields */}
                    <Text style={collectionStyles.inputLabel}>Title</Text>
                    <TextInput
                        style={collectionStyles.input}
                        value={newGame.title}
                        onChangeText={(text) => setNewGame({...newGame, title: text})}
                        placeholder="Game Title"
                    />
                    
                    <Text style={collectionStyles.inputLabel}>Platform</Text>
                    <TextInput
                        style={collectionStyles.input}
                        value={newGame.platform}
                        onChangeText={(text) => setNewGame({...newGame, platform: text})}
                        placeholder="Platform (e.g., PS5, Xbox, PC)"
                    />
                    
                    <Text style={collectionStyles.inputLabel}>Status</Text>
                    <View style={collectionStyles.statusContainer}>
                        {/* Creates the status buttons for the user to select from */}
                        {['Not Started', 'In Progress', 'Completed'].map((status) => (
                            <TouchableOpacity
                                key={status}
                                style={[
                                    collectionStyles.statusButton,
                                    newGame.status === status && collectionStyles.statusButtonActive
                                ]}
                                onPress={() => setNewGame({...newGame, status})}
                            >
                                <Text style={[
                                    collectionStyles.statusButtonText,
                                    newGame.status === status && collectionStyles.statusButtonTextActive
                                ]}>
                                    {status}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    
                    {/* Modal buttons that allow the user to cancel the action or save the new game */}
                    <View style={collectionStyles.modalActions}>
                        <TouchableOpacity 
                            style={[collectionStyles.modalButton, collectionStyles.cancelButton]}
                            onPress={() => setAddModalVisible(false)}
                        >
                            <Text style={collectionStyles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[collectionStyles.modalButton, collectionStyles.saveButton]}
                            onPress={handleAddGame}
                        >
                            <Text style={[collectionStyles.modalButtonText, collectionStyles.saveButtonText]}>
                                Add Game
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );

    /**
     * Renders a modal for editing an existing game in the users collection.
     * The modal is displayed when the local edit modal state is set to true, and is closed when the user
     * chooses to close the modal, or the game has been saved to the users collection successfully. When
     * displayed, the modal contains a form with fields that allow the user to edit the games title,
     * platform, and status. The modal also contains buttons that allow the user to either save the
     * changes made to the game in their collection, or cancel the action and close the modal. It also uses 
     * the KeyboardAvoidingView component to ensure the keyboard of the device does not cover the content in
     * the modal.
     * 
     * @returns {JSX.Element} - The edit game modal component.
     */
    const renderEditModal = () => (
        // Creates the modal component with a slide animation and transparent background
        // The modal is displayed when the editModalVisible state is true and closed when
        // the user presses the cancel button
        <Modal
            animationType="slide"
            transparent={true}
            visible={editModalVisible}
            onRequestClose={() => setEditModalVisible(false)}
        >
            {/* Ensures the keyboard does not cover the modal */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={collectionStyles.modalContainer}
            >
                {/* Container for the modals content */}
                <View style={collectionStyles.modalContent}>
                    <Text style={collectionStyles.modalTitle}>Edit Game</Text>
                    
                    {/* Form input fields */}
                    {/* As the user edits the game, the current game state is updated to reflect the changes */}
                    <Text style={collectionStyles.inputLabel}>Title</Text>
                    <TextInput
                        style={collectionStyles.input}
                        value={currentGame?.title}
                        onChangeText={(text) => setCurrentGame({...currentGame, title: text})}
                        placeholder="Game Title"
                    />
                    
                    <Text style={collectionStyles.inputLabel}>Platform</Text>
                    <TextInput
                        style={collectionStyles.input}
                        value={currentGame?.platform}
                        onChangeText={(text) => setCurrentGame({...currentGame, platform: text})}
                        placeholder="Platform (e.g., PS5, Xbox, PC)"
                    />
                    
                    <Text style={collectionStyles.inputLabel}>Status</Text>
                    <View style={collectionStyles.statusContainer}>
                        {['Not Started', 'In Progress', 'Completed'].map((status) => (
                            <TouchableOpacity
                                key={status}
                                style={[
                                    collectionStyles.statusButton,
                                    currentGame?.status === status && collectionStyles.statusButtonActive
                                ]}
                                onPress={() => setCurrentGame({...currentGame, status})}
                            >
                                <Text style={[
                                    collectionStyles.statusButtonText,
                                    currentGame?.status === status && collectionStyles.statusButtonTextActive
                                ]}>
                                    {status}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    
                    {/* Buttons that allow the user to cancel the action or save the changes made to the game */}
                    <View style={collectionStyles.modalActions}>
                        <TouchableOpacity 
                            style={[collectionStyles.modalButton, collectionStyles.cancelButton]}
                            onPress={() => setEditModalVisible(false)}
                        >
                            <Text style={collectionStyles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[collectionStyles.modalButton, collectionStyles.saveButton]}
                            onPress={handleUpdateGame}
                        >
                            <Text style={[collectionStyles.modalButtonText, collectionStyles.saveButtonText]}>
                                Save Changes
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );

    return (
        <SafeAreaView style={collectionStyles.container}>
            {/* Header section with the Collection screen title and subtitle */}
            <View style={collectionStyles.header}>
                <View style={collectionStyles.headerContent}>
                    <Text style={collectionStyles.title}>My Games</Text>
                    <Text style={collectionStyles.subtitle}>Manage your game collection</Text>
                </View>
                {/* Circle style for modern effect */}
                <View style={collectionStyles.headerDecoration} />
            </View>

            {/* Scrollable section with the pull to refresh feature */}
            <ScrollView 
                style={collectionStyles.scrollView}
                refreshControl={
                    // RefreshControl for pull to refresh and uses state to indicate refreshing
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={collectionStyles.content}>
                    {/* Check to see if the app is loading, if so displays the loading text */}
                    {loading ? (
                        <Text style={collectionStyles.loadingText}>Loading games...</Text>
                    // If the user has no games in their collection, a default empty state is displayed
                    ) : games.length === 0 ? (
                        // Empty state to indicate a empty collection
                        <View style={collectionStyles.emptyState}>
                            <Ionicons name="game-controller-outline" size={50} color="#b2bec3" />
                            <Text style={collectionStyles.emptyStateText}>
                                No games in your collection yet
                            </Text>
                        </View>
                    ) : (
                        // If the user has games in their collection, a delete all button is displayed 
                        // along with the list of games in their collection
                        <>
                            <TouchableOpacity 
                                style={collectionStyles.deleteAllButton}
                                onPress={handleDeleteAll}
                            >
                                <Ionicons name="trash" size={20} color="#ff7675" />
                                <Text style={collectionStyles.deleteAllButtonText}>Delete All Games</Text>
                            </TouchableOpacity>
                            {games.map(renderGameCard)}
                        </>
                    )}
                </View>
            </ScrollView>

            {/* Fixed add button that triggers the add modal when pressed */}
            <TouchableOpacity 
                style={collectionStyles.addButton}
                onPress={() => setAddModalVisible(true)}
            >
                <Ionicons name="add" size={30} color="#ffffff" />
            </TouchableOpacity>

            {/* Only renders the modals if the state is set to true */}
            {renderAddModal()}
            {renderEditModal()}
        </SafeAreaView>
    );
};

export default CollectionScreen;