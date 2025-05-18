# GameLog

## Overview
GameLog is a full-stack application for managing a personal video game collection. It allows users to track their games, including details like platform, genre, hours played, and completion status. Built with React Native and Node.js, Gamelog provides a modern, mobile-first interface for managing your gaming library.

## Features
- Mobile-first design with React Native
- Track Game details (title, platform, genre, hours played, etc)
- Real-time updates and synchronization
- Simple and intuitive user interface
- Local SQLIte database for data persistence
- RESTful API architecture

## Tech Stack
### Frontend
- React Native
- Expo
- React Navigation & Gesture Handler
- Axios

### Backend
- Node.js
- Express
- SQLite3

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Expo CLI
- iOS Simulator


## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/GameLog.git
cd GameLog
```

2. Install frontend and backend dependencies
```bash
cd backend
npm install

cd ../frontend
npm install
```

3. Configure the frontend
> ⚠️ **Important:** You may need to update the IP address in `config.js` to your own IP to ensure the Axios connection to the backend works correctly.
```js
const config = {
    API_URL: 'http://<your-ip>:3001',
};
```

## Running the Application
1. Start the backend server:
```bash
cd backend
npm start (node server.js)
```

2. Start the frontend application:
```bash
cd frontend
npm start
```

3. Use Expo to run the application:
- Press 'i' to run on iOS simulator
- Press 'a' to run on Android emulator
- Scan QR code with Expo Go app on your physical device

## API Endpoints
- `GET /api` - Retrieve all games
- `POST /api` - Add a new game
- `PUT /api` - Update entire collection
- `DELETE /api` - Delete all games
- `GET /api/:id` - Get single game
- `PUT /api/:id` - Update single game
- `DELETE /api/:id` - Delete single game

## Author
Brendan Dileo

## Acknowledgements
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Express.js](https://expressjs.com/)
- [SQLite](https://www.sqlite.org/)
- [React Navigation](https://reactnavigation.org/)
- [React Modal](https://reactnative.dev/docs/modal)
- [React RefreshControl](https://reactnative.dev/docs/refreshcontrol)
