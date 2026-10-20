import { useCallback, useEffect, useMemo, useState } from 'react';
import { applicationService } from '../../services/applicationService';
import { candidateService } from '../../services/candidateService';
import { jobService } from '../../services/jobService';
import { useDataRefresh } from '../../hooks/useDataRefresh';

const stages = ['NEW', 'SCREENED', 'INTERVIEW', 'FEEDBACK', 'OFFER', 'JOINED'];
const candidateBlank = { fullName: '', position: '', email: '', phone: '', resumeText: '', status: 'NEW', isDemo: true };
const jobBlank = { title: '', department: '', requirements: '', status: 'OPEN', isDemo: true };

export default function Pipeline() {
  const [applications, setApplications] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [candidateSearch, setCandidateSearch] = useState('');
  const [jobSearch, setJobSearch] = useState('');
  const [candidateId, setCandidateId] = useState('');
  const [jobId, setJobId] = useState('');
  const [candidateForm, setCandidateForm] = useState(candidateBlank);
  const [jobForm, setJobForm] = useState(jobBlank);
  const [showCandidateForm, setShowCandidateForm] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [workingId, setWorkingId] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [applicationResult, candidateResult, jobResult] = await Promise.all([
        applicationService.list(), candidateService.list(), jobService.list(),
      ]);
      setApplications(applicationResult.data);
      setCandidates(candidateResult.data);
      setJobs(jobResult.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Pipeline data could not be loaded.');
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => { load(); }, [load]);
  useDataRefresh(load);

  const candidateMatches = useMemo(() => {
    const query = candidateSearch.trim().toLowerCase();
    if (!query) return [];
    return candidates.filter((candidate) => `${candidate.fullName} ${candidate.email}`.toLowerCase().includes(query)).slice(0, 6);
  }, [candidates, candidateSearch]);
  const jobMatches = useMemo(() => {
    const query = jobSearch.trim().toLowerCase();
    if (!query) return [];
    return jobs.filter((job) => job.status === 'OPEN' && `${job.title} ${job.department}`.toLowerCase().includes(query)).slice(0, 6);
  }, [jobs, jobSearch]);

  const createCandidate = async (event) => {
    event.preventDefault();
    if (![candidateForm.fullName, candidateForm.position, candidateForm.email, candidateForm.phone].every((value) => value.trim()) || !/^\S+@\S+\.\S+$/.test(candidateForm.email)) {
      setError('Enter a candidate name, position, valid email, and phone before saving.');
      return;
    }
    setBusy(true); setError('');
    try {
      const response = await candidateService.create(candidateForm);
      const candidate = response.data;
      setCandidateId(candidate._id);
      setCandidateSearch(`${candidate.fullName} · ${candidate.email}`);
      setCandidateForm(candidateBlank);
      setShowCandidateForm(false);
      setNotice('Candidate saved. It is now selected for this application.');
      await load();
    } catch (err) {
      setError(err.response?.data?.message || 'Candidate could not be saved.');
    } finally { setBusy(false); }
  };

  const createJob = async (event) => {
    event.preventDefault();
    if (!jobForm.title.trim() || !jobForm.department.trim()) {
      setError('Enter a job title and department before saving.');
      return;
    }
    setBusy(true); setError('');
    try {
      const response = await jobService.create({
        ...jobForm,
        requirements: jobForm.requirements.split(',').map((value) => value.trim()).filter(Boolean),
      });
      const job = response.data;
      setJobId(job._id);
      setJobSearch(`${job.title} · ${job.department}`);
      setJobForm(jobBlank);
      setShowJobForm(false);
      setNotice('Job saved. It is now selected for this application.');
      await load();
    } catch (err) {
      setError(err.response?.data?.message || 'Job could not be saved.');
    } finally { setBusy(false); }
  };

  const createApplication = async (event) => {
    event.preventDefault();
    setBusy(true); setError(''); setNotice('');
    try {
      const selectedCandidate = candidates.find((candidate) => candidate._id === candidateId);
      const selectedJob = jobs.find((job) => job._id === jobId);
      await applicationService.create({
        candidateId, jobId, note,
        isDemo: Boolean(selectedCandidate?.isDemo && selectedJob?.isDemo),
      });
      setCandidateSearch(''); setJobSearch(''); setCandidateId(''); setJobId(''); setNote('');
      setNotice('Application saved to MongoDB and added to the pipeline.');
      await load();
    } catch (err) {
      setError(err.response?.data?.message || 'Application could not be created.');
    } finally { setBusy(false); }
  };

  const advance = async (application) => {
    const next = stages[stages.indexOf(application.stage) + 1];
    if (!next) return;
    setWorkingId(application._id); setError(''); setNotice('');
    try {
      await applicationService.updateStage(application._id, next);
      setNotice(`Application advanced to ${next}.`);
      await load();
    } catch (err) { setError(err.response?.data?.message || 'Stage change failed.'); }
    finally { setWorkingId(''); }
  };

  const finish = async (application, outcome) => {
    setWorkingId(application._id); setError(''); setNotice('');
    try {
      await applicationService.updateOutcome(application._id, outcome);
      setNotice(`Application marked ${outcome.toLowerCase()}.`);
      await load();
    } catch (err) { setError(err.response?.data?.message || 'Outcome update failed.'); }
    finally { setWorkingId(''); }
  };

  const clearCandidate = () => { setCandidateId(''); setCandidateSearch(''); };
  const clearJob = () => { setJobId(''); setJobSearch(''); };

  return <section className="mx-auto w-full max-w-[1600px] space-y-6 p-6 md:p-8">
    <header className="flex flex-wrap items-end justify-between gap-3"><div><h1 className="text-3xl font-semibold">Application pipeline</h1><p className="mt-1 text-sm text-on-surface-variant">Search existing records or create them inline. Applications and notes are saved to MongoDB.</p></div><button className="rounded border border-outline-variant px-4 py-2" onClick={load} type="button">Refresh</button></header>
    {error && <p role="alert" className="rounded-md border border-error p-3 text-error">{error} <button className="underline" onClick={load} type="button">Retry</button></p>}
    {notice && <p role="status" className="rounded-md bg-surface-container p-3">{notice}</p>}

    <form className="space-y-4 rounded-md border border-outline-variant bg-surface-container-lowest p-4" onSubmit={createApplication}>
      <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-[1fr_1fr_auto]">
        <div className="relative space-y-1">
          <label className="text-sm font-medium" htmlFor="candidate-search">Candidate</label>
          <div className="flex gap-2"><input id="candidate-search" role="combobox" aria-autocomplete="list" aria-expanded={Boolean(candidateSearch && !candidateId)} autoComplete="off" required={!candidateId} placeholder="Type a name or email to search" className="min-w-0 flex-1 rounded border border-outline-variant bg-transparent px-3 py-2" value={candidateSearch} onChange={(event) => { setCandidateSearch(event.target.value); setCandidateId(''); }} /><button aria-label="Clear candidate" className="rounded border border-outline-variant px-3" onClick={clearCandidate} type="button">Clear</button></div>
          {candidateSearch && !candidateId && <div role="listbox" className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded border border-outline-variant bg-surface-container-lowest shadow-lg">{candidateMatches.map((candidate) => <button role="option" aria-selected="false" key={candidate._id} className="block w-full px-3 py-2 text-left text-sm hover:bg-surface-container-low" onClick={() => { setCandidateId(candidate._id); setCandidateSearch(`${candidate.fullName} · ${candidate.email}`); }} type="button">{candidate.fullName} <span className="text-on-surface-variant">· {candidate.email}</span></button>)}{candidateMatches.length === 0 && <p className="px-3 py-2 text-sm text-on-surface-variant">No matching candidate.</p>}</div>}
          <button className="text-sm text-primary underline" onClick={() => { setShowCandidateForm(!showCandidateForm); setCandidateForm({ ...candidateBlank, fullName: candidateSearch.trim() }); }} type="button">{showCandidateForm ? 'Cancel new candidate' : '+ Create candidate'}</button>
          {candidateId && <p className="text-xs text-green-700">Candidate selected</p>}
        </div>
        <div className="relative space-y-1">
          <label className="text-sm font-medium" htmlFor="job-search">Open job</label>
          <div className="flex gap-2"><input id="job-search" role="combobox" aria-autocomplete="list" aria-expanded={Boolean(jobSearch && !jobId)} autoComplete="off" required={!jobId} placeholder="Type a job title or department" className="min-w-0 flex-1 rounded border border-outline-variant bg-transparent px-3 py-2" value={jobSearch} onChange={(event) => { setJobSearch(event.target.value); setJobId(''); }} /><button aria-label="Clear job" className="rounded border border-outline-variant px-3" onClick={clearJob} type="button">Clear</button></div>
          {jobSearch && !jobId && <div role="listbox" className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded border border-outline-variant bg-surface-container-lowest shadow-lg">{jobMatches.map((job) => <button role="option" aria-selected="false" key={job._id} className="block w-full px-3 py-2 text-left text-sm hover:bg-surface-container-low" onClick={() => { setJobId(job._id); setJobSearch(`${job.title} · ${job.department}`); }} type="button">{job.title} <span className="text-on-surface-variant">· {job.department}</span></button>)}{jobMatches.length === 0 && <p className="px-3 py-2 text-sm text-on-surface-variant">No matching open job.</p>}</div>}
          <button className="text-sm text-primary underline" onClick={() => { setShowJobForm(!showJobForm); setJobForm({ ...jobBlank, title: jobSearch.trim() }); }} type="button">{showJobForm ? 'Cancel new job' : '+ Create job'}</button>
          {jobId && <p className="text-xs text-green-700">Job selected</p>}
        </div>
        <button disabled={busy || !candidateId || !jobId} className="self-end rounded bg-primary px-4 py-2 text-on-primary disabled:opacity-50" type="submit">{busy ? 'Saving…' : 'Add application'}</button>
      </div>

      {showCandidateForm && <fieldset className="grid grid-cols-1 gap-3 rounded border border-outline-variant p-3 md:grid-cols-2"><legend className="px-1 text-sm font-medium">New candidate contact fields</legend><input required placeholder="Full name" className="rounded border border-outline-variant bg-transparent px-3 py-2" value={candidateForm.fullName} onChange={(e) => setCandidateForm({ ...candidateForm, fullName: e.target.value })} /><input required placeholder="Position" className="rounded border border-outline-variant bg-transparent px-3 py-2" value={candidateForm.position} onChange={(e) => setCandidateForm({ ...candidateForm, position: e.target.value })} /><input required type="email" placeholder="Email" className="rounded border border-outline-variant bg-transparent px-3 py-2" value={candidateForm.email} onChange={(e) => setCandidateForm({ ...candidateForm, email: e.target.value })} /><input required type="tel" placeholder="Phone" className="rounded border border-outline-variant bg-transparent px-3 py-2" value={candidateForm.phone} onChange={(e) => setCandidateForm({ ...candidateForm, phone: e.target.value })} /><textarea maxLength="10000" placeholder="Resume text or notes" className="rounded border border-outline-variant bg-transparent px-3 py-2 md:col-span-2" value={candidateForm.resumeText} onChange={(e) => setCandidateForm({ ...candidateForm, resumeText: e.target.value })} /><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={candidateForm.isDemo} onChange={(e) => setCandidateForm({ ...candidateForm, isDemo: e.target.checked })} />Mark as fictional demo data</label><button disabled={busy} className="w-fit rounded border border-outline-variant px-4 py-2 disabled:opacity-50" onClick={createCandidate} type="button">{busy ? 'Saving…' : 'Save and select candidate'}</button></fieldset>}

      {showJobForm && <fieldset className="grid grid-cols-1 gap-3 rounded border border-outline-variant p-3 md:grid-cols-2"><legend className="px-1 text-sm font-medium">New job requisition fields</legend><input required placeholder="Job title" className="rounded border border-outline-variant bg-transparent px-3 py-2" value={jobForm.title} onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })} /><input required placeholder="Department" className="rounded border border-outline-variant bg-transparent px-3 py-2" value={jobForm.department} onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })} /><input placeholder="Requirements, comma separated" className="rounded border border-outline-variant bg-transparent px-3 py-2 md:col-span-2" value={jobForm.requirements} onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })} /><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={jobForm.isDemo} onChange={(e) => setJobForm({ ...jobForm, isDemo: e.target.checked })} />Mark as fictional demo data</label><button disabled={busy} className="w-fit rounded border border-outline-variant px-4 py-2 disabled:opacity-50" onClick={createJob} type="button">{busy ? 'Saving…' : 'Save and select job'}</button></fieldset>}

      <div className="max-w-3xl"><label className="mb-1 block text-sm font-medium" htmlFor="application-note">Application note</label><textarea id="application-note" maxLength="500" rows="2" placeholder="Optional note saved to the initial stage history" className="w-full resize-y rounded border border-outline-variant bg-transparent px-3 py-2" value={note} onChange={(event) => setNote(event.target.value)} /><p className="mt-1 text-right text-xs text-on-surface-variant">{note.length}/500</p></div>
    </form>

    {loading ? <p role="status" className="animate-pulse rounded bg-surface-container p-5">Loading pipeline…</p> : applications.length === 0 ? <div className="rounded-md border border-outline-variant p-8 text-center text-on-surface-variant">No applications yet. Add an application above to start tracking candidates against jobs.</div> : <div className="space-y-3">{applications.map((application) => { const isWorking = workingId === application._id; return <article className="rounded-md border border-outline-variant bg-surface-container-lowest p-4" key={application._id}><div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="font-semibold">{application.candidateId?.fullName || 'Candidate unavailable'}</h2><p className="text-sm text-on-surface-variant">{application.jobId?.title || 'Job unavailable'} · {application.jobId?.department || ''}</p><p className="mt-2 text-xs text-on-surface-variant">{application.candidateId?.email} {application.isDemo ? '· Demo record' : ''}</p></div><div className="flex flex-wrap items-center gap-2"><span className="rounded bg-surface-container px-3 py-1 text-sm">{application.stage}</span><span className="rounded border border-outline-variant px-3 py-1 text-sm">{application.outcome}</span>{application.outcome === 'ACTIVE' && application.stage !== 'JOINED' && <button disabled={isWorking} className="rounded bg-primary px-3 py-1.5 text-sm text-on-primary disabled:opacity-50" onClick={() => advance(application)} type="button">{isWorking ? 'Saving…' : 'Advance'}</button>}{application.outcome === 'ACTIVE' && <><button disabled={isWorking} className="rounded border border-outline-variant px-3 py-1.5 text-sm disabled:opacity-50" onClick={() => finish(application, 'REJECTED')} type="button">Reject</button><button disabled={isWorking} className="rounded border border-outline-variant px-3 py-1.5 text-sm disabled:opacity-50" onClick={() => finish(application, 'WITHDRAWN')} type="button">Withdraw</button></>}</div></div><details className="mt-3"><summary className="cursor-pointer text-sm text-primary">Stage history ({application.stageHistory?.length || 0})</summary><ol className="mt-2 space-y-1 text-sm text-on-surface-variant">{(application.stageHistory || []).map((entry, index) => <li key={`${entry.stage}-${index}`}>{entry.stage} · {new Date(entry.changedAt).toLocaleString()}{entry.note ? ` · ${entry.note}` : ''}</li>)}</ol></details></article>; })}</div>}
  </section>;
}
