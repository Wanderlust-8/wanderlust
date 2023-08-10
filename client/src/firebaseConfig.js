import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKtJWmsuGCBdYH_VqE6LRsi1D-AfjwxO4",
  authDomain: "wanderlog-4fbfe.firebaseapp.com",
  projectId: "wanderlog-4fbfe",
  storageBucket: "wanderlog-4fbfe.appspot.com",
  messagingSenderId: "968423807214",
  appId: "1:968423807214:web:0f254beee22b28b578bbff",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
