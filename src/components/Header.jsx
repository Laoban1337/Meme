import React from "react";
import axios from 'axios';

export default function Header() {
  return (
    <>
      <header className="header">
        <img
          className="header--image"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.S-WPEzxK4v96K5rWgDzMcwHaGB%26pid%3DApi&f=1&ipt=02be996b7cdc8c9b38f2c32d35359b02686dc174ac3f09998a251e02f6f8fdc0&ipo=images"
          alt="troll face"
        />
        <h2 className="header--title">Meme Generator</h2>
        <h3 className="header--project">React Course - Project 3</h3>
      </header>
    </>
  );
}
