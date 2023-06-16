import { useState } from 'react'

import './App.css'
import {Nav} from "./components/Nav/Nav.tsx";
import {KanbanBoard} from "./components/Kanban/KanbanBoard/KanbanBoard.tsx";

function App() {

  return (
    <>
      <div className="App">
        <div className="nav-section">
          <Nav />
        </div>
        <div className="kanban-section">
          <KanbanBoard />
        </div>
      </div>
    </>
  )
}

export default App
