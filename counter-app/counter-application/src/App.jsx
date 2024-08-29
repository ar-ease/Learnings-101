import React, {useState} from 'react'

function App() {

 const[count,setCount]= useState(0);

    const increment = ()=>{
      setCount(count+1);
  
    }
    const decrement = ()=>{
      setCount(count - 1);
  }
  

  return (
    <>
    <div className='counter'>
      <h1>Counter Application</h1>
      <p>count : {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>decrement</button>

      

    </div>
    
    </>
  )
}

export default App
