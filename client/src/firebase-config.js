import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyDaHY7NrHQezaRfCcB8TMEj6eD_XoQ3aGw',
    authDomain: 'zing-mp3-17ccb.firebaseapp.com',
    projectId: 'zing-mp3-17ccb',
    storageBucket: 'zing-mp3-17ccb.appspot.com',
    messagingSenderId: '474936180127',
    appId: '1:474936180127:web:0b41882be54a053e16d1aa',
    measurementId: 'G-C0MME8239Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
