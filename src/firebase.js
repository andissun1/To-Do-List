import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyCvmGv71VRMyFbuGPwX0EW6XiDWOiDCMN4',
  authDomain: 'to-do-list-andis.firebaseapp.com',
  projectId: 'to-do-list-andis',
  storageBucket: 'to-do-list-andis.firebasestorage.app',
  messagingSenderId: '895751815470',
  appId: '1:895751815470:web:64fc84e0832214a1987abf',
  dataBaseURL: 'https://to-do-list-andis-default-rtdb.firebaseio.com/',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
