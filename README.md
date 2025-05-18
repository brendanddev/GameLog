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
- Update `config.js` file in the frontend directory with your local IP address
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
- Press 'i' 


Run the following commands in both the `backend` and `frontend` folders.

Use the package manager [npm](https://www.npmjs.com/).

```bash
npm install
npm start
```

> ⚠️ **Important:** You may need to update the IP address in `config.js` to your own IP to ensure the Axios connection to the backend works correctly.

```js
const config = {
    API_URL: 'http://<your-ip>:3001', // Replace <your-ip> with your local or server IP address
};
```

## Acknowledgements
- [React Modal](https://reactnative.dev/docs/modal)
- [React RefreshControl](https://reactnative.dev/docs/refreshcontrol)
