import Layout from './components/layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import Candidates from './pages/candidates/Candidates';
import Jobs from './pages/jobs/Jobs';
import Pipeline from './pages/pipeline/Pipeline';

const pages = { '/': Dashboard, '/dashboard': Dashboard, '/candidates': Candidates, '/jobs': Jobs, '/pipeline': Pipeline };
export default function App() {
  const Page = pages[window.location.pathname] || Dashboard;
  return <Layout><Page /></Layout>;
}
