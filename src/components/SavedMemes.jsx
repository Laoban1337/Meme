import Meme from "./Meme"

import "./Components.css"

function SavedMemes(props){
    const { savedMemes, handleDelete, handleEdit, saveMeme } = props


    const allSavedMemes = savedMemes.map(meme => {
        return (
            <Meme 
            meme={meme}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            saveMeme={saveMeme}
          
            />
        )
    })

    return (
        <div>
            { allSavedMemes }
        </div>

    )
}

export default SavedMemes;