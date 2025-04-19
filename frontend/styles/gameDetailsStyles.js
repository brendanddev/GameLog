
/**
 * @file gameDetailsStyles.js
 * @author Brendan Dileo - April 2025
 * 
 * The styles for the Game Details Screen of the Video Game Collection App.
 * 
 * StAuth10244: I Brendan Dileo, 000879513 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
 */

import { StyleSheet } from 'react-native';

/**
 * Creates a javascript stylesheet that is applied in the GameDetails Screen component.
 */
const gameDetailsStyles = StyleSheet.create({
    
    // Main container for the entire game details screen
    container: {
        flex: 1,
        backgroundColor: '#f5f6fa',
    },

    // Header section containing back button and title
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
    },

    // Title text in the header
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2d3436',
    },

    // Back button styling
    backButton: {
        padding: 8,
    },

    // Main content area that scrolls
    content: {
        flex: 1,
        padding: 16,
    },

    // Card container for game details
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    // Game title styling
    gameTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2d3436',
        marginBottom: 16,
    },

    // Row container for each piece of game information
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
    },

    // Styling for the label text
    label: {
        fontSize: 16,
        color: '#636e72',
        fontWeight: '500',
    },

    // Styling for the value text
    value: {
        fontSize: 16,
        color: '#2d3436',
        fontWeight: '600',
    },

    // Styling for the status text
    statusText: {
        fontWeight: '600',
    },

    // Styling for the completed status text
    completedText: {
        color: '#00b894',
    },

    // Styling for the in progress status text
    inProgressText: {
        color: '#fdcb6e',
    },

    // Loading container styles
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f6fa',
    },

    // Loading text
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#636e72',
    },

    // Error container
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f6fa',
        padding: 16,
    },

    // Error text
    errorText: {
        marginTop: 12,
        fontSize: 18,
        color: '#636e72',
        textAlign: 'center',
    },

    // Back button text
    backButtonText: {
        fontSize: 16,
        color: '#0984e3',
        fontWeight: '600',
        marginTop: 16,
    },
});

export default gameDetailsStyles; 