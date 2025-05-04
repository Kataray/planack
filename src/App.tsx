import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import routing components
import Header from './components/dashboard/Header.tsx';
import TasksPage from '@/pages/tasks/TasksPage.tsx';
import FinancePage from '@/pages/finance/FinancePage.tsx';
import PhotoPage from '@/pages/photos/photoPage.tsx';
import WorkshopPage from '@/pages/workshops/workshopPage.tsx';
import TeamsPage from '@/pages/teams/Teams.tsx';
import ResourcePage from '@/pages/resources/Resources.tsx';

import TimelinePage from '@/pages/timeline/Timeline.tsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="" element={<Header />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/finance" element={<FinancePage />} />
                <Route path="/timeline" element={<TimelinePage />} />
                <Route path="/photos" element={<PhotoPage />} />
                <Route path="/workshops" element={<WorkshopPage />} />
                <Route path="/team" element={<TeamsPage />} />
                <Route path="/resources" element={<ResourcePage />} />

            </Routes>
        </Router>
    );
}

export default App;
