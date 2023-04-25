import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import axios from "axios";



const firebaseConfig = {
  // configurações do Firebase
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGIN_SENDER_ID,
  appId: APP_ID
};

firebase.initializeApp(firebaseConfig);


const authProvider = {
  login: ({ username, password }) => {
    return firebase.auth().signInWithEmailAndPassword(username, password)
      .then(() => {
        return Promise.resolve();
      })
      .catch((error) => {
        return Promise.reject(error.message);
      });
  },

  logout: () => {
    return firebase.auth().signOut()
      .then(() => {
        return Promise.resolve();
      })
      .catch((error) => {
        return Promise.reject(error.message);
      });
  },

  checkAuth: () => {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve();
        } else {
          reject();
        }
      });
    });
  },

  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => {
    const token = firebase.auth().currentUser.getIdToken();
    return axios.get("http://localhost:8000/permissions", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch(() => {
      return Promise.reject();
    });
  },
};

export default authProvider;
