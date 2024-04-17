import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Header from "./components/Header";
import Meme from "./components/Meme";
import NewMeme from "./components/NewMeme";

function App() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
    id: uuidv4(),
  });

  const [savedMemes, setSavedMemes] = useState([]);

  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    fetchMemeData();
  }, []);

  function fetchMemeData() {
    axios
      .get("https://api.imgflip.com/get_memes")
      .then((response) => setResponseData(response.data.data.memes))
      .catch((err) => console.log(err));
  }
  console.log(responseData);
  return (
    <>
      <Header />
      <NewMeme meme={meme} getMemeImage={} />
      {/* <Meme /> */}
    </>
  );
}

export default App;
