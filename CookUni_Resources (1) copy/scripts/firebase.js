// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
// import {getFireStore, collection, getDocs} from "../node_modules/firebase/firestore/lite"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAteVgiGpbznQNode67LSXvxy8tVj_ozgc",
  authDomain: "cookuni-project-e02ab.firebaseapp.com",
  projectId: "cookuni-project-e02ab",
  storageBucket: "cookuni-project-e02ab.appspot.com",
  messagingSenderId: "917959143210",
  appId: "1:917959143210:web:84f9ae585fa25edc38f853",
};
// login page notifications
var receiptList = [];
const successEl = document.querySelector("#successBox");
const errorEl = document.querySelector("#errorBox");
const loadingEl = document.querySelector("#loadingBox");
const dbUrl = "https://cookuni-project-e02ab-default-rtdb.firebaseio.com";

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const recepitRef = db.collection("Recepies");

async function addReceipt(receiptData) {
  receiptData.userID = sessionStorage.getItem("token");
  receiptData.likesCounter = 0;
  errorEl.classList.remove("show");
  loadingEl.classList.add("show");
  try {
    let response = await fetch(dbUrl + "/Recipes.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(receiptData),
    });
    response = await response.json();

    loadingEl.classList.remove("show");
    successEl.innerHTML = "Recipes successfully added";
    successEl.classList.add("show");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (error) {
    loadingEl.classList.remove("show");
    errorEl.innerHTML = "Sorry recipe cound not be added";
    errorEl.classList.add("show");
    console.log(error);
  }
}
// getting the recipes
async function getReceipt() {
  const foodNotFound = document.querySelector("#foodNotFound");
  try {
    let response = await fetch(dbUrl + "/Recipes.json");
    response = await response.json();
    receiptList = Object.entries(response).map(([id, recipe]) => ({
      id,
      ...recipe,
    }));
    if (!receiptList.length) {
      foodNotFound.classList.remove("hide");
    }
  } catch (error) {
    foodNotFound.classList.remove("hide");
    console.log("Could not load recipe");
  }
}
// selecting recipes by id to see if they exist
async function getReceiptById(id) {
  try {
    // const doc = await recepitRef.doc(id).get();
    let response = await fetch(dbUrl + "/Recipes/" + id + ".json");
    response = await response.json();
    console.log(response);
    if (response) {
      return { id, ...response };
    } else {
      console.log("Could not fetch the recipie");
    }
    console.log(doc);
  } catch (error) {
    console.log(error);
  }
}
// updating recipes
async function updateRecipe(id, toUpdate) {
  errorEl.classList.remove("show");
  loadingEl.classList.add("show");
  try {
    let response = await fetch(dbUrl + "/Recipes/" + id + ".json", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toUpdate),
    });
    response = await response.json();

    loadingEl.classList.remove("show");
    successEl.innerHTML = "Edited recipe successful";
    successEl.classList.add("show");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (error) {
    loadingEl.classList.remove("show");
    errorEl.innerHTML = "Sorry you could not edit recipe";
    errorEl.classList.add("show");
    console.log(error);
  }
}
// console.log(getReceipts(dbRef))
// deleting recipes
async function deleteRecipe(id) {
  errorEl.classList.remove("show");
  loadingEl.classList.add("show");
  try {
    let response = await fetch(dbUrl + "/Recipes/" + id + ".json", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();

    loadingEl.classList.remove("show");
    successEl.innerHTML = "Delete recipe successful";
    successEl.classList.add("show");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (error) {
    loadingEl.classList.remove("show");
    errorEl.innerHTML = "Sorry you could not delete recipe";
    errorEl.classList.add("show");
    console.log(error);
  }
}
// sign up for page
async function signUp(data) {
  data.username = data.username.toLowerCase();
  data.password = data.password.toLowerCase();
  if (
    data.username.length < 3 ||
    data.firstName.length < 2 ||
    data.lastName.length < 2 ||
    data.password !== data.repeatPassword
  ) {
    errorEl.innerHTML =
      "Sorry minimun of 2 characters needed and password should be the same as repeat password";
    errorEl.classList.add("show");
    return;
  }
  errorEl.classList.remove("show");
  loadingEl.classList.add("show");
  try {
    let response = await fetch(dbUrl + "/Users.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    response = await response.json();
    sessionStorage.setItem("token", response.name);

    loadingEl.classList.remove("show");
    successEl.innerHTML = "Sign up successful";
    successEl.classList.add("show");
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  } catch (error) {
    loadingEl.classList.remove("show");
    errorEl.innerHTML = "Sorry you could not sign up";
    errorEl.classList.add("show");
    console.log(error);
  }
}
// logging into page
async function login(username, password) {
  try {
    errorEl.classList.remove("show");
    loadingEl.classList.add("show");
    let authToken;
    let response = await fetch(dbUrl + "/Users.json");
    response = await response.json();
    const userLogin = Object.entries(response).find(([id, user]) => {
      authToken = id;
      return user.username === username && user.password === password;
    });
    loadingEl.classList.remove("show");
    if (userLogin) {
      sessionStorage.setItem("token", authToken);
      successEl.innerHTML = "Login successful";
      successEl.classList.add("show");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      errorEl.innerHTML = "Wrong credentials";
      errorEl.classList.add("show");
    }
  } catch (error) {
    loadingEl.classList.remove("show");
    errorEl.innerHTML = "Sorr you could not get logged in";
    errorEl.classList.add("show");
    console.log(error);
  }
}
