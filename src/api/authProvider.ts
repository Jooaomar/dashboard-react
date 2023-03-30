import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import axios from "axios";



const firebaseConfig = {
  // configurações do Firebase
  apiKey: "AIzaSyB-GEFES--3_STtkIbpfFC2iwS7H_6HT30",
  authDomain: "data-simone.firebaseapp.com",
  databaseURL: "https://data-simone-default-rtdb.firebaseio.com",
  projectId: "data-simone",
  storageBucket: "data-simone.appspot.com",
  messagingSenderId: "818619714374",
  appId: "1:818619714374:web:1b604dfb7c117d52a7b347"
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