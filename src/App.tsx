import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import routing components
import Header from './components/dashboard/Header.tsx';
import TasksPage from '@/pages/tasks/TasksPage.tsx';
import FinancePage from '@/pages/finance/FinancePage.tsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="" element={<Header />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/finance" element={<FinancePage />} />
            </Routes>
        </Router>
    );
}

export default App;
