import React from 'react';

const Dashboard = () => {
  return (
    <>
      
<div className="px-gutter-lg py-space-xl flex flex-col gap-space-xl max-w-[1600px] mx-auto w-full">

<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
<div className="flex flex-col gap-1 min-w-0">
<div className="flex items-center gap-space-sm">
<span className="font-code-sm text-code-sm text-primary uppercase tracking-widest bg-primary-fixed px-2 py-0.5 rounded">Console v1.0.4</span>
<span className="font-code-sm text-code-sm text-outline">Q4 Active Sprint</span>
</div>
<h1 className="font-display text-display text-on-surface tracking-tight">Welcome back, Priya</h1>
<p className="font-body-md text-body-md text-on-surface-variant">Enterprise ATS Overview &amp; Daily Hiring Velocity • Talent Intelligence Operations</p>
</div>
<div className="flex flex-wrap items-center gap-space-md">

<div className="inline-flex p-1 bg-surface-container rounded-lg">
<button className="px-3 py-1.5 rounded-lg bg-surface-container-lowest font-label-md text-label-md text-on-surface shadow-sm" type="button">Last 30 Days</button>
<button className="px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors" type="button">Q4 2024</button>
<button className="px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors" type="button">YTD</button>
</div>

<button className="h-9 px-space-md rounded-lg bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg shadow-sm flex items-center gap-2 transition-all" id="btnExportBrief" type="button">
<span className="material-symbols-outlined text-[18px] text-primary">download</span>
<span className="">Export Executive Brief</span>
</button>

<button className="h-9 px-space-md rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm flex items-center gap-2 transition-colors" id="btnOpenCandidateModal" type="button">
<span className="material-symbols-outlined text-[18px]">person_add</span>
<span className="">Add Candidate</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">

<div className="bg-surface-container-lowest rounded-xl p-space-lg flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
<div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md uppercase tracking-wider text-outline">Active Candidates</span>
<span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm">+8 today</span>
</div>
<div className="flex items-baseline gap-space-sm mt-1">
<span className="font-display text-display text-on-surface tracking-tight">28</span>
<span className="font-label-sm text-label-sm text-outline">/ 35 pipeline cap</span>
</div>
</div>
<div className="flex flex-col gap-2 mt-space-md pt-space-sm">
<div className="flex justify-between items-center font-label-sm text-label-sm">
<span className="text-on-surface-variant">Monthly Target (82%)</span>
<span className="font-code-sm text-code-sm text-primary">28 / 34</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
<div className="bg-primary h-full rounded-full transition-all duration-500" ></div>
</div>
<span className="font-body-sm text-body-sm text-outline truncate mt-1">14 in screening, 9 interviewing, 5 offer</span>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
<div className="absolute top-0 left-0 right-0 h-1 bg-secondary-container"></div>
<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md uppercase tracking-wider text-outline">Open Requisitions</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm">Avg 17d to fill</span>
</div>
<div className="flex items-baseline gap-space-sm mt-1">
<span className="font-display text-display text-on-surface tracking-tight">12</span>
<span className="font-label-sm text-label-sm text-tertiary font-semibold flex items-center">
<span className="material-symbols-outlined text-[14px]">arrow_upward</span>+2 this week
            </span>
</div>
</div>
<div className="flex flex-col gap-2 mt-space-md pt-space-sm">
<div className="flex items-center justify-between">
<span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">4 Urgent Engineering</span>
<span className="font-code-sm text-code-sm text-outline">8 Standard</span>
</div>
<div className="flex items-center gap-1.5 mt-1 font-body-sm text-body-sm text-outline">
<span className="material-symbols-outlined text-[16px] text-outline">schedule</span>
<span className="truncate">Next round SLA reset in 6 hours</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
<div className="absolute top-0 left-0 right-0 h-1 bg-tertiary"></div>
<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md uppercase tracking-wider text-outline">Placements (Oct)</span>
<span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">+50% vs target</span>
</div>
<div className="flex items-baseline justify-between mt-1">
<div className="flex items-baseline gap-2">
<span className="font-display text-display text-on-surface tracking-tight">3</span>
<span className="font-label-sm text-label-sm bg-surface-container px-2 py-0.5 rounded text-on-surface-variant">Target: 2/mo</span>
</div>

<svg className="w-16 h-8 text-tertiary" fill="none" viewBox="0 0 64 32">
<path d="M2 28L16 22L30 25L46 14L62 4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></path>
<path d="M2 28L16 22L30 25L46 14L62 4V32H2Z" fill="currentColor" fill-opacity="0.1"></path>
<circle cx="62" cy="4" fill="currentColor" r="3"></circle>
</svg>
</div>
</div>
<div className="flex flex-col gap-1 mt-space-md pt-space-sm">
<div className="flex items-center justify-between font-label-sm text-label-sm">
<span className="text-on-surface-variant">CTC Placed Velocity</span>
<span className="font-code-sm text-code-sm text-on-surface font-semibold">₹68L total CTC</span>
</div>
<span className="font-body-sm text-body-sm text-outline truncate">Senior Staff &amp; Arch roles fulfilled</span>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
<div className="absolute top-0 left-0 right-0 h-1 bg-tertiary-container"></div>
<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md uppercase tracking-wider text-outline">Avg Quality Index</span>
<span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">+8 vs baseline</span>
</div>
<div className="flex items-baseline gap-space-sm mt-1">
<span className="font-display text-display text-on-surface tracking-tight">92</span>
<span className="font-headline-sm text-headline-sm text-outline">/100</span>
<span className="ml-auto px-2 py-0.5 rounded-full bg-tertiary-fixed-dim text-on-tertiary-fixed font-label-sm text-label-sm uppercase">Tier 1</span>
</div>
</div>
<div className="flex flex-col gap-1.5 mt-space-md pt-space-sm">

<div className="grid grid-cols-5 gap-1 w-full">
<div className="h-1.5 rounded bg-tertiary"></div>
<div className="h-1.5 rounded bg-tertiary"></div>
<div className="h-1.5 rounded bg-tertiary"></div>
<div className="h-1.5 rounded bg-tertiary"></div>
<div className="h-1.5 rounded bg-surface-container"></div>
</div>
<span className="font-body-sm text-body-sm text-outline truncate">Based on 45-factor AI screening model</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">

<div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col justify-between">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-lg">
<div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">bar_chart</span>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Placement Trajectory vs Target</h2>
</div>
<p className="font-body-sm text-body-sm text-outline mt-0.5">Monthly actual closures against assigned enterprise requisitions</p>
</div>
<div className="flex items-center gap-space-md">
<div className="flex items-center gap-1.5 font-label-sm text-label-sm text-outline">
<span className="w-2.5 h-2.5 rounded-sm bg-primary"></span>
<span className="">Placed</span>
</div>
<div className="flex items-center gap-1.5 font-label-sm text-label-sm text-outline">
<span className="w-2.5 h-2.5 rounded-sm bg-surface-variant"></span>
<span className="">Target (2)</span>
</div>
</div>
</div>

<div className="w-full h-56 pt-2 flex flex-col justify-end">
<div className="grid grid-cols-5 gap-4 items-end h-44 px-2">

<div className="flex flex-col items-center gap-2 h-full justify-end group">
<span className="font-code-sm text-code-sm text-outline opacity-0 group-hover:opacity-100 transition-opacity">1 / 2</span>
<div className="w-full max-w-[48px] flex items-end justify-center gap-1.5 h-full">
<div className="w-4 bg-primary rounded-t transition-all hover:bg-primary-container" ></div>
<div className="w-4 bg-surface-variant rounded-t" ></div>
</div>
<span className="font-label-md text-label-md text-on-surface-variant">Jul</span>
</div>

<div className="flex flex-col items-center gap-2 h-full justify-end group">
<span className="font-code-sm text-code-sm text-outline opacity-0 group-hover:opacity-100 transition-opacity">2 / 2</span>
<div className="w-full max-w-[48px] flex items-end justify-center gap-1.5 h-full">
<div className="w-4 bg-primary rounded-t transition-all hover:bg-primary-container" ></div>
<div className="w-4 bg-surface-variant rounded-t" ></div>
</div>
<span className="font-label-md text-label-md text-on-surface-variant">Aug</span>
</div>

<div className="flex flex-col items-center gap-2 h-full justify-end group">
<span className="font-code-sm text-code-sm text-outline opacity-0 group-hover:opacity-100 transition-opacity">2 / 2</span>
<div className="w-full max-w-[48px] flex items-end justify-center gap-1.5 h-full">
<div className="w-4 bg-primary rounded-t transition-all hover:bg-primary-container" ></div>
<div className="w-4 bg-surface-variant rounded-t" ></div>
</div>
<span className="font-label-md text-label-md text-on-surface-variant">Sep</span>
</div>

<div className="flex flex-col items-center gap-2 h-full justify-end group">
<span className="font-code-sm text-code-sm text-tertiary font-bold opacity-100">3 / 2 ★</span>
<div className="w-full max-w-[48px] flex items-end justify-center gap-1.5 h-full">
<div className="w-4 bg-tertiary-container rounded-t transition-all hover:opacity-90" ></div>
<div className="w-4 bg-surface-variant rounded-t" ></div>
</div>
<span className="font-label-md text-label-md text-primary font-bold">Oct</span>
</div>

<div className="flex flex-col items-center gap-2 h-full justify-end group">
<span className="font-code-sm text-code-sm text-outline opacity-0 group-hover:opacity-100 transition-opacity">P: 2</span>
<div className="w-full max-w-[48px] flex items-end justify-center gap-1.5 h-full">
<div className="w-4 bg-primary-fixed-dim rounded-t" ></div>
<div className="w-4 bg-surface-variant rounded-t" ></div>
</div>
<span className="font-label-md text-label-md text-on-surface-variant">Nov</span>
</div>
</div>
</div>

<div className="mt-space-lg pt-space-md bg-surface-container-low p-space-md rounded-lg flex flex-col gap-2">
<div className="flex items-center justify-between font-label-md text-label-md text-on-surface">
<span className="">Portfolio Allocation by Domain</span>
<span className="font-code-sm text-code-sm text-outline">100% Normalized</span>
</div>
<div className="w-full h-3 rounded-full flex overflow-hidden">
<div className="bg-primary h-full"  title="Engineering 54%"></div>
<div className="bg-secondary-container h-full"  title="Product 26%"></div>
<div className="bg-tertiary-fixed-dim h-full"  title="Sales 20%"></div>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm pt-1">
<span className="flex items-center gap-1.5 text-on-surface">
<span className="w-2 h-2 rounded-full bg-primary"></span> Engineering (54%)
            </span>
<span className="flex items-center gap-1.5 text-on-surface">
<span className="w-2 h-2 rounded-full bg-secondary-container"></span> Product (26%)
            </span>
<span className="flex items-center gap-1.5 text-on-surface">
<span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span> Sales (20%)
            </span>
</div>
</div>
</div>

<div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary text-[20px]">filter_alt</span>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Pipeline Conversion Funnel</h2>
</div>
<span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-code-sm text-code-sm">SLA: 4.2d/stage</span>
</div>
<p className="font-body-sm text-body-sm text-outline mt-0.5">Stage pass-through rate from application to induction</p>
</div>

<div className="flex flex-col gap-2.5 my-space-md">

<div className="flex items-center justify-between bg-surface-container-low p-2 rounded-lg">
<div className="flex items-center gap-2 min-w-0">
<span className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center font-code-sm text-[10px] text-outline">1</span>
<span className="font-label-md text-label-md text-on-surface">Applied</span>
</div>
<div className="flex items-center gap-3">
<div className="w-28 bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full" ></div>
</div>
<span className="font-code-sm text-code-sm text-on-surface font-semibold w-10 text-right">142</span>
</div>
</div>

<div className="flex items-center justify-between bg-surface-container-low p-2 rounded-lg">
<div className="flex items-center gap-2 min-w-0">
<span className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center font-code-sm text-[10px] text-outline">2</span>
<span className="font-label-md text-label-md text-on-surface">AI Screened</span>
<span className="font-label-sm text-label-sm text-primary bg-primary-fixed px-1.5 py-0.2 rounded">45%</span>
</div>
<div className="flex items-center gap-3">
<div className="w-28 bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full" ></div>
</div>
<span className="font-code-sm text-code-sm text-on-surface font-semibold w-10 text-right">64</span>
</div>
</div>

<div className="flex items-center justify-between bg-surface-container-low p-2 rounded-lg">
<div className="flex items-center gap-2 min-w-0">
<span className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center font-code-sm text-[10px] text-outline">3</span>
<span className="font-label-md text-label-md text-on-surface">Interview</span>
<span className="font-label-sm text-label-sm text-secondary bg-surface-container px-1.5 py-0.2 rounded">44%</span>
</div>
<div className="flex items-center gap-3">
<div className="w-28 bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-secondary h-full" ></div>
</div>
<span className="font-code-sm text-code-sm text-on-surface font-semibold w-10 text-right">28</span>
</div>
</div>

<div className="flex items-center justify-between bg-surface-container-low p-2 rounded-lg">
<div className="flex items-center gap-2 min-w-0">
<span className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center font-code-sm text-[10px] text-outline">4</span>
<span className="font-label-md text-label-md text-on-surface">Feedback Sync</span>
<span className="font-label-sm text-label-sm text-outline bg-surface-container px-1.5 py-0.2 rounded">43%</span>
</div>
<div className="flex items-center gap-3">
<div className="w-28 bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-secondary-container h-full" ></div>
</div>
<span className="font-code-sm text-code-sm text-on-surface font-semibold w-10 text-right">12</span>
</div>
</div>

<div className="flex items-center justify-between bg-surface-container-low p-2 rounded-lg">
<div className="flex items-center gap-2 min-w-0">
<span className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center font-code-sm text-[10px] text-outline">5</span>
<span className="font-label-md text-label-md text-on-surface">Offer Extended</span>
<span className="font-label-sm text-label-sm text-tertiary bg-tertiary-fixed px-1.5 py-0.2 rounded">42%</span>
</div>
<div className="flex items-center gap-3">
<div className="w-28 bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-tertiary h-full" ></div>
</div>
<span className="font-code-sm text-code-sm text-on-surface font-semibold w-10 text-right">5</span>
</div>
</div>

<div className="flex items-center justify-between bg-surface-container-low p-2 rounded-lg">
<div className="flex items-center gap-2 min-w-0">
<span className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center font-code-sm text-[10px] text-outline">6</span>
<span className="font-label-md text-label-md text-tertiary font-bold">Joined</span>
<span className="font-label-sm text-label-sm text-tertiary bg-tertiary-fixed px-1.5 py-0.2 rounded font-bold">60%</span>
</div>
<div className="flex items-center gap-3">
<div className="w-28 bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-tertiary-container h-full" ></div>
</div>
<span className="font-code-sm text-code-sm text-tertiary font-bold w-10 text-right">3</span>
</div>
</div>
</div>
<div className="p-space-sm bg-surface-container rounded-lg flex items-center justify-between font-body-sm text-body-sm">
<span className="flex items-center gap-1.5 text-on-surface-variant">
<span className="material-symbols-outlined text-[16px] text-tertiary">speed</span>
            Mean velocity: <strong>4.2 days per stage</strong>
</span>
<span className="text-tertiary font-label-sm text-label-sm font-semibold">Healthy Velocity</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">

<div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col">
<div className="flex items-center justify-between pb-space-md">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-error text-[20px]">notification_important</span>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Urgent Action Items &amp; SLA Feed</h2>
</div>
<span className="font-code-sm text-code-sm text-outline">Realtime Stream</span>
</div>
<div className="flex flex-col gap-space-md mt-space-sm">

<div className="p-space-md rounded-lg bg-error-container text-on-error-container flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
<div className="flex items-start gap-space-sm">
<span className="material-symbols-outlined text-[20px] text-error mt-0.5">warning</span>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-label-md text-label-md font-bold">SLA Timeout Warning</span>
<span className="px-1.5 py-0.2 rounded bg-surface-container-lowest text-error font-code-sm text-[10px] font-bold">7d in Stage</span>
</div>
<p className="font-body-sm text-body-sm text-on-error-container mt-0.5">
<strong>Rahul Verma</strong> is delayed in Interview stage for 7 days (Enterprise Limit: 5d).
                </p>
</div>
</div>
<div className="flex items-center gap-2 shrink-0">
<button className="px-3 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container font-label-md text-label-md text-on-surface shadow-sm transition-colors" type="button">
                View Dossier
              </button>
<button className="px-3 py-1.5 rounded-lg bg-error text-on-error hover:opacity-90 font-label-md text-label-md transition-colors" type="button">
                Reassign Panel
              </button>
</div>
</div>

<div className="p-space-md rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
<div className="flex items-start gap-space-sm">
<span className="material-symbols-outlined text-[20px] text-tertiary mt-0.5">verified</span>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-label-md text-label-md font-bold">Offer Accepted &amp; Signed</span>
<span className="px-1.5 py-0.2 rounded bg-tertiary-fixed-dim text-on-tertiary-fixed font-code-sm text-[10px]">CTC: ₹28L</span>
</div>
<p className="font-body-sm text-body-sm mt-0.5">
<strong>Ananya Iyer</strong> accepted Lead React Architect. Scheduled induction on <strong>Nov 18, 2024</strong>.
                </p>
</div>
</div>
<button className="shrink-0 px-3 py-1.5 rounded-lg bg-tertiary text-on-tertiary hover:opacity-90 font-label-md text-label-md transition-colors" type="button">
              Init Onboarding
            </button>
</div>

<div className="p-space-md rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
<div className="flex items-start gap-space-sm">
<span className="material-symbols-outlined text-[20px] text-primary mt-0.5">auto_awesome</span>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-label-md text-label-md text-on-surface font-semibold">AI Automated Scoring Completed</span>
<span className="px-1.5 py-0.2 rounded bg-primary-fixed text-on-primary-fixed font-code-sm text-[10px]">Batch #104</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  6 new applicants scored &gt;90 Tier 1 profile rating for Backend Platform Engineer role.
                </p>
</div>
</div>
<button className="shrink-0 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors" type="button">
              Batch Review
            </button>
</div>
</div>
</div>

<div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between pb-space-md">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[20px]">calendar_month</span>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Scheduled for Today</h2>
</div>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">4 Sessions</span>
</div>

<div className="flex flex-col gap-space-sm">
<div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center font-headline-sm text-primary">
<span className="">KV</span>
</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface">Karthik Venkat</span>
<span className="font-body-sm text-body-sm text-outline">System Design • Sr. Data Eng</span>
</div>
</div>
<div className="flex flex-col items-end">
<span className="font-code-sm text-code-sm text-primary font-bold">14:00 IST</span>
<span className="font-label-sm text-label-sm text-outline">Room Alpha</span>
</div>
</div>
<div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center font-headline-sm text-secondary">
<span className="">SM</span>
</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface">Sanya Malhotra</span>
<span className="font-body-sm text-body-sm text-outline">Product Thinking • Lead PM</span>
</div>
</div>
<div className="flex flex-col items-end">
<span className="font-code-sm text-code-sm text-secondary font-bold">16:30 IST</span>
<span className="font-label-sm text-label-sm text-outline">Google Meet</span>
</div>
</div>
<div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-lg bg-tertiary-fixed flex items-center justify-center font-headline-sm text-tertiary">
<span className="">AR</span>
</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface">Arjun Rampal</span>
<span className="font-body-sm text-body-sm text-outline">Culture &amp; Fit • Devops Specialist</span>
</div>
</div>
<div className="flex flex-col items-end">
<span className="font-code-sm text-code-sm text-outline font-bold">18:00 IST</span>
<span className="font-label-sm text-label-sm text-outline">Async Review</span>
</div>
</div>
</div>
</div>
<div className="mt-space-lg pt-space-sm flex items-center justify-between font-label-md text-label-md">
<span className="text-outline">Syncing with Google Calendar API</span>
<button className="text-primary hover:underline flex items-center gap-1" type="button">
<span className="">View Full Schedule</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</div>
</div>
</div>
</div>

<div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm hidden items-center justify-center p-4" id="addCandidateModal">
<div className="bg-surface-container-lowest rounded-xl max-w-xl w-full p-space-xl shadow-xl flex flex-col gap-space-lg">

<div className="flex items-center justify-between">
<div className="flex flex-col">
<h3 className="font-headline-md text-headline-md text-on-surface">Add New Candidate</h3>
<p className="font-body-sm text-body-sm text-outline">Create profile &amp; dispatch automated screening parsing</p>
</div>
<button className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors" id="btnCloseCandidateModal" type="button">
<span className="material-symbols-outlined text-[20px]">close</span>
</button>
</div>

<form className="flex flex-col gap-space-md" id="candidateForm" onsubmit="event.preventDefault();">
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
<div className="flex flex-col gap-1">
<label className="font-label-md text-label-md text-on-surface">Full Name *</label>
<input className="h-9 px-3 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary" id="candidateName" placeholder="e.g. Maya Krishnan" required="" type="text" />
</div>
<div className="flex flex-col gap-1">
<label className="font-label-md text-label-md text-on-surface">Target Requisition *</label>
<select className="h-9 px-3 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary" id="candidateRole" required="">
<option value="Lead React Architect">Lead React Architect</option>
<option value="Staff Backend Engineer">Staff Backend Engineer</option>
<option value="Principal DevOps Architect">Principal DevOps Architect</option>
<option value="Lead Product Manager">Lead Product Manager</option>
</select>
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
<div className="flex flex-col gap-1">
<label className="font-label-md text-label-md text-on-surface">Email Address *</label>
<input className="h-9 px-3 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary" id="candidateEmail" placeholder="candidate@domain.com" required="" type="email" />
</div>
<div className="flex flex-col gap-1">
<label className="font-label-md text-label-md text-on-surface">Phone Contact</label>
<input className="h-9 px-3 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary" id="candidatePhone" placeholder="+91 98765 43210" type="tel" />
</div>
</div>

<div className="flex flex-col gap-1">
<label className="font-label-md text-label-md text-on-surface">Resume / Curriculum Vitae (PDF, DOCX)</label>
<div className="p-6 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer text-center" id="dropZone">
<span className="material-symbols-outlined text-[32px] text-primary">cloud_upload</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface">Click to upload or drag &amp; drop</span>
<span className="font-body-sm text-body-sm text-outline">Supported formats: PDF, DOCX up to 15MB</span>
</div>
<span className="font-code-sm text-code-sm text-primary font-bold hidden" id="selectedFileName">resume-attached.pdf</span>
</div>
</div>

<div className="flex items-center justify-end gap-space-md pt-space-sm">
<button className="h-9 px-space-md rounded-lg text-on-surface-variant hover:bg-surface-container font-label-lg text-label-lg transition-colors" id="btnCancelCandidateModal" type="button">
            Cancel
          </button>
<button className="h-9 px-space-md rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm flex items-center gap-1.5 transition-colors" id="btnSubmitCandidate" type="submit">
<span className="material-symbols-outlined text-[18px]">send</span>
<span className="">Create &amp; Run Screening</span>
</button>
</div>
</form>
</div>
</div>

<div className="fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-space-lg py-space-md rounded-xl shadow-xl flex items-center gap-space-md transform translate-y-24 opacity-0 transition-all duration-300" id="toastNotification">
<span className="material-symbols-outlined text-tertiary-fixed text-[22px]">check_circle</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-inverse-on-surface font-semibold" id="toastTitle">Candidate Added</span>
<span className="font-body-sm text-body-sm text-outline-variant" id="toastBody">Profile has been queued for Tier-1 evaluation.</span>
</div>
</div>


    </>
  );
};

export default Dashboard;
