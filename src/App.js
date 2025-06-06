import { useEffect } from "react";
import Content from "./Content";
import Header from "./Header";
import { useState } from 'react';
import { useCallback } from "react";


function App() {
     const [items, setItems] = useState(JSON.parse(localStorage.getItem('todo_list')) || []);
  

  useEffect (() =>{
    JSON.parse(localStorage.getItem('todo_list'))
  },[])

  

  let storedItems = [];
try {
  const parsed = JSON.parse(localStorage.getItem('todo_list'));
  storedItems = Array.isArray(parsed) ? parsed : [];
} catch (e) {
  storedItems = [];
}



  const [newItem, setNewItem] = useState('')
//   const opacity = useRef()

  const addItem = (item) => {
    const id = Array.isArray(items) && items.length ? items[items.length - 1].id + 1 : 1;

    const addNewItem = { id, checked: false, item }
    const listItems = [...items, addNewItem]
    // const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    // const addNewItem = { id,
    // checked: false,
    // item,
    // startTime: '',
    // endTime: '',
    // status: 'Waiting to start...',
    // timeLeft: null,
    // quote: randomQuote
   
  
  
//    const listItems = [...items, addNewItem]
    setItems(listItems)
    localStorage.setItem("todo_list", JSON.stringify(listItems))
  }

   const updateItem = useCallback((id, updatedProps) => {
  setItems(prevItems => 
    prevItems.map(item => item.id === id ? { ...item, ...updatedProps } : item)
  );
}, []);

// useEffect(() => {
//   const interval = setInterval(() => {
//     setItems(prevItems =>
//       prevItems.map(item => {
//         const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
//         return { ...item, quote: randomQuote };
//       })
//     );
//   }, 30000); // 1 minute

// useEffect(() => {
//   const storedItems = JSON.parse(localStorage.getItem('todo_list')) || [];
//   const sanitizedItems = storedItems.map(item => ({
//     ...item,
//     quote: item.quote || quotes[Math.floor(Math.random() * quotes.length)]
//   }));
//   setItems(sanitizedItems);
//     localStorage.setItem("todo_list", JSON.stringify(sanitizedItems));
// }, []);

// useEffect(() => {
//   const interval = setInterval(() => {
//     setItems(prevItems =>
//       prevItems.map(item => {
//         const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
//         return { ...item, quote: randomQuote };
//       })
//     );
//   }, 30000); // 1 minute

//   return () => clearInterval(interval); // Cleanup on unmount
// }, []);


//   return () => clearInterval(interval); // Cleanup on unmount
// }, []);



  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newItem.trim()) return;
  addItem(newItem);
  setNewItem('');
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
  
  

  

  return (
    <div className="App" >
      <Header
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <Content
        items={items}
        setItems={setItems}
        handleDelete={handleDelete}
        updateItem={updateItem}
        addItem ={addItem }
      />
    </div>
  );

}


export default App;
