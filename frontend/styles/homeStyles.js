
/**
 * @file homeStyles.js
 * @author Brendan Dileo - April 2025
 * 
 * The styles for the Home Screen of the Video Game Collection App.
 *
 * StAuth10244: I Brendan Dileo, 000879513 certify that this material is my original work.
 * No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
 */

import { StyleSheet } from 'react-native';

/**
 * Creates a javascript stylesheet that is applied to the Home Screen component.
 */
export const styles = StyleSheet.create({

    // Container for the home screen
    mainContainer: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },

    // Makes the home screen scrollable
    scrollableContent: {
        flex: 1,
    },

    // Header for the home screen
    appHeader: {
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

    // Container for the text in the header
    headerTextContainer: {
        position: 'relative',
        zIndex: 2,
    },

    // Adds a circular decoration to the header for a modern look
    headerBackground: {
        position: 'absolute',
        top: -50,
        right: -50,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(147, 112, 219, 0.08)',
        transform: [{ scale: 1.2 }],
    },

    // Text for the apps title
    appTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2d3436',
        marginBottom: 8,
    },

    // Text for the apps subtitle
    appSubtitle: {
        fontSize: 16,
        color: '#636e72',
    },

    // Section for the main content of the home screen
    mainContent: {
        padding: 20,
    },

    // Container for the collection card
    collectionCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        overflow: 'hidden',
        position: 'relative',
    },

    // Container for the text in the collection card
    cardTextContainer: {
        padding: 20,
        position: 'relative',
        zIndex: 2,
    },

    // Adds a background decoration to the collection card
    cardBackground: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 100,
        height: 100,
        backgroundColor: 'rgba(147, 112, 219, 0.1)',
        borderTopLeftRadius: 50,
    },

    // Text for the collection card title
    collectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#2d3436',
        marginBottom: 8,
    },

    // Text for the collection cards description
    collectionDescription: {
        fontSize: 14,
        color: '#636e72',
    },

    // Container for the number of games and games completed on screen 
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    // Card boxes for the number of games and games completed
    statBox: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 15,
        marginHorizontal: 5,
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

    // Left card box
    leftStatBox: {
        borderLeftWidth: 4,
        borderLeftColor: '#a29bfe',
    },

    // Right card box
    rightStatBox: {
        borderLeftWidth: 4,
        borderLeftColor: '#81ecec',
    },

    // Text for the number of games and games completed
    statNumber: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2d3436',
        marginBottom: 4,
    },

    // Text for the number of games and games completed
    statLabel: {
        fontSize: 14,
        color: '#636e72',
    },

    // Section for the quick actions
    quickActionsSection: {
        marginTop: 20,
    },

    // Card container for quick actions
    quickActionsCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
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

    // Text for the section heading
    sectionHeading: {
        fontSize: 20,
        fontWeight: '600',
        color: '#9370db',
        marginBottom: 15,
        letterSpacing: 0.5,
    },

    // Container for the action buttons
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
    },

    // Individual action button for adding a game or viewing recent games
    actionButton: {
        flex: 1,
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: 'rgba(147, 112, 219, 0.08)',
    },

    // Left action button for adding a game
    leftActionButton: {
        borderLeftWidth: 4,
        borderLeftColor: '#9370db',
    },

    // Right action button for viewing recent games
    rightActionButton: {
        borderLeftWidth: 4,
        borderLeftColor: '#9370db',
    },

    // Text for all the action buttons
    actionButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#9370db',
        letterSpacing: 0.3,
    },

    // Container for the featured games section
    featuredSection: {
        marginTop: 20,
        marginBottom: 10,
    },

    // Container for the featured games
    featuredGameCard: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 15,
        marginRight: 15,
        width: 200,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },

     // Text for the featured games
     gameName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#9370db',
        marginBottom: 8,
        letterSpacing: 0.5,
    },

    // Text for the featured games rating
    gameScore: {
        fontSize: 16,
        color: '#a29bfe',
        marginBottom: 4,
        letterSpacing: 0.3,
    },

    // Text for the featured games category
    gameCategory: {
        fontSize: 14,
        color: '#636e72',
        letterSpacing: 0.3,
    },

}); 