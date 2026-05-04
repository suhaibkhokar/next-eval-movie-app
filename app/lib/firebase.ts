import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWjxZ_aMXq75ocvlamf40jn86yAvMkr94",
  authDomain: "movie-app-91d7a.firebaseapp.com",
  projectId: "movie-app-91d7a",
  storageBucket: "movie-app-91d7a.appspot.com",
  messagingSenderId: "766303093442",
  appId: "1:766303093442:web:08f16e6239f29971f1f15b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);