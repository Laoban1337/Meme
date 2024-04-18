import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "./App.css";

import Header from "./components/Header";
// import Meme from "./components/Meme";
import NewMeme from "./components/NewMeme";
import SavedMemes from "./components/SavedMemes";

function App() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
    id: uuidv4(),
  });

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
      id: uuidv4(),
    }));
    clearInputs();
  }
  function clearInputs() {
    setMeme((prevMeme) => ({
      ...prevMeme,
      bottomText: "",
      topText: "",
      id: uuidv4(),
    }));
  }

  function saveMeme() {
    setSavedMemes([...savedMemes, meme]);

    setMeme((prevMeme) => {
      return { ...prevMeme, topText: "", bottomText: "", id: uuidv4() };
    });
  }

  function applyEdit(id, meme){
    setSavedMemes(prevState => prevState.map(item => item.id === id ? meme : item ))
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  const [savedMemes, setSavedMemes] = useState([]);
  const [allMemes, setAllMemes] = useState([]);

  function deleteMeme(id){
    setSavedMemes(prevState => prevState.filter(meme => meme.id != id))
  }

  useEffect(() => {
    fetchMemeData();
  }, []);

  function fetchMemeData() {
    axios
      .get("https://api.imgflip.com/get_memes")
      .then((response) => setAllMemes(response.data.data.memes))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    console.log(savedMemes);
  }, [savedMemes]);

  return (
    <>
      <Header />
      <NewMeme
        meme={meme}
        getMemeImage={getMemeImage}
        handleChange={handleChange}
        saveMeme={saveMeme}
      />
      {/* <Meme /> */}
      <SavedMemes
        clearInputs={clearInputs}
        handleChange={handleChange}
        savedMemes={savedMemes}
        saveMeme={applyEdit}
        handleDelete={deleteMeme}
      />
    </>
  );
}

export default App;
