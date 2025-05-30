import { useRef } from "react";
import Content from "./Content";
import Header from "./Header";
import { useState } from 'react';

function App() {

  const [items, setItems] = useState(
    [
      { id: 1,
         checked: false,
          item: "i did it",
         },
 
      { id: 2, 
        checked: false, 
        item: "Resume task complition" 
      },
 
      { id: 3,
         checked: false,
          item: "Make queck a prosses " 
        }
    ]
  );

  const [newItem, setNewItem] = useState('')

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id, checked: false, item }
    const listItems = [...items, addNewItem]
    setItems(listItems)
    localStorage.setItem("todo_list", JSON.stringify(listItems))
  }





  const handleSubmit = (e) => {
    e.preventDefault()
    setNewItem(e.target.value)
    console.log('submitted')
    addItem(newItem)
    setNewItem('')
  }

  // const handleCheck = (id) => {
  //   const listItems = items.map((item) =>item.id===id ? {...item,checked:!item.checked} : item)
  //   setItems(listItems)
  // }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id)
    setItems(listItems)
    localStorage.setItem("todo_list", JSON.stringify(listItems))
  }

  const opacity = useRef()

  return (
    <div className="App" ref={opacity}>
      <Header
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <Content
        items={items}
        setItems={setItems}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
