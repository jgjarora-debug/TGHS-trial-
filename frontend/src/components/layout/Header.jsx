import React from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 left-[280px] right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl z-40 shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex items-center justify-between px-gutter-lg">
      <div className="flex items-center gap-space-lg flex-1 max-w-xl">
        <div className="inline-flex items-center gap-2 px-space-sm py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
          </span>
          <span className="font-label-sm text-label-sm tracking-wide">Live Production v1.0</span>
        </div>
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-outline">search</span>
          <input 
            className="w-full h-9 pl-9 pr-12 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary" 
            placeholder="Search candidates, jobs, requisitions..." 
            type="text" 
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-code-sm text-[10px]">
            <kbd>⌘K</kbd>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-space-md">
        <button className="h-9 px-space-md rounded-lg bg-primary text-on-primary font-label-lg text-label-lg flex items-center gap-1.5 hover:bg-primary-container transition-colors shadow-sm" type="button">
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Add Candidate</span>
        </button>
        <button aria-label="Notifications" className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" type="button">
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-error text-on-error rounded-full font-label-sm text-[10px] flex items-center justify-center font-bold">3</span>
        </button>
        <button aria-label="Toggle Theme" className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" type="button">
          <span className="material-symbols-outlined text-[20px]">light_mode</span>
        </button>
        <div className="h-6 w-px bg-surface-container-high mx-space-xs"></div>
        <div className="flex items-center gap-space-sm pl-space-xs">
          <div className="relative">
            <img 
              alt="Profile" 
              className="w-8 h-8 rounded-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUuFySytZAA6ujmIH_kTZ44aREmQ4C9cY6rSw5J3XMQyHzkbkOux1HGEcWNP8WDBomrGpKi3-9Dd_il2FjL90qwZi0_-GaphV8lIj2xbVUX8HDPUrWoNrI8-HO-v9rPPkL4VWsn3MBH0BgzzyTJUAuFDJVMTIuvoxy3gwrbJRUiN7rYmFBd-y4fkvYYMHg6o54uAbi-L0qkwYfX-IIitljFjyDzdxK-TfVkDHVZIcrrU4RCa-y8kgv9A" 
            />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-tertiary rounded-full ring-2 ring-surface-container-lowest"></span>
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="font-label-md text-label-md text-on-surface">Priya Sharma</span>
            <span className="font-label-sm text-label-sm text-outline">Senior Recruiter</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
