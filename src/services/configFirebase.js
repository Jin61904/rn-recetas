// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 apiKey: "AIzaSyDKJ268nN_7iDnKtPo-cxJg3boTic72jG4",
  authDomain: "apprece-2fa9e.firebaseapp.com",
  databaseURL: "https://apprece-2fa9e-default-rtdb.firebaseio.com",
  projectId: "apprece-2fa9e",
  storageBucket: "apprece-2fa9e.firebasestorage.app",
  messagingSenderId: "818502866973",
  appId: "1:818502866973:web:c4d640e659f07417404ef4",
  measurementId: "G-MKTLJEJ73L"
};


const app= initializeApp(firebaseConfig)
const db =getDatabase(app)

export {app, db};