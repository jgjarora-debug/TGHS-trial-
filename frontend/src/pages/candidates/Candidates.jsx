import { useCallback, useEffect, useMemo, useState } from 'react';
import { applicationService } from '../../services/applicationService';
import { candidateService } from '../../services/candidateService';

const emptyForm = { fullName: '', position: '', email: '', phone: '', resumeText: '' };

export default function Candidates() {
  const [items, setItems] = useState([]);
  const [applications, setApplications] = useState([]);
  const [query, setQuery] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [detail, setDetail] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const load = useCallback(async () => {
    setError('');
    try {
      const [candidateResult, applicationResult] = await Promise.all([
        candidateService.list(), applicationService.list(),
      ]);
      setItems(candidateResult.data);
      setApplications(applicationResult.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Candidate data could not be loaded.');
    }
  }, []);
  useEffect(() => { load(); }, [load]);

  const visible = useMemo(() => items.filter((item) =>
    `${item.fullName} ${item.email} ${item.position}`.toLowerCase().includes(query.toLowerCase())
  ), [items, query]);
  const applicationsFor = (candidateId) => applications.filter((application) =>
    application.candidateId?._id === candidateId
  );
  const reset = () => { setEditing(null); setForm(emptyForm); };

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true); setError(''); setNotice('');
    try {
      if (editing) await candidateService.update(editing, form);
      else await candidateService.create(form);
      reset();
      setNotice(editing ? 'Candidate updated.' : 'Candidate created.');
      await load();
    } catch (err) {
      setError(err.response?.data?.message || 'Candidate could not be saved.');
    } finally { setBusy(false); }
  };

  const edit = (candidate) => {
    setEditing(candidate._id);
    setForm({
      fullName: candidate.fullName,
      position: candidate.position,
      email: candidate.email,
      phone: candidate.phone,
      resumeText: candidate.resumeText || '',
    });
    setNotice('');
  };

  const openDetail = async (candidate) => {
    setError('');
    try {
      const response = await candidateService.get(candidate._id);
      setDetail({ ...response.data, applications: applicationsFor(candidate._id) });
    } catch (err) {
      setError(err.response?.data?.message || 'Candidate details could not be loaded.');
    }
  };

  const remove = async (candidate) => {
    if (!window.confirm(`Delete ${candidate.fullName}?`)) return;
    setError(''); setNotice('');
    try {
      await candidateService.remove(candidate._id);
      setNotice('Candidate deleted.');
      await load();
    } catch (err) {
      setError(err.response?.data?.message || 'Candidate could not be deleted.');
    }
  };

  return <section className="mx-auto w-full max-w-[1600px] space-y-6 p-6 md:p-8">
    <header>
      <h1 className="text-3xl font-semibold">Candidates</h1>
      <p className="mt-1 text-sm text-on-surface-variant">Candidate contact records. Application stages are managed in Pipeline.</p>
    </header>
    {error && <p role="alert" className="rounded-md border border-error p-3 text-error">{error} <button className="underline" onClick={load} type="button">Retry</button></p>}
    {notice && <p role="status" className="rounded-md bg-surface-container p-3">{notice}</p>}

    <form className="grid grid-cols-1 gap-3 rounded-md border border-outline-variant bg-surface-container-lowest p-4 md:grid-cols-2 xl:grid-cols-5" onSubmit={submit}>
      <h2 className="text-lg font-semibold md:col-span-2 xl:col-span-5">{editing ? 'Edit candidate' : 'Add candidate'}</h2>
      <input required maxLength="120" placeholder="Full name" className="rounded border border-outline-variant bg-transparent px-3 py-2" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} />
      <input required maxLength="120" placeholder="Position" className="rounded border border-outline-variant bg-transparent px-3 py-2" value={form.position} onChange={(event) => setForm({ ...form, position: event.target.value })} />
      <input required type="email" placeholder="Email" className="rounded border border-outline-variant bg-transparent px-3 py-2" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
      <input required type="tel" placeholder="Phone" className="rounded border border-outline-variant bg-transparent px-3 py-2" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
      <textarea maxLength="10000" placeholder="Resume text or notes" className="rounded border border-outline-variant bg-transparent px-3 py-2 md:col-span-2 xl:col-span-4" value={form.resumeText} onChange={(event) => setForm({ ...form, resumeText: event.target.value })} />
      <div className="flex gap-2"><button disabled={busy} className="rounded bg-primary px-4 py-2 text-on-primary disabled:opacity-50" type="submit">{busy ? 'Saving…' : editing ? 'Save changes' : 'Create candidate'}</button>{editing && <button className="rounded border border-outline-variant px-4 py-2" onClick={reset} type="button">Cancel</button>}</div>
    </form>

    <div className="flex flex-wrap gap-3">
      <input aria-label="Search candidates" placeholder="Search name, email, or position" className="min-w-64 flex-1 rounded border border-outline-variant bg-surface-container-lowest px-3 py-2" value={query} onChange={(event) => setQuery(event.target.value)} />
      <button className="rounded border border-outline-variant px-4 py-2" onClick={load} type="button">Refresh</button>
    </div>

    <div className="overflow-x-auto rounded-md border border-outline-variant bg-surface-container-lowest">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="bg-surface-container-low"><tr>{['Candidate', 'Position', 'Contact', 'Applications', 'Actions'].map((label) => <th className="px-4 py-3 font-medium" key={label}>{label}</th>)}</tr></thead>
        <tbody className="divide-y divide-outline-variant">
          {visible.map((candidate) => {
            const linkedApplications = applicationsFor(candidate._id);
            return <tr key={candidate._id}>
              <td className="px-4 py-3 font-medium"><button className="text-primary underline" onClick={() => openDetail(candidate)} type="button">{candidate.fullName}</button>{candidate.isDemo && <span className="ml-2 text-xs text-on-surface-variant">Demo</span>}</td>
              <td className="px-4 py-3">{candidate.position}</td>
              <td className="px-4 py-3">{candidate.email}<span className="block text-xs text-on-surface-variant">{candidate.phone}</span></td>
              <td className="px-4 py-3">{linkedApplications.length ? <ul className="space-y-1">{linkedApplications.map((application) => <li key={application._id}>{application.jobId?.title || 'Job'}: <span className="font-medium">{application.stage}</span> <span className="text-xs text-on-surface-variant">({application.outcome})</span></li>)}</ul> : <span className="text-on-surface-variant">No applications</span>}</td>
              <td className="space-x-3 px-4 py-3"><button className="underline" onClick={() => edit(candidate)} type="button">Edit</button><button className="text-error underline" onClick={() => remove(candidate)} type="button">Delete</button></td>
            </tr>;
          })}
          {visible.length === 0 && <tr><td className="px-4 py-8 text-center text-on-surface-variant" colSpan="5">{items.length ? 'No candidates match this search.' : 'No candidates in the database yet.'}</td></tr>}
        </tbody>
      </table>
    </div>

    {detail && <aside aria-label="Candidate details" className="fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto border-l border-outline-variant bg-surface-container-lowest p-6 shadow-xl">
      <div className="flex items-start justify-between"><div><h2 className="text-xl font-semibold">{detail.fullName}</h2><p className="text-sm text-on-surface-variant">{detail.position}</p></div><button aria-label="Close candidate details" className="rounded border border-outline-variant px-3 py-1" onClick={() => setDetail(null)} type="button">Close</button></div>
      <dl className="mt-6 space-y-4 text-sm"><div><dt className="text-on-surface-variant">Email</dt><dd>{detail.email}</dd></div><div><dt className="text-on-surface-variant">Phone</dt><dd>{detail.phone}</dd></div><div><dt className="text-on-surface-variant">Created</dt><dd>{detail.createdAt ? new Date(detail.createdAt).toLocaleString() : '—'}</dd></div></dl>
      <section className="mt-6"><h3 className="font-medium">Applications</h3>{detail.applications.length ? <ul className="mt-2 space-y-2">{detail.applications.map((application) => <li className="rounded bg-surface-container-low p-3 text-sm" key={application._id}>{application.jobId?.title || 'Job'} · {application.stage} · {application.outcome}</li>)}</ul> : <p className="mt-2 text-sm text-on-surface-variant">No applications yet.</p>}</section>
      {detail.resumeText && <section className="mt-6"><h3 className="font-medium">Resume text / notes</h3><p className="mt-2 whitespace-pre-wrap text-sm text-on-surface-variant">{detail.resumeText}</p></section>}
    </aside>}
  </section>;
}
