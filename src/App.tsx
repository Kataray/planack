import './App.css'
import Header from './components/dashboard/Header.tsx'
import FinancePage from './pages/finance/FinancePage.tsx';
import CylinderApp from './pages/calendar/CalendarPage.tsx';
import TeamsPage from './pages/teams/Teams.tsx'
import ResourcePage from './pages/resources/Resources.tsx';
function App() {

  return (
    <>
      <div>
        <ResourcePage/>
      </div>
    </>
  )
}

export default App
