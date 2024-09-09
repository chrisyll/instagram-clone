import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { get, getDatabase, ref, set } from "firebase/database";
import { LoginPayload } from "./src/store/accountSlice";

type SignupCredentials = {
  email: string;
  password: string;
  name: string;
  username: string;
};

type LoginCredentials = {
  email: string;
  password: string;
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const handleSignup = async ({
  email,
  password,
  name,
  username,
}: SignupCredentials): Promise<LoginPayload> => {
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

    return {
      uid: user.uid,
      email: email,
      username: username,
      name: name,
      accessToken: await user.getIdToken(),
      refreshToken: user.refreshToken,
    };
  } catch (error) {
    throw error;
  }
};

const handleLogin = async ({
  email,
  password,
}: LoginCredentials): Promise<LoginPayload> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const snapshot = await get(ref(database, "users/" + user.uid));

    if (snapshot.exists()) {
      return {
        uid: user.uid,
        email: snapshot.val().email,
        username: snapshot.val().username,
        name: snapshot.val().name,
        accessToken: await user.getIdToken(),
        refreshToken: user.refreshToken,
      };
    }
    throw new Error("User data does not exist in the database.");
  } catch (error) {
    throw error;
  }
};

export { app, handleSignup, handleLogin };
