import { useCallback, useEffect, useState } from 'react';
import { dashboardService } from '../../services/dashboardService';

const stages = ['NEW', 'SCREENED', 'INTERVIEW', 'FEEDBACK', 'OFFER', 'JOINED'];
const metrics = [['candidateCount', 'Candidates'], ['openJobCount', 'Open jobs'], ['applicationCount', 'Applications'], ['hiredCount', 'Hired']];

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { setSummary((await dashboardService.summary()).data); }
    catch (err) { setError(err.response?.data?.message || 'Dashboard data could not be loaded.'); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);
  return <section className="mx-auto w-full max-w-[1600px] space-y-6 p-6 md:p-8">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm text-on-surface-variant">TGHS Enterprise ATS</p><h1 className="text-3xl font-semibold">Hiring dashboard</h1><p className="mt-1 text-sm text-on-surface-variant">Live totals calculated from MongoDB records.</p></div><button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary" onClick={load} type="button">Refresh</button></div>
    {loading && <p role="status" className="animate-pulse rounded-md bg-surface-container p-5">Loading dashboard data…</p>}
    {error && <div role="alert" className="rounded-md border border-error p-4 text-error">{error} <button className="ml-3 underline" onClick={load} type="button">Retry</button></div>}
    {!loading && !error && summary && <><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{metrics.map(([key, label]) => <article className="rounded-md border border-outline-variant bg-surface-container-lowest p-5" key={key}><p className="text-sm text-on-surface-variant">{label}</p><p className="mt-2 text-3xl font-semibold">{summary[key]}</p></article>)}</div><section className="rounded-md border border-outline-variant bg-surface-container-lowest p-5"><div className="flex flex-wrap justify-between gap-2"><div><h2 className="text-lg font-semibold">Application pipeline</h2><p className="text-sm text-on-surface-variant">Applications by current stage</p></div><p className="text-sm text-on-surface-variant">{summary.activeApplicationCount} active</p></div>{summary.applicationCount === 0 ? <p className="mt-6 text-sm text-on-surface-variant">No applications yet. Add one from Pipeline.</p> : <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">{stages.map((stage) => <div className="rounded-md bg-surface-container-low p-4" key={stage}><p className="text-xs text-on-surface-variant">{stage}</p><p className="mt-2 text-2xl font-semibold">{summary.stageCounts[stage] ?? 0}</p></div>)}</div>}</section></>}
  </section>;
}
