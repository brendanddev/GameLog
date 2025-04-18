
/**
 * @file HomeScreen.js
 * @author Brendan Dileo - April 2025
 * 
 * This file contains the HomeScreen component for the Video Game Collection App.
 * It serves as the users main entry point into the app, rendering a header, dashboard,
 * quick actions, and featured games section. The structure for this component is made up
 * of React Native components such as 'View', 'Text', 'TouchableOpacity', to build the apps
 * home screen.
 * 
 * StAuth10244: I Brendan Dileo, 000879513 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
 */

import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/homeStyles';

/**
 * This component renders the contents of the home screen, consisting of 
 * different sections and buttons. The screen is organized into several sections
 * including a header, main collection card, quick action buttons, and featured games.
 * For demonstration purposes, the featured games are hardcoded to three games but I 
 * intend to expand this to make a call to an API to get random games.
 * 
 * @return {JSX.Element} - The JSX rendering the HomeScreen component.
 */
const HomeScreen = () => {
    // Hook to navigate to the Collection screen
    const navigation = useNavigation();

    // Demo data for featured games section
    const featuredGames = [
        { id: 1, title: 'Elden Ring', rating: '9.5/10', genre: 'Action RPG' },
        { id: 2, title: 'Baldur\'s Gate 3', rating: '9.8/10', genre: 'RPG' },
        { id: 3, title: 'Cyberpunk 2077', rating: '8.5/10', genre: 'Action RPG' },
    ];

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView style={styles.scrollableContent}>
                {/* Header section containing the title and subtitle */}
                <View style={styles.appHeader}>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.appTitle}>Gamelog</Text>
                        <Text style={styles.appSubtitle}>Begin your gaming journey today.</Text>
                    </View>
                    {/* Circle style for modern effect */}
                    <View style={styles.headerBackground} />
                </View>

                <View style={styles.mainContent}>
                    {/* Main collection card with nav to the Collection screen */}
                    <TouchableOpacity 
                        style={styles.collectionCard}
                        onPress={() => navigation.navigate('Collection')}
                    >
                        <View style={styles.cardTextContainer}>
                            <Text style={styles.collectionTitle}>My Collection</Text>
                            <Text style={styles.collectionDescription}>
                                View and manage your game collection
                            </Text>
                        </View>
                        {/* Circle style for modern effect */}
                        <View style={styles.cardBackground} />
                    </TouchableOpacity>

                    {/* Stats display showing game counts */}
                    <View style={styles.statsContainer}>
                        <View style={[styles.statBox, styles.leftStatBox]}>
                            <Text style={styles.statNumber}>0</Text>
                            <Text style={styles.statLabel}>Games</Text>
                        </View>
                        <View style={[styles.statBox, styles.rightStatBox]}>
                            <Text style={styles.statNumber}>0</Text>
                            <Text style={styles.statLabel}>Completed</Text>
                        </View>
                    </View>

                    {/* Quick action buttons for adding or deleting games, not used right now */}
                    <View style={styles.quickActionsSection}>
                        <Text style={styles.sectionHeading}>Quick Actions</Text>
                        <View style={styles.actionButtonsContainer}>
                            <TouchableOpacity 
                                style={[styles.actionButton, styles.leftActionButton]}
                            >
                                <Text style={styles.actionButtonText}>Add Game</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.actionButton, styles.rightActionButton]}
                            >
                                <Text style={styles.actionButtonText}>Recent</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Featured games section with horizontal scrolling */}
                    <View style={styles.featuredSection}>
                        <Text style={styles.sectionHeading}>Featured Games</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {featuredGames.map((game) => (
                                <TouchableOpacity key={game.id} style={styles.featuredGameCard}>
                                    <Text style={styles.gameName}>{game.title}</Text>
                                    <Text style={styles.gameScore}>{game.rating}</Text>
                                    <Text style={styles.gameCategory}>{game.genre}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;

