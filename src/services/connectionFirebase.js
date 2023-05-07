// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
//autenticação de email e senha
import 'firebase/compat/auth';
//trabalha com o banco de dados criado no firebase
import 'firebase/compat/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBs0bb-TdEiPFumz5NtqRsEQdhCvDOLXXc",
  authDomain: "appyuh.firebaseapp.com",
  projectId: "appyuh",
  storageBucket: "appyuh.appspot.com",
  messagingSenderId: "435257846988",
  databaseURL: 'https://appyuh-default-rtdb.firebaseio.com/',
  appId: "1:435257846988:web:cb74e4d3eaa4d2942fa669"
};

if(!firebase.apps.lenght){
     //inicializa firebase   
     firebase.initializeApp(firebaseConfig);
    }

     export default firebase;