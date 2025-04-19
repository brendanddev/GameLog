
/**
 * @file collectionStyles.js
 * @author Brendan Dileo - April 2025
 * 
 * The styles for the Collection Screen of the Video Game Collection App.
 *
 * StAuth10244: I Brendan Dileo, 000879513 certify that this material is my original work.
 * No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
 */

import { StyleSheet } from 'react-native';

/**
 * Creates a javascript stylesheet that is applied in the Collection Screen component.
 */
export const collectionStyles = StyleSheet.create({

    // Main container for the entire screen
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    
    // Scrollable content area
    scrollView: {
        flex: 1,
    },
    
    // Header section with title and subtitle
    header: {
        padding: 20,
        paddingTop: 40,
        backgroundColor: '#ffffff',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        position: 'relative',
        overflow: 'hidden',
    },
    
    // Container for header text
    headerContent: {
        position: 'relative',
        zIndex: 2,
    },
    
    // Circle style for modern effect in header
    headerDecoration: {
        position: 'absolute',
        top: -50,
        right: -50,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(147, 112, 219, 0.08)',
        transform: [{ scale: 1.2 }],
    },
    
    // Title text in the header
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2d3436',
        marginBottom: 8,
    },
    
    // Subtitle text in the header
    subtitle: {
        fontSize: 16,
        color: '#636e72',
    },
    
    // Main content area padding
    content: {
        padding: 20,
    },
    
    // Individual game card container
    gameCard: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        marginBottom: 15,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    
    // Content section of the game card
    gameCardContent: {
        flex: 1,
    },
    
    // Game title text in the card
    gameTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2d3436',
        marginBottom: 4,
    },
    
    // Game platform text in the card
    gamePlatform: {
        fontSize: 14,
        color: '#636e72',
        marginBottom: 4,
    },
    
    // Game status text in the card
    gameStatus: {
        fontSize: 14,
        color: '#9370db',
        fontWeight: '500',
    },
    
    // Container for game action buttons
    gameActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    // Individual action button
    actionButton: {
        padding: 8,
        borderRadius: 8,
        marginLeft: 8,
        backgroundColor: 'rgba(147, 112, 219, 0.1)',
    },
    
    // Delete button styling
    deleteButton: {
        backgroundColor: 'rgba(255, 118, 117, 0.1)',
    },
    
    // Floating action button for adding a new game
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#9370db',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    
    // Loading state text
    loadingText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#636e72',
        marginTop: 20,
    },
    
    // Empty state container
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    
    // Empty state text
    emptyStateText: {
        fontSize: 16,
        color: '#636e72',
        textAlign: 'center',
        marginTop: 10,
    },
    
    // Modal Styles
    
    // Container for the modal overlay
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    
    // Content container for the modal
    modalContent: {
        width: '90%',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    
    // Title text for the modal
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2d3436',
        marginBottom: 20,
        textAlign: 'center',
    },
    
    // Label text for form inputs
    inputLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#2d3436',
        marginBottom: 8,
    },
    
    // Text input field styling
    input: {
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
        color: '#2d3436',
    },
    
    // Container for status selection buttons
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    
    // Individual status button
    statusButton: {
        flex: 1,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#f8f9fa',
        marginHorizontal: 4,
        alignItems: 'center',
    },
    
    // Active state for status button
    statusButtonActive: {
        backgroundColor: 'rgba(147, 112, 219, 0.2)',
        borderWidth: 1,
        borderColor: '#9370db',
    },
    
    // Text for status button
    statusButtonText: {
        fontSize: 14,
        color: '#636e72',
    },
    
    // Active state text for status button
    statusButtonTextActive: {
        color: '#9370db',
        fontWeight: '500',
    },
    
    // Container for modal action buttons
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    
    // Individual modal button
    modalButton: {
        flex: 1,
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    
    // Cancel button styling
    cancelButton: {
        backgroundColor: '#f8f9fa',
    },
    
    // Save button styling
    saveButton: {
        backgroundColor: '#9370db',
    },
    
    // Text for modal buttons
    modalButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#636e72',
    },
    
    // Text for save button
    saveButtonText: {
        color: '#ffffff',
    },
    
    // Delete all games button
    deleteAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 118, 117, 0.1)',
        padding: 12,
        borderRadius: 10,
        marginBottom: 15,
        justifyContent: 'center',
    },
    
    // Text for delete all button
    deleteAllButtonText: {
        color: '#ff7675',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 8,
    },
}); 