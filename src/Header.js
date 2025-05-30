import React from 'react'
import { LuListTodo } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { useRef } from 'react';
import './Header.css'

const Header = ({newItem,setNewItem,handleSubmit}) => {


  const change = () =>{
    addForm.current.style.display="flex"
    opacity.current.style.opacity=".1"
    opacity2.current.style.opacity=".1"

  }
  const close = () =>{
     addForm.current.style.display="none"
    opacity.current.style.opacity="1"
    opacity2.current.style.opacity="1"

  }



  const addForm = useRef()
  const opacity = useRef()
  const opacity2 = useRef()
  return (
    <header >
      <div className="left" ref={opacity}>
        <div className="img"><LuListTodo /></div>
        <h1>To do list like a Remider</h1>
      </div>
      <button className='head-btn' id='headBtn' onClick={() => change()} ref={opacity2}>Add list</button>

       <form className='addForm' id='addForm' ref={addForm} onSubmit={handleSubmit}>
        <div className="listinput">
            <label htmlFor="addItem" className='inputlable'>Add Item</label><br />
        <input
        autoFocus
        id='addItem'
        placeholder='Add List' 
        type="text"
        required
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
       
         />
        </div>
         <button
         className='add-btn'
         type='submit'
         aria-label='Add itme'
         >
            Add list
         </button>
         <IoMdClose 
         className='closeIcon'
         type='button'
         onClick={() => close()}
         />
    </form>
    
    </header>
    
  )
}

export default Header