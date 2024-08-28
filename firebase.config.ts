import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCmr-1tBKfKAgz2XVyarN0hvMShO9-zITU",
  authDomain: "instaclone-43fee.firebaseapp.com",
  databaseURL:
    "https://instaclone-43fee-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "instaclone-43fee",
  storageBucket: "instaclone-43fee.appspot.com",
  messagingSenderId: "277019141116",
  appId: "1:277019141116:web:d9b32d00e00c1f329e0879",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const handleSignup = async (
  email: string,
  password: string,
  name: string,
  username: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await set(ref(database, "users/" + user.uid), {
      username: username,
      name: name,
      email: user.email,
    });

    return user;
  } catch (error) {
    throw error;
  }
};

const handleLogin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw error;
  }
};

export { app, handleSignup, handleLogin };
