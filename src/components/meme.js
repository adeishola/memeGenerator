import React, { useEffect, useState } from "react";


export default function Meme() {
 
   const[meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "https://api.imgflip.com/get_memes"
   })
   useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllMemes(data.data.memes))
   }, [])

   function handleChange(event){
    const {name, value} = event.target
    setMeme(prevMeme => {
      return{
        ...prevMeme,
        [name] : value
      }
    })
   }
   function handleSubmit(event){
    event.preventDefault()
   }
  
  const[allMemes, setAllMemes] = useState([])


  function getMemeImages(){
    const randomNumber = Math.floor(Math.random() * allMemes.length)
     const url = allMemes[randomNumber].url
     setMeme(prevMeme => {
      return{
        ...prevMeme,
        randomImage: url
      }
     })

  }

    return (
      <div className="container">
        <div className="bytes">
        <form onSubmit={handleSubmit}>
          <input 
          type="text" 
          placeholder="top text"
          name="topText"
          value={meme.topText}
          onChange={handleChange} 
          />
          <input 
          type="text" 
          placeholder="bottom text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
          />
        </form>
          <button onClick={getMemeImages}>
            Get a new meme image
            <span><img id="get" src="./images/whmcs.svg"  alt=''/></span>
          </button>
      </div>
      <div className="Img">
        <img src={meme.randomImage} alt= '' />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </div>
    )
}
