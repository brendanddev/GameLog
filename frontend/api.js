
/**
 * @file api.js
 * @author Brendan Dileo, April 2025
 * 
 * This file contains the logic for setting up an axios instance to interact with the 
 * backend server. It configures the base url and default headers for all API requests
 * made to the server. The axios client is used instead of repetitive 'fetch' calls to
 * simplify the setup and error handling when making requests to the backend server,
 * streamlining the process. Axios automatically handles tasks like JSON parsing and
 * response error handling, providing a more consistent approach.
 * 
 * StAuth10244: I Brendan Dileo, 000879513 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
 */

import axios from "axios";
import config from "./config.js"

// Creates an axios instance to make HTTP requests to the backend server
const api = axios.create({
    baseURL: config.API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;