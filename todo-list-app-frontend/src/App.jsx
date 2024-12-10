import { useState } from 'react'
import './App.css'
import ListComp from './component/ListComp'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import TodoComp from './component/TodoComp'

function App() {
 
  return (
    <>
     <BrowserRouter>
       <Routes>
          {/* //Using card to show the Task */}
          <Route path='/' element ={<TodoComp/>}></Route>

           {/* //Using Table to show the Task */}
          <Route path='/todolist' element ={<ListComp/>}></Route>
       </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
