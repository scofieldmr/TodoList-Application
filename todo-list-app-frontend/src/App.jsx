import { useState } from 'react'
import './App.css'
import ListComp from './component/ListComp'
import {BrowserRouter,Route,Routes} from 'react-router-dom'

function App() {
 
  return (
    <>
     <BrowserRouter>
       <Routes>
          <Route path='/' element ={<ListComp/>}></Route>
       </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
