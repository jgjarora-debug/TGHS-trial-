import React from 'react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/dashboard', active: true },
    { name: 'Candidates', icon: 'person_search', path: '/candidates' },
    { name: 'Jobs', icon: 'work_outline', path: '/jobs' },
    { name: 'Pipeline', icon: 'view_kanban', path: '/pipeline' },
    { name: 'Interviews', icon: 'calendar_today', path: '/interviews' },
    { name: 'Reports', icon: 'monitoring', path: '/reports' },
    { name: 'Settings', icon: 'settings', path: '/settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-surface-container-lowest flex flex-col justify-between z-50 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col flex-1 min-h-0">
        <div className="h-16 px-space-lg flex items-center justify-between bg-surface-container-lowest">
          <div className="flex items-center gap-space-sm min-w-0">
            <img 
              alt="Trilokpati Global HR Solutions" 
              className="h-9 w-auto object-contain" 
              src="https://lh3.googleusercontent.com/aida/AEtjO1U2iHMihRblrk2lS9CHz8BDeJjKXtLfXnWuvuLK1oHiltrw7ilsMIi-F53z2ww-QsXckmfHK-90f3KBwvXA7AqhoX0B2soHotm3fURaRdu5PClBp-dziRJ6llFJ9x_TleEj7cku_rXCutjRVh_Buv9z9F5GBYNPauDupUt4FpDME2L-ABkHosVf_D3SmYCm47mCq6zBEPW5HgYOO98hLMrQWnf3UWSJZtHU6fTGcC37J6Yh5bIK972uxhCc" 
            />
          </div>
          <span className="px-space-xs py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
            v1.0
          </span>
        </div>
        
        <div className="px-space-md py-space-sm">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className={`flex items-center gap-space-md px-space-md py-space-sm rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm' 
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span className="font-label-lg text-label-lg">{item.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
      
      <div className="p-space-md bg-surface-container-low flex flex-col gap-space-sm">
        <div className="bg-surface-container-lowest p-space-sm rounded-lg">
          <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant mb-1">
            <span>Storage Quota</span>
            <span className="font-code-sm text-code-sm text-on-surface">64%</span>
          </div>
          <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: '64%' }}></div>
          </div>
          <div className="flex items-center justify-between font-label-sm text-label-sm text-outline mt-1">
            <span>12.8 GB / 20 GB</span>
            <span className="flex items-center gap-1 text-tertiary">
              <span className="material-symbols-outlined text-[14px]">cloud_done</span>Synced
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-1">
          <button className="flex items-center gap-1.5 text-on-surface-variant hover:text-on-surface font-label-md text-label-md" type="button">
            <span className="material-symbols-outlined text-[16px]">help_outline</span>
            <span>Support & Docs</span>
          </button>
          <span className="font-code-sm text-code-sm text-outline">SLA: 99.9%</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
