# GameLog


## Installation

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
