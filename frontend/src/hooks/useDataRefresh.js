import { useEffect } from 'react';

export function useDataRefresh(load) {
  useEffect(() => {
    let refreshTimer;
    const scheduleRefresh = () => {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => {
        if (document.visibilityState === 'visible') load();
      }, 50);
    };
    const onStorage = (event) => {
      if (event.key === 'ats:data-changed') scheduleRefresh();
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') scheduleRefresh();
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', scheduleRefresh);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', scheduleRefresh);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [load]);
}
