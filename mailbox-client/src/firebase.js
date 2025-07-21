import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebase_api_key } from '../Api_Keys/firebaseApi';

const firebaseConfig = {
  apiKey: firebase_api_key,
  authDomain: 'mailbox-client-8c1d4.firebaseapp.com',
  projectId: 'mailbox-client-8c1d4',
  storageBucket: 'mailbox-client-8c1d4.firebasestorage.app',
  messagingSenderId: '423858311979',
  appId: '1:423858311979:web:bac3679d778e23f18beb6e',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };