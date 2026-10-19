import { useEffect, useState } from 'react';
import { dashboardService } from '../../services/dashboardService';

export default function Header() {
  const [database, setDatabase] = useState('Checking database…');
  useEffect(() => { let mounted = true; dashboardService.health().then((result) => { if (mounted) setDatabase(result.database?.ready ? 'MongoDB connected' : 'MongoDB unavailable'); }).catch(() => { if (mounted) setDatabase('Backend unavailable'); }); return () => { mounted = false; }; }, []);
  return <header className="fixed left-64 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-6 max-md:left-0 max-md:h-24 max-md:flex-col max-md:items-stretch max-md:justify-center max-md:gap-1 max-md:px-4"><div className="flex items-center justify-between"><span className="text-sm text-on-surface-variant">Core ATS</span><span className="flex items-center gap-2 text-xs md:text-sm" role="status"><span className={`h-2 w-2 rounded-full ${database === 'MongoDB connected' ? 'bg-green-600' : 'bg-error'}`} />{database}</span></div><nav aria-label="Primary navigation" className="hidden max-md:flex gap-4 overflow-x-auto whitespace-nowrap text-xs"><a href="/dashboard">Dashboard</a><a href="/candidates">Candidates</a><a href="/jobs">Jobs</a><a href="/pipeline">Pipeline</a></nav></header>;
}
