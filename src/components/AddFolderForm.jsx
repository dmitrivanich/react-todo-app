import React, { useState } from 'react'
import { VscCircleLargeFilled } from "react-icons/vsc"
import { IoIosClose } from "react-icons/io"
import { AiFillFolderAdd } from 'react-icons/ai';
import "./AddFolderForm.scss"


function AddFolderForm() {

  const colors = [
    ['#dbdad6', '#beab9e', '#b3814e', '#723505', '#202020'],
    ['#e76f3d', '#feab6b', '#f3e9e7', '#9bcfe0', '#00a7c7'],
    ['#424b35', '#171e13', '#561d18', '#a83b24', '#b47c4b'],
    ['#2a4a8b', '#0091b5', '#f8d90f', '#eeba00', '#db5000'],
    ['#252c05', '#a0a90e', '#feec82', '#e33834', '#7c0f0f'],
    ['#dcdfe4', '#aca69f', '#adab76', '#666b3a', '#0f211a'],
    ['#503143', '#9a532b', '#c49b60', '#79ad9f', '#193439']
  ]

  const [visableForm, setVisableForm] = useState(false)

  return (
    <div>

      <div className="nav__addFolder" onClick={() => setVisableForm(true)}>
        <AiFillFolderAdd className="nav__addFolder-icon" />
        <p className="nav__addFolder-text">Add forlder</p>
      </div>

      {visableForm &&
        <div className="addFolderForm" >
          <IoIosClose className="addFolderForm-close" onClick={() => setVisableForm(false)} />
          <input
            className="addFolderForm-input"
            type="text"
            name=""
            id=""
            placeholder="Folder name..."
          />
          <button className="addFolderForm-btn">Add</button>


          <div className="addFolderForm__colors">
            {colors.map(style => {
              return (
                <ul className="addFolderForm__colors-ul" key={style}>{style.map((color, index) => {
                  return (
                    <VscCircleLargeFilled className="addFolderForm__colors-ul__color" color={color} key={index} />
                  )
                })}</ul>
              )
            })}
          </div>
        </div>}
    </div>
  )
}

export default AddFolderForm
