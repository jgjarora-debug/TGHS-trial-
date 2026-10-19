const navItems = [
  { name: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
  { name: 'Candidates', icon: 'person_search', path: '/candidates' },
  { name: 'Jobs', icon: 'work_outline', path: '/jobs' },
  { name: 'Pipeline', icon: 'view_kanban', path: '/pipeline' },
];

export default function Sidebar() {
  const current = window.location.pathname;
  return <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-outline-variant bg-surface-container-lowest max-md:hidden">
    <div className="flex h-16 items-center px-5"><span className="font-semibold">TGHS <span className="text-on-surface-variant">ATS</span></span></div>
    <nav className="flex flex-col gap-1 px-3 py-3">{navItems.map((item) => { const active = current === item.path || (current === '/' && item.path === '/dashboard'); return <a aria-current={active ? 'page' : undefined} key={item.path} href={item.path} className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm ${active ? 'bg-primary-container font-semibold text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-low'}`}><span className="material-symbols-outlined text-xl">{item.icon}</span>{item.name}</a>; })}</nav>
    <div className="mt-auto border-t border-outline-variant p-4 text-xs text-on-surface-variant">Local development prototype</div>
  </aside>;
}
