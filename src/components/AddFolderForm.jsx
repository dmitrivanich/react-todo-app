import React, { useState } from 'react';
import classNames from 'classnames';

import { VscCircleLargeFilled } from "react-icons/vsc";
import { IoIosClose } from "react-icons/io";
import { AiFillFolderAdd } from 'react-icons/ai';

import "./AddFolderForm.scss";


function AddFolderForm({ addNewFolder, sidebarView }) {

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
  const [selectedColor, setSelectedColor] = useState('#feab6b')
  const [inputValue, setInputValue] = useState('')

  const createFolder = () => {
    if (!inputValue) {
      alert('Enter folder name...')
      return;
    }
    addNewFolder({
      "id": null,
      "name": inputValue,
      "color": selectedColor,
      "tasks": []
    })
    setInputValue('')
  }



  return (
    <div className="nav_addFolder-box">
      <div className="nav__addFolder" onClick={() => setVisableForm(true)}>
        <AiFillFolderAdd className="nav__addFolder-icon" />
      </div>

      {visableForm && (
        <div
          className="addFolderForm"
          style={sidebarView ? { top: "-260px" } : { display: "block" }}
        >



          <IoIosClose className="addFolderForm-close" onClick={() => setVisableForm(false)} />

          <input
            value={inputValue}
            className="addFolderForm-input"
            type="text"
            placeholder="Folder name..."
            style={{ color: selectedColor }}
            onChange={e => (setInputValue(e.target.value))}
            onKeyPress={e => { e.key === 'Enter' && setInputValue('') }}
          />

          <button
            className="addFolderForm-btn"
            onClick={createFolder}
            style={{ color: selectedColor }}>Add</button>


          <div className="addFolderForm__colors">
            {colors.map(style => {
              return (
                <ul className="addFolderForm__colors-ul" key={style}>{style.map((color, index) => {
                  return (
                    <VscCircleLargeFilled className={classNames('addFolderForm__colors-ul__color', { 'active': color === selectedColor })} color={color} key={index} onClick={() => { setSelectedColor(color) }} />
                  )
                })}</ul>
              )
            })}
          </div>
        </div>
      )
      }
    </div >
  )
}

export default AddFolderForm
