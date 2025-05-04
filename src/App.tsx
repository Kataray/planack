import './App.css'
import Header from './components/dashboard/Header.tsx'
import TasksPage from './pages/tasks/TasksPage.tsx'
import WorkshopBoard from "@/pages/workshops/workshopPage.tsx";
import PhotoBoard from "@/pages/photos/photoPage.tsx";

function App() {

  return (
    <>
      <div>
        <PhotoBoard />
      </div>
    </>
  )
}

export default App
