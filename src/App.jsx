import { useState } from "react";
import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

function App() {
  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyCOglzqR5r7e5U54UBPtzWdsxPqu7AJs9k",
      authDomain: "dates-44100.firebaseapp.com",
      projectId: "dates-44100",
      storageBucket: "dates-44100.appspot.com",
      messagingSenderId: "693610738548",
      appId: "1:693610738548:web:3d42113a7be6df7186b221",
      measurementId: "G-28M4RD1J6Q",
    };
    initializeApp(firebaseConfig);
    const db = getFirestore();
    const collectionMiri = collection(db, "Miri");
    const collectionDragos = collection(db, "Dragos");
    getDocs(collectionMiri)
      .then((snapshot) => {
        let activitati = [];
        snapshot.docs.forEach((doc) => {
          activitati.push({ ...doc.data(), id: doc.id });
        });
        activitati.forEach((activitate) => {
          console.log(activitate.activitate);
          document.querySelector("#activitatiMiri").innerHTML +=
            ' <div class="w-[100%] bg-[#92B4F4] p-4 rounded-3xl mb-2">' +
            activitate.activitate +
            "</div>";
        });
      })
      .catch((err) => {
        console.log(err);
      });

    getDocs(collectionDragos)
      .then((snapshot) => {
        let activitati = [];
        snapshot.docs.forEach((doc) => {
          activitati.push({ ...doc.data(), id: doc.id });
        });
        activitati.forEach((activitate) => {
          console.log(activitate.activitate);
          document.querySelector("#activitatiDragos").innerHTML +=
            ' <div class="w-[100%] bg-[#92B4F4] p-4 rounded-3xl mb-2">' +
            activitate.activitate +
            "</div>";
        });
      })
      .catch((err) => {
        console.log(err);
      });

    const addMiri = document.querySelector("#addMiri");
    addMiri.addEventListener("submit", (e) => {
      e.preventDefault();
      addDoc(collectionMiri, {
        activitate: addMiri.activitateM.value,
      }).then(() => addMiri.reset());
    });
    const addDragos = document.querySelector("#addDragos");
    addDragos.addEventListener("submit", (e) => {
      e.preventDefault();
      addDoc(collectionDragos, {
        activitate: addDragos.activitateD.value,
      }).then(() => addDragos.reset());
    });
  }, []);

  return (
    <>
      <div
        className=" w-screen h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1601654253194-260e0b6984f9?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        }}
      ></div>
      <div className=" absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-80 flex flex-col justify-center items-center">
        {" "}
        <p className="z-40 text-6xl font-bold text-white mb-5">Date Ideas!</p>
        <div className="w-[80%] grid grid-cols-2">
          <div className="flex flex-col  items-center gap-4">
            <h1 className="text-2xl text-white">Miri</h1>
            <form id="addMiri" className="w-[70%]" action="">
              <label htmlFor="activitateM"></label>
              <input
                className=" w-full p-4 rounded-full"
                name="activitateM"
                type="text"
              />
            </form>
            <div
              id="activitatiMiri"
              className="w-[70%] h-[30vh] overflow-y-scroll gap-2"
            ></div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl text-white">Dragoș</h1>
            <form id="addDragos" className="w-[70%]" action="">
              <label htmlFor="activitateD"></label>
              <input
                className=" w-full p-4 rounded-full"
                name="activitateD"
                type="text"
              />
            </form>
            <div
              id="activitatiDragos"
              className="w-[70%] h-[30vh] overflow-y-scroll"
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
