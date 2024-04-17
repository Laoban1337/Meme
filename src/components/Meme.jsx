import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function Meme() {
  //setting state for text
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");

  const [editTopText, setEditTopText] = useState("");

  const [editBottomText, setEditBottomText] = useState("");
  //

  //setting state for randomMeme
  const [randomMeme, setRandomMeme] = useState([]);
  //state for saving and deleting the memes
  const [savedMemes, setSavedMemes] = useState([]);

  const [isEditable, setIsEditable] = useState(false);

  const [editedMemeId, setEditedMemeId] = useState(null);
  //setting a loading state
  //   const [loading, setLoading] = useState(true);

 
  function HandleOnChange(event) {
    const { name, value } = event.target;
    console.log(`Input "${name}" changed to value "${value}"`);
    setResponseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));


    if (name === "topText") {
      setTopText(value);
    } else if (name === "bottomText") {
      setBottomText(value);
    } else if (name === "editTopText") {
      setSavedMemes((prevValue) => {
        console.log(value);
        const memeIndex = prevValue.findIndex(
          (meme) => meme.id === editedMemeId
        );
        const foundMeme = prevValue[memeIndex];
        foundMeme.topText = value;
        return prevValue.toSpliced(memeIndex, 1, foundMeme);
      });
    } else if (name === "editBottomText") {
      setEditBottomText(value);
    }
  }
  function handleSave() {
    if (!responseData || responseData.length === 0) {
      console.error("No meme data available");
      return;
    }

    console.log("saving");

    const newMeme = {
      topText: topText,
      bottomText: bottomText,
      url: randomMeme,
      id: uuidv4(),
    };
    setSavedMemes((prevMemes) => [...prevMemes, newMeme]);
  }

  //generates random meme
  function handleClick(event) {
    event.preventDefault();

    const arrayOfMemes = responseData;
    const randomNumber = Math.floor(Math.random() * responseData.length);
    const randomMeme = arrayOfMemes[randomNumber];

    console.log("clicked");
    setRandomMeme(randomMeme.url);
    clearInputs();
  }

  //clearing out inputs on submit
  function clearInputs() {
    setTopText("");
    setBottomText("");
  }

  function clearEditInputs() {
    setEditTopText("");
    setEditBottomText("");
  }
  // delete meme from bank
  function handleMemeDelete(index) {
    console.log("Attempted delete");

    setSavedMemes((prevMemes) => {
      const updatedMeme = [...prevMemes];
      updatedMeme.splice(index, 1);

      return updatedMeme;
    });
  }

  //edit button function
  function handleMemeEdit(index, id) {
    console.log("Editing your current meme");
    const savedMeme = savedMemes[index];
    setTopText(savedMeme.topText);
    setBottomText(savedMeme.bottomText);
    setIsEditable((preState) => !preState);
    setEditedMemeId(id);
  }
  function handleSaveEdit(index) {
    const editedMemes = savedMemes[index];
    console.log("edit saved");
    setIsEditable((preState) => !preState);
    setEditTopText(editedMemes.editTopText);
    setEditBottomText(editedMemes.editBottomText);

    clearEditInputs();
    setSavedMemes((prevMemes) => {
      const updatedMemes = [...prevMemes];
      updatedMemes[index] = editedMeme;
      return updatedMemes;
    });
  }
  // log savedMemes to the console
  useEffect(() => {
    console.log(savedMemes);
  }, [savedMemes]);

  return (
    <div className="main-container">
      <div className="main">
        <form action="" className="form" onSubmit={handleClick}>
          <div className="inputContainer">
            {isEditable && (
              <div>
                <h3 style={{ color: "white" }}>Editing Meme</h3>
                <input
                  type="text"
                  placeholder="EditTopText"
                  className="form--input"
                  name="editTopText"
                  value={editTopText}
                  onChange={HandleOnChange}
                />
                <br />
                <input
                  type="text"
                  placeholder="EditBottomText"
                  className="form--input"
                  name="editBottomText"
                  value={editBottomText}
                  onChange={HandleOnChange}
                />
              </div>
            )}
            <input
              type="text"
              placeholder="topText"
              className="form--input"
              name="topText"
              value={topText}
              onChange={HandleOnChange}
            />
            <br />
            <input
              type="text"
              placeholder="bottomText"
              className="form--input"
              name="bottomText"
              value={bottomText}
              onChange={HandleOnChange}
            />
            <br />
            <button className="form--button">New Meme Image</button>
            <button onClick={handleSave} className="form--button save">
              Save Meme
            </button>
          </div>

          <div className="memeContainer">
            <div className="meme">
              <div className="img-container">
                {responseData && responseData.length > 0 && (
                  <img
                    src={randomMeme}
                    alt="random meme image"
                    className="meme--image"
                  />
                )}

                <h2 className="meme--text top">{topText}</h2>
                <h2 className="meme--text bottom">{bottomText}</h2>
              </div>
            </div>
          </div>
        </form>

        <div className="saved-memes">
          <h1>Meme Bank</h1>
          {savedMemes.map((savedMeme, index) => (
            <div className="saved-meme" key={index}>
              <img
                className="saved--meme--image"
                src={savedMeme.url}
                alt={`Saved Meme ${index}`}
              />
              <h2 className="meme--text top  ">{savedMeme.topText}</h2>
              <h2 className="meme--text bottom ">{savedMeme.bottomText}</h2>
              {!isEditable ? (
                <button onClick={() => handleMemeEdit(index, savedMeme.id)}>
                  Edit Meme
                </button>
              ) : (
                <button onClick={() => handleSaveEdit(index)}>save edit</button>
              )}
              <button onClick={() => handleMemeDelete(index)}>
                Delete Meme
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
