import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const storage = getStorage();

export const register = async (email, password, full_name) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password, full_name);
    return user;
  } catch (e) {
    console.log(e.message);
  }
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (e) {
    console.log(e.message);
  }
};

export const modify = async (full_name, url) => {
  try {
    return updateProfile(auth.currentUser, { displayName: full_name, photoURL: url });
  } catch (e) {
    console.log(e);
  }
};

export const changePassword = async (password) => {
  try {
    return updatePassword(auth.currentUser, password);
  } catch (e) {
    console.log(e.message);
  }
};

export const reAuth = async (password) => {
  const credential = EmailAuthProvider.credential(auth.currentUser.email, password);

  try {
    return reauthenticateWithCredential(auth.currentUser, credential);
  } catch (e) {
    console.log(e.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchMe = new Promise((resolve, reject) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      resolve(user);
    } else {
      resolve(false);
    }
  });
});

export const upload = async (file, path) => {
  const fileRef = ref(storage, `${auth.currentUser.uid}.${path}`);
  console.log(`${auth.currentUser.uid}.${path}`);

  const snapshat = await uploadBytes(fileRef, file);
  return await getDownloadURL(ref(storage, `${auth.currentUser.uid}.${path}`));
};
