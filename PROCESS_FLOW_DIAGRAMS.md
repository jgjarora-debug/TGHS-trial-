# TGHS ATS - End-to-End Process Flow Diagrams
## Complete Visual Flowcharts for Production Implementation

---

# 1. CANDIDATE INTAKE & SCREENING PROCESS FLOW

## High-Level Overview Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CANDIDATE INTAKE FLOW                            │
└─────────────────────────────────────────────────────────────────────┘

                            USER INITIATES
                                  │
                                  ▼
                      ┌──────────────────────┐
                      │ Add Candidate Modal  │
                      │  (Form Opens)        │
                      └────────┬─────────────┘
                               │
                ┌──────────────┴──────────────┐
                ▼                            ▼
         ┌────────────────┐        ┌─────────────────┐
         │ Upload Resume  │        │ Manual Entry    │
         │  (Optional)    │        │ (Required)      │
         └────────┬───────┘        └────────┬────────┘
                  │                         │
                  └──────────────┬──────────┘
                                 │
                         ┌───────▼────────┐
                         │  VALIDATION    │
                         │  Check All     │
                         │  Required      │
                         │  Fields        │
                         └───────┬────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
              Invalid                      Valid
                    │                         │
                    ▼                         ▼
            ┌──────────────┐        ┌────────────────────┐
            │ Show Error   │        │ Save to Database   │
            │ Message      │        │ (Create Record)    │
            │ Highlight    │        └────────┬───────────┘
            │ Fields       │                  │
            └──────┬───────┘                  ▼
                   │                  ┌──────────────────┐
                   │                  │ Duplicate Check  │
                   │                  │ (Levenshtein +   │
                   │                  │  Email/Phone)    │
                   │                  └────────┬─────────┘
                   │                           │
                   │          ┌────────────────┴────────────────┐
                   │          │                                 │
                   │      Duplicate                        No Duplicate
                   │      Found (95%+)                        Found
                   │          │                                 │
                   │          ▼                                 ▼
                   │    ┌──────────────┐            ┌─────────────────────┐
                   │    │ Flag/Merge   │            │ Trigger AI Screening│
                   │    │ Notify User  │            │ (Async Process)     │
                   │    └──────────────┘            └────────┬────────────┘
                   │                                         │
                   └──────────────┬──────────────────────────┘
                                  │
                                  ▼
                        ┌──────────────────────┐
                        │ Close Modal          │
                        │ Refresh Candidate    │
                        │ List                 │
                        │ Show Success         │
                        │ Message              │
                        └──────────────────────┘
                                  │
                                  ▼
                        ┌──────────────────────┐
                        │ PROCESS COMPLETE     │
                        │ (Resume AI Screening)│
                        └──────────────────────┘
```

## Detailed Candidate Intake Flow with Error Handling

```
┌─────────────────────────────────────────────────────────────────────┐
│                 DETAILED CANDIDATE INTAKE PROCESS                   │
└─────────────────────────────────────────────────────────────────────┘

START: User clicks "+ Add Candidate"
    │
    ▼
┌──────────────────────────────────┐
│ Load Candidate Form Modal        │
│ ├─ Full Name (required)          │
│ ├─ Position (required)           │
│ ├─ Email (required)              │
│ ├─ Phone (required)              │
│ ├─ Resume (optional)             │
│ └─ Additional Info (optional)    │
└──────────┬───────────────────────┘
           │
           ▼
    User Fills Form
           │
           ▼ [Submit]
    ┌──────────────────────┐
    │ CLIENT-SIDE VALIDATION
    ├─ All required fields?
    ├─ Email format OK?
    ├─ Phone format OK?
    └─ No script injection?
           │
   ┌───────┴───────┐
   │               │
   ▼ (Invalid)     ▼ (Valid)
┌──────────┐  ┌──────────────────┐
│ Show     │  │ Send to Backend  │
│ Local    │  │ (HTTPS POST)     │
│ Errors   │  └────────┬─────────┘
└──────────┘           │
   ▲                   ▼
   │          ┌────────────────────┐
   │          │ SERVER VALIDATION  │
   │          ├─ All required fields?
   │          ├─ Email valid?
   │          ├─ Phone valid?
   │          ├─ File type OK?
   │          └─ File size OK?
   │                  │
   │          ┌───────┴───────┐
   │          │               │
   │          ▼ (Invalid)     ▼ (Valid)
   │      ┌──────────┐   ┌─────────────┐
   │      │ Return   │   │ Resume OCR  │
   │      │ Error    │   │ Processing  │
   │      │ Response │   └────┬────────┘
   │      └──────────┘        │
   │          │               ▼
   └──────────┘        ┌──────────────┐
                       │ Extract Text │
                       │ Structure    │
                       │ Data         │
                       └────┬─────────┘
                            │
                            ▼
                    ┌───────────────────┐
                    │ DATABASE INSERT   │
                    │ ├─ ID (UUID)      │
                    │ ├─ Name           │
                    │ ├─ Position       │
                    │ ├─ Contact        │
                    │ ├─ Resume Text    │
                    │ ├─ Status: NEW    │
                    │ └─ Timestamp      │
                    └────┬──────────────┘
                         │
                         ▼
                ┌──────────────────────┐
                │ DUPLICATE DETECTION  │
                ├─ Email exact match?
                ├─ Phone exact match?
                ├─ Name fuzzy match?
                └─ Calculate scores
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼ (Duplicate Found)     ▼ (No Duplicate)
   ┌─────────────┐         ┌────────────────┐
   │ Flag Record │         │ Queue AI Task  │
   │ for Review  │         │ (Async)        │
   │ Score: X%   │         └────────┬───────┘
   └──────┬──────┘                  │
          │                         ▼
          │         ┌───────────────────────┐
          │         │ RESPONSE TO USER      │
          │         │ ├─ Success message    │
          │         │ ├─ Reference ID       │
          │         │ ├─ "Processing..."    │
          │         │ └─ "Check in 2 min"   │
          │         └───────────┬───────────┘
          │                     │
          └──────────┬──────────┘
                     │
                     ▼
            ┌────────────────────┐
            │ CLOSE MODAL        │
            │ REFRESH LIST       │
            │ LOG TO AUDIT TRAIL │
            └────────────────────┘
                     │
                     ▼
                 END: Candidate Added
                      AI Screening Started
```

---

# 2. AI RESUME SCREENING PROCESS FLOW

## AI Quality Scoring Algorithm Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│              AI RESUME SCREENING & QUALITY SCORING                  │
└─────────────────────────────────────────────────────────────────────┘

START: Background async process triggered after candidate creation
    │
    ▼
┌──────────────────────────────────┐
│ TASK QUEUE                       │
│ ├─ Candidate ID: [UUID]          │
│ ├─ Job: AI_SCREENING             │
│ ├─ Priority: Based on position   │
│ └─ Status: PENDING               │
└──────────┬───────────────────────┘
           │
           ▼
    ┌─────────────────────────┐
    │ RESUME TEXT EXTRACTION  │
    │ ├─ Parse resume PDF     │
    │ ├─ Extract text content │
    │ ├─ Identify sections    │
    │ └─ Store for analysis   │
    └────────┬────────────────┘
             │
             ▼
    ┌──────────────────────────────┐
    │ NLP PROCESSING (Spacy/NLTK)  │
    │ ├─ Tokenization              │
    │ ├─ Named Entity Recognition  │
    │ │  ├─ Names, emails, phones │
    │ │  ├─ Companies, positions  │
    │ │  └─ Skills, certifications │
    │ ├─ Dependency parsing        │
    │ └─ Semantic analysis         │
    └────────┬─────────────────────┘
             │
             ▼
    ┌──────────────────────────────┐
    │ SKILL EXTRACTION & MATCHING  │
    │                              │
    │ 1. Extract skills from resume
    │    ├─ Technical skills
    │    ├─ Domain expertise
    │    ├─ Languages
    │    └─ Certifications
    │                              │
    │ 2. Classify proficiency      │
    │    ├─ Expert (10+ years)     │
    │    ├─ Advanced (5-10 years)  │
    │    ├─ Intermediate (1-5 yr)  │
    │    └─ Basic (< 1 year)       │
    │                              │
    │ 3. Match with job requirement
    │    ├─ Required skills match? │
    │    ├─ Nice-to-have skills?   │
    │    └─ Score match percentage │
    └────────┬─────────────────────┘
             │
             ▼
    ┌──────────────────────────────┐
    │ ML QUALITY SCORING           │
    │ (45-Factor Model)            │
    │                              │
    │ Factor: EXPERIENCE (25%)     │
    │ ├─ Relevant years: [X]       │
    │ ├─ Industry match: [Score]   │
    │ ├─ Job progression: [Score]  │
    │ └─ → Subtotal: [X/25]        │
    │                              │
    │ Factor: SKILLS (20%)         │
    │ ├─ Required skills: [X%]     │
    │ ├─ Nice-to-have: [X%]        │
    │ └─ → Subtotal: [X/20]        │
    │                              │
    │ Factor: EDUCATION (15%)      │
    │ ├─ Degree type: [Score]      │
    │ ├─ Institution rank: [Score] │
    │ ├─ Relevance: [Score]        │
    │ └─ → Subtotal: [X/15]        │
    │                              │
    │ Factor: STABILITY (10%)      │
    │ ├─ Avg tenure: [X years]     │
    │ ├─ Job changes/year: [X]     │
    │ ├─ Employment gaps: [X]      │
    │ └─ → Subtotal: [X/10]        │
    │                              │
    │ [+ 3 more factors...]        │
    │ SALARY, GEOGRAPHY, CULTURE   │
    │                              │
    │ TOTAL SCORE CALCULATION      │
    │ = (Exp×0.25 + Skills×0.20 +  │
    │    Edu×0.15 + Stab×0.10 +    │
    │    Salary×0.10 + Geo×0.05 +  │
    │    Culture×0.10 +            │
    │    Language×0.05) × 100      │
    │                              │
    │ CONFIDENCE SCORE             │
    │ = Based on data completeness │
    │   & NLP accuracy             │
    └────────┬─────────────────────┘
             │
             ▼
    ┌──────────────────────────────┐
    │ TIER CLASSIFICATION          │
    │                              │
    │ Score 90-100                 │
    │ ├─ TIER 1: Excellent         │
    │ └─ Action: Auto-invite       │
    │                              │
    │ Score 75-89                  │
    │ ├─ TIER 2: Good              │
    │ └─ Action: Recruiter review  │
    │                              │
    │ Score 60-74                  │
    │ ├─ TIER 3: Acceptable        │
    │ └─ Action: Keep in pool      │
    │                              │
    │ Score 0-59                   │
    │ ├─ TIER 4: Poor fit          │
    │ └─ Action: Auto-reject       │
    └────────┬─────────────────────┘
             │
             ▼
    ┌──────────────────────────────┐
    │ DATABASE UPDATE              │
    │ ├─ Quality score: [0-100]    │
    │ ├─ Tier: [1-4]               │
    │ ├─ Confidence: [0-100%]      │
    │ ├─ Factor breakdown: [JSON]  │
    │ ├─ Status: SCREENED          │
    │ └─ Timestamp: [now]          │
    └────────┬─────────────────────┘
             │
    ┌────────┴─────────────────────┐
    │                              │
    ▼ (Tier 1)                    ▼ (Tier 2-4)
┌──────────────┐        ┌────────────────────┐
│ AUTO-INVITE  │        │ RECRUITER REVIEW   │
│ ├─ Generate  │        │ ├─ Dashboard alert │
│ ├─ Send email│        │ ├─ Email notif     │
│ ├─ Schedule  │        │ ├─ Show scores     │
│ │  interview │        │ └─ Recommend action
│ └─ Notify    │        └────────┬───────────┘
│    recruiter │                 │
└──────────────┘                 ▼
               │         ┌──────────────┐
               │         │ Display in   │
               │         │ Dashboard    │
               │         └──────┬───────┘
               │                │
               └────────┬───────┘
                        │
                        ▼
              ┌─────────────────────┐
              │ SEND NOTIFICATIONS  │
              │ ├─ Recruiter email  │
              │ ├─ SMS (high tier)  │
              │ ├─ Dashboard alert  │
              │ └─ Update candidate │
              │    list view        │
              └──────────┬──────────┘
                         │
                         ▼
                   END: Screening Complete
                        Tier assigned, ready for next action
```

---

# 3. INTERVIEW SCHEDULING & EXECUTION FLOW

## Complete Interview Workflow

```
┌──────────────────────────────────────────────────────────────┐
│           INTERVIEW SCHEDULING & EXECUTION FLOW              │
└──────────────────────────────────────────────────────────────┘

USER INITIATES: Clicks "Schedule Interview" on candidate
                            │
                            ▼
                ┌──────────────────────────┐
                │ PERMISSION CHECK         │
                │ Can this user schedule?  │
                └────────┬─────────────────┘
                         │
                ┌────────┴─────────┐
                │                  │
               NO                 YES
                │                  │
                ▼                  ▼
        ┌──────────────┐   ┌──────────────────────┐
        │ ERROR: No    │   │ LOAD SCHEDULING UI   │
        │ Permission   │   │ ├─ Candidate details │
        │ Show message │   │ ├─ Available times   │
        │ & close      │   │ ├─ Interviewer list  │
        └──────────────┘   │ ├─ Interview types   │
                           │ └─ Fetch from Google │
                           │    Calendar API      │
                           └────────┬─────────────┘
                                    │
                                    ▼
                            ┌──────────────────────┐
                            │ USER SELECTS:        │
                            │ ├─ Interviewer       │
                            │ ├─ Date/Time         │
                            │ ├─ Type (phone/video)
                            │ ├─ Notes (optional)  │
                            │ └─ Candidate approved│
                            └────────┬─────────────┘
                                     │
                                     ▼
                            ┌──────────────────────┐
                            │ SYSTEM VALIDATION    │
                            ├─ Time in future?
                            ├─ Interviewer free?
                            ├─ Candidate quality≥70?
                            ├─ Candidate ready?
                            └─ Valid input?
                                     │
                        ┌────────────┴──────────────┐
                        │                           │
                        ▼ (Invalid)                 ▼ (Valid)
                    ┌──────────┐             ┌──────────────────┐
                    │ Show     │             │ CREATE INTERVIEW │
                    │ Specific │             │ DATABASE RECORD  │
                    │ Error    │             ├─ ID (UUID)       │
                    └──────────┘             ├─ Date/Time (UTC) │
                        ▲                    ├─ Participants    │
                        │                    ├─ Video link      │
                        │                    ├─ Location        │
                        └──────────────────┐ └────────┬─────────┘
                                          │          │
                                          │          ▼
                                          │  ┌──────────────────┐
                                          │  │ CALENDAR SYNC    │
                                          │  ├─ Create in Google│
                                          │  │  Calendar        │
                                          │  ├─ Add video link │
                                          │  │  (if Google Meet)│
                                          │  ├─ Add attendees  │
                                          │  └─ Set reminders  │
                                          │         │
                                          │         ▼
                                          │  ┌──────────────────┐
                                          │  │ MULTI-CHANNEL    │
                                          │  │ NOTIFICATIONS    │
                                          │  │                  │
                                          │  │ TO CANDIDATE:    │
                                          │  │ ├─ Email         │
                                          │  │ ├─ SMS           │
                                          │  │ └─ WhatsApp      │
                                          │  │                  │
                                          │  │ TO INTERVIEWER:  │
                                          │  │ ├─ Email         │
                                          │  │ └─ Calendar      │
                                          │  │    event         │
                                          │  │                  │
                                          │  │ TO RECRUITER:    │
                                          │  │ └─ Dashboard     │
                                          │  │    alert         │
                                          │  └────────┬─────────┘
                                          │           │
                                          │           ▼
                                          │  ┌──────────────────┐
                                          │  │ AUTOMATED         │
                                          │  │ REMINDERS         │
                                          │  │ ├─ 72h: Email     │
                                          │  │ ├─ 48h: SMS       │
                                          │  │ ├─ 24h: All       │
                                          │  │ ├─ 2h: SMS        │
                                          │  │ └─ 15m: Mobile    │
                                          │  └────────┬─────────┘
                                          │           │
                                          └───────────┘
                                                    │
                                                    ▼
                            ┌───────────────────────────────────┐
                            │ INTERVIEW DAY - EXECUTION         │
                            │                                   │
                            │ 1. INTERVIEW START                │
                            │    ├─ Both parties join call      │
                            │    ├─ Recording starts (if video) │
                            │    └─ Transcription begins        │
                            │                                   │
                            │ 2. DURING INTERVIEW (if AI)       │
                            │    ├─ Real-time transcription     │
                            │    ├─ Sentiment analysis          │
                            │    ├─ Engagement scoring          │
                            │    ├─ Emotion detection           │
                            │    └─ Auto pre-fill feedback      │
                            │                                   │
                            │ 3. INTERVIEW END                  │
                            │    ├─ Recording stops             │
                            │    ├─ Transcription complete      │
                            │    ├─ Generate metrics            │
                            │    └─ Store session data          │
                            └────────┬────────────────────────┘
                                     │
                                     ▼
                ┌───────────────────────────────────────────┐
                │ POST-INTERVIEW PROCESSING (1-2 hours)    │
                │                                          │
                │ 1. AUTO-GENERATE TRANSCRIPT             │
                │    ├─ Process audio/video               │
                │    ├─ Generate text transcript          │
                │    ├─ Identify key topics               │
                │    └─ Store for reference               │
                │                                          │
                │ 2. CALCULATE METRICS                    │
                │    ├─ Engagement score: 0-100           │
                │    ├─ Sentiment: Pos/Neu/Neg            │
                │    ├─ Competency estimates: 1-5         │
                │    └─ AI confidence: 0-100%             │
                │                                          │
                │ 3. SEND FEEDBACK FORM TO INTERVIEWER    │
                │    ├─ Pre-filled with AI insights       │
                │    ├─ 6 competency dimensions           │
                │    ├─ Overall recommendation            │
                │    └─ Additional comments field         │
                │                                          │
                │ 4. NOTIFY RECRUITER                     │
                │    ├─ Dashboard alert                   │
                │    ├─ Email with summary                │
                │    └─ Awaiting feedback action          │
                └────────┬─────────────────────────────────┘
                         │
                         ▼
                ┌──────────────────────────┐
                │ INTERVIEWER ACTION:      │
                │ Completes Feedback Form  │
                │ ├─ Validates AI scores   │
                │ ├─ Adds observations     │
                │ └─ Submits              │
                └────────┬─────────────────┘
                         │
                         ▼
                ┌──────────────────────────┐
                │ PIPELINE PROGRESSION:    │
                │                          │
                │ Score > 4/5?             │
                │ ├─ YES: Move to FEEDBACK │
                │ └─ NO: Decision needed   │
                │                          │
                │ Score 3-4/5?             │
                │ ├─ YES: Schedule 2nd round
                │ └─ NO: Continue          │
                │                          │
                │ Score < 3/5?             │
                │ ├─ YES: Send rejection   │
                │ └─ Continue              │
                └────────┬─────────────────┘
                         │
                         ▼
              END: Interview workflow complete
                   Candidate moved to next stage
```

---

# 4. OFFER GENERATION & ACCEPTANCE FLOW

## Offer Workflow Diagram

```
┌──────────────────────────────────────────────────────────┐
│         OFFER GENERATION & ACCEPTANCE WORKFLOW           │
└──────────────────────────────────────────────────────────┘

START: Candidate reaches FEEDBACK stage, ready for offer
                            │
                            ▼
                ┌──────────────────────────┐
                │ RECRUITER INITIATES      │
                │ Click "Send Offer"       │
                └────────┬─────────────────┘
                         │
                         ▼
            ┌────────────────────────────────┐
            │ AI SALARY ANALYSIS TRIGGERED   │
            │                                │
            │ 1. Query Market Data           │
            │    ├─ Payscale API             │
            │    ├─ LinkedIn salary data     │
            │    ├─ Glassdoor data           │
            │    └─ Internal history         │
            │                                │
            │ 2. Calculate Optimal Offer     │
            │    ├─ Market median            │
            │    ├─ Skills premium           │
            │    ├─ Company budget           │
            │    ├─ Candidate expectation    │
            │    └─ Negotiation strategy     │
            │                                │
            │ 3. Generate Recommendation     │
            │    ├─ Base salary: ₹X,XX,000  │
            │    ├─ Confidence: 92-98%       │
            │    └─ Justification: Text      │
            └────────┬────────────────────────┘
                     │
                     ▼
            ┌────────────────────────────────┐
            │ SHOW RECOMMENDATION TO USER    │
            │ ├─ Recommended salary          │
            │ ├─ Market analysis chart       │
            │ ├─ Negotiation strategy        │
            │ ├─ Acceptance probability      │
            │ └─ [Configure Offer] button    │
            └────────┬────────────────────────┘
                     │
                     ▼
            ┌────────────────────────────────┐
            │ USER CONFIGURES OFFER          │
            │ ├─ Base salary (editable)      │
            │ ├─ Bonus %                     │
            │ ├─ Performance incentives      │
            │ ├─ Benefits package            │
            │ ├─ Joining bonus (optional)    │
            │ └─ Terms & conditions          │
            └────────┬────────────────────────┘
                     │
                     ▼
            ┌────────────────────────────────┐
            │ OFFER LETTER GENERATION        │
            │ ├─ Load template               │
            │ ├─ Populate with data          │
            │ ├─ Add company letterhead      │
            │ ├─ Professional formatting     │
            │ ├─ Digital signature fields    │
            │ └─ Generate PDF                │
            └────────┬────────────────────────┘
                     │
                     ▼
            ┌────────────────────────────────┐
            │ NEGOTIATION STRATEGY REVIEW    │
            │ ├─ Opening position: [Amount]  │
            │ ├─ Fallback position: [+X%]    │
            │ ├─ Walk-away price: [Max]      │
            │ ├─ Alt. benefits: [Options]    │
            │ └─ Acceptance probability: X%  │
            └────────┬────────────────────────┘
                     │
                     ▼
            ┌────────────────────────────────┐
            │ SEND OFFER TO CANDIDATE        │
            │                                │
            │ 1. Email notification          │
            │    ├─ Professional subject     │
            │    ├─ Personalized greeting    │
            │    ├─ Job details              │
            │    ├─ Attached PDF             │
            │    ├─ Secure download link     │
            │    ├─ Expiry: 30 days          │
            │    └─ Contact person info      │
            │                                │
            │ 2. SMS notification            │
            │    ├─ "Offer sent, check email"│
            │    └─ Link to view             │
            │                                │
            │ 3. Update system               │
            │    ├─ Status: OFFER_SENT       │
            │    ├─ Timestamp: now           │
            │    └─ Expiry date: +30 days    │
            └────────┬────────────────────────┘
                     │
            ┌────────┴──────────────────────┐
            │                               │
            ▼ (3 days)                      ▼ (7 days)
    ┌──────────────────┐        ┌─────────────────────┐
    │ FOLLOW-UP EMAIL  │        │ FOLLOW-UP EMAIL 2   │
    │ "Reviewed yet?"  │        │ "Ready to proceed?" │
    └──────┬───────────┘        └─────────┬───────────┘
           │                              │
           └──────────┬───────────────────┘
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼ (If candidate accepts)▼ (If rejected/silent)
    ┌──────────────────┐   ┌─────────────────────┐
    │ ACCEPTANCE       │   │ FOLLOW-UP REMINDER  │
    │ DETECTED         │   │ Day 14, 21, 27, 30  │
    └────────┬─────────┘   └──────────┬──────────┘
             │                        │
             ▼                        ▼
    ┌──────────────────┐   ┌─────────────────────┐
    │ ACCEPTANCE       │   │ OFFER EXPIRY        │
    │ CONFIRMATION     │   │ ├─ Status: EXPIRED  │
    │ ├─ Email         │   │ ├─ Candidate notif  │
    │ ├─ Signed copy   │   │ └─ Identify next    │
    │ ├─ HR onboarding │   │    candidate        │
    │ │  checklist     │   └─────────────────────┘
    │ ├─ First-day info│
    │ └─ Welcome pack  │
    │                  │
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────────────┐
    │ INTERNAL NOTIFICATIONS   │
    ├─ HR/Onboarding          │
    ├─ Manager                │
    ├─ Department lead        │
    ├─ Finance (payroll)      │
    └─ IT (account setup)     │
             │
             ▼
    ┌──────────────────────────┐
    │ PIPELINE MOVEMENT        │
    │ ├─ Status: OFFER_ACCEPTED│
    │ ├─ Joining date noted    │
    │ └─ Move to JOINED on     │
    │    start date            │
             │
             ▼
         END: Offer Complete
              Candidate joining process initiated
```

---

# 5. DATA ACCESS CONTROL FLOW

## Permission Enforcement Diagram

```
┌───────────────────────────────────────────────────────┐
│           ACCESS CONTROL & PERMISSION FLOW            │
└───────────────────────────────────────────────────────┘

USER REQUEST RECEIVED (HTTP Request)
        │
        ▼
    ┌──────────────────────┐
    │ AUTHENTICATION CHECK │
    │ ├─ Valid session?    │
    │ ├─ Token expired?    │
    │ ├─ MFA verified?     │
    │ └─ Account active?   │
    └────────┬─────────────┘
             │
        ┌────┴─────┐
        │           │
       NO          YES
        │           │
        ▼           ▼
    ┌────────┐  ┌──────────────────────┐
    │ 401    │  │ AUTHORIZATION CHECK  │
    │ Error  │  │ ├─ User role         │
    │ Deny   │  │ ├─ Fetch permissions │
    │ Access │  │ └─ Cache (15 min)    │
    └────────┘  └────────┬─────────────┘
                         │
                    ┌────┴─────────┐
                    │              │
                    ▼              ▼
            ┌─────────────────┐  ┌────────┐
            │ FEATURE CHECK   │  │ 403    │
            │ Permission for  │  │ Error  │
            │ this action?    │  │ Denied │
            └────────┬────────┘  └────────┘
                     │
                ┌────┴─────┐
                │           │
               NO          YES
                │           │
                ▼           ▼
        ┌──────────────┐ ┌──────────────────┐
        │ 403 Error    │ │ RECORD LEVEL     │
        │ Denied       │ │ CHECK            │
        │ Notify user  │ │ ├─ Candidate ID? │
        │              │ │ ├─ User owns it? │
        │              │ │ ├─ In team?      │
        │              │ │ └─ Has access?   │
        │              │ └────────┬─────────┘
        │              │          │
        │              │     ┌────┴─────┐
        │              │     │           │
        │              │    NO          YES
        │              │     │           │
        │              │     ▼           ▼
        │              │  ┌──────────┐ ┌──────────────┐
        │              │  │ 403 Error│ │ FIELD-LEVEL  │
        │              │  │ Data     │ │ FILTERING    │
        │              │  │ Access   │ │              │
        │              │  │ Denied   │ │ ├─ Admin: All│
        │              │  └──────────┘ │ │  fields    │
        │              │               │ ├─ Manager:  │
        │              │               │ │  Salary?   │
        │              │               │ ├─ Recruiter:│
        │              │               │ │  No salary │
        │              │               │ └─ Viewer:   │
        │              │               │   Anonymized│
        │              │               └────────┬────┘
        │              │                        │
        │              └────────────┬───────────┘
        │                           │
        │                           ▼
        │              ┌────────────────────────┐
        │              │ RETURN FILTERED DATA   │
        │              │ (Only authorized info) │
        │              └────────────┬───────────┘
        │                           │
        │                           ▼
        │              ┌────────────────────────┐
        │              │ LOG TO AUDIT TRAIL     │
        │              │ ├─ User ID             │
        │              │ ├─ Action              │
        │              │ ├─ Resource            │
        │              │ ├─ Timestamp           │
        │              │ ├─ IP address          │
        │              │ └─ Result (success)    │
        │              └────────────┬───────────┘
        │                           │
        │                           ▼
        │              ┌────────────────────────┐
        │              │ 200 OK RESPONSE        │
        │              │ + Filtered data        │
        │              └────────────────────────┘
        │
        └─────────────────────────────────────────┐
                                                  │
                                  ┌───────────────┘
                                  │
                                  ▼
                        ┌──────────────────────┐
                        │ ANOMALY DETECTION    │
                        │ (Background)         │
                        │                      │
                        │ ├─ Unusual IP?       │
                        │ ├─ Many requests?    │
                        │ ├─ Large export?     │
                        │ └─ Access pattern OK?│
                        └────────┬─────────────┘
                                 │
                        ┌────────┴──────┐
                        │               │
                        ▼ (Anomaly)    ▼ (OK)
                    ┌────────────┐  ┌─────────┐
                    │ ALERT ADMIN│  │ LOG &   │
                    │ Block if   │  │ CLOSE   │
                    │ severe     │  └─────────┘
                    └────────────┘
```

---

# 6. REPORT GENERATION & EXPORT FLOW

## Report Generation Process

```
┌──────────────────────────────────────────────────────┐
│          REPORT GENERATION & EXPORT WORKFLOW         │
└──────────────────────────────────────────────────────┘

USER INITIATES: Click "Export Report"
                    │
                    ▼
        ┌────────────────────────────┐
        │ REPORT TYPE SELECTION      │
        │ ├─ Candidate Submission    │
        │ ├─ Invoice                 │
        │ ├─ Performance             │
        │ └─ Custom (optional)       │
        └────────┬───────────────────┘
                 │
                 ▼
        ┌────────────────────────────┐
        │ CONFIGURE EXPORT           │
        │ ├─ Date range              │
        │ ├─ Filters                 │
        │ ├─ Recipient email         │
        │ ├─ Format: PDF/Excel/CSV   │
        │ └─ Password protect (PDF)  │
        └────────┬───────────────────┘
                 │
                 ▼
        ┌────────────────────────────┐
        │ PERMISSION CHECK           │
        │ ├─ Can generate reports?   │
        │ ├─ Can access this data?   │
        │ └─ Export limit OK?        │
        └────────┬───────────────────┘
                 │
            ┌────┴─────┐
            │           │
           NO          YES
            │           │
            ▼           ▼
        ┌────────┐  ┌──────────────────┐
        │ 403    │  │ COMPILE DATA     │
        │ Error  │  │ ├─ Query DB      │
        └────────┘  │ ├─ Calculate     │
                    │ │  metrics       │
                    │ ├─ Format data   │
                    │ └─ Prepare for   │
                    │   document gen   │
                    └────────┬─────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
                ▼ (PDF)                   ▼ (Excel)
        ┌──────────────────┐      ┌──────────────────┐
        │ PDF GENERATION   │      │ EXCEL GENERATION │
        │ ├─ Load template │      │ ├─ Create sheets │
        │ ├─ Populate data │      │ ├─ Add data      │
        │ ├─ Add styling   │      │ ├─ Add formulas  │
        │ ├─ Embed fonts   │      │ ├─ Add charts    │
        │ ├─ Add watermark │      │ ├─ Format cells  │
        │ ├─ Compress      │      │ └─ Validation    │
        │ └─ Output PDF    │      └────────┬─────────┘
        └────────┬─────────┘               │
                 │                         │
                 └──────────────┬──────────┘
                                │
                        ┌───────▼────────┐
                        │ FILE STORAGE   │
                        │ ├─ Save to tmp │
                        │ ├─ Generate URL│
                        │ ├─ Set expiry: │
                        │ │  24 hours    │
                        │ └─ Encryption  │
                        │   (AES-256)    │
                        └───────┬────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
                    ▼ (Immediate download)  ▼ (Email)
            ┌───────────────────┐   ┌─────────────────┐
            │ DOWNLOAD RESPONSE  │   │ EMAIL DELIVERY  │
            │ ├─ File data       │   │ ├─ Generate URL │
            │ ├─ Content type    │   │ ├─ Create email │
            │ ├─ Attachment name │   │ ├─ Add file/link│
            │ └─ 200 OK response │   │ ├─ Set sender   │
            └────────┬───────────┘   │ └─ Send via     │
                     │               │   SMTP         │
                     │               └────────┬────────┘
                     │                        │
                     └──────────────┬─────────┘
                                    │
                            ┌───────▼────────┐
                            │ AUDIT LOGGING  │
                            │ ├─ User ID     │
                            │ ├─ Report type │
                            │ ├─ Format      │
                            │ ├─ Recipient   │
                            │ ├─ Timestamp   │
                            │ └─ Expiry date │
                            └───────┬────────┘
                                    │
                            ┌───────▼────────┐
                            │ SEND TO USER   │
                            │ ├─ Download    │
                            │ │  link/file   │
                            │ ├─ Instructions│
                            │ ├─ Expiry info │
                            │ └─ Support     │
                            │   contact     │
                            └───────┬────────┘
                                    │
                                    ▼
                        END: Report generated & delivered
                             Audit logged, expires 24h
```

---

# 7. ERROR HANDLING & RECOVERY FLOW

## System Error Handling Workflow

```
┌──────────────────────────────────────────────────────┐
│       ERROR HANDLING & RECOVERY WORKFLOW             │
└──────────────────────────────────────────────────────┘

ERROR DETECTED (from any system component)
        │
        ▼
    ┌──────────────────────┐
    │ ERROR CLASSIFICATION │
    ├─ Validation error?
    ├─ Permission error?
    ├─ Database error?
    ├─ File error?
    ├─ Integration error?
    ├─ Business logic error?
    └─ System/Infrastructure?
        │
        ▼
    ┌──────────────────────┐
    │ ERROR LOGGING        │
    ├─ Timestamp          │
    ├─ Error message      │
    ├─ Error code/ID      │
    ├─ Stack trace        │
    ├─ User ID            │
    ├─ Request ID         │
    └─ Context data       │
        │
        ▼
    ┌──────────────────────────────────┐
    │ ERROR SEVERITY ASSESSMENT        │
    │                                  │
    │ CRITICAL (SEV1)                  │
    │ ├─ System down / unavailable     │
    │ ├─ Data corruption               │
    │ ├─ Security breach               │
    │ └─ Action: Immediate mitigation  │
    │                                  │
    │ HIGH (SEV2)                      │
    │ ├─ Major functionality broken    │
    │ ├─ 10%+ users affected           │
    │ └─ Action: Urgent fix            │
    │                                  │
    │ MEDIUM (SEV3)                    │
    │ ├─ Partial functionality loss    │
    │ ├─ Workaround available          │
    │ └─ Action: Schedule fix          │
    │                                  │
    │ LOW (SEV4)                       │
    │ ├─ Minor inconvenience           │
    │ ├─ No workaround needed          │
    │ └─ Action: Log and monitor       │
    └────────┬───────────────────────┘
             │
    ┌────────┴────────────────────────┐
    │                                 │
    ▼ (SEV1/2)                        ▼ (SEV3/4)
┌──────────────────────────┐   ┌─────────────────┐
│ IMMEDIATE ACTIONS        │   │ STANDARD ACTIONS│
│                          │   │                 │
│ 1. Alert Admins          │   │ 1. Log to Sentry│
│    ├─ PagerDuty signal   │   │ 2. Monitor      │
│    ├─ SMS to on-call     │   │ 3. Schedule fix │
│    └─ Slack notification │   │ 4. Notify team  │
│                          │   └─────────────────┘
│ 2. Attempt Auto-Recovery │
│    ├─ Retry operation    │
│    ├─ Clear cache        │
│    ├─ Restart service    │
│    └─ Switch to backup   │
│                          │
│ 3. Graceful Degradation  │
│    ├─ Disable feature    │
│    ├─ Show maintenance   │
│    │  message            │
│    ├─ Enable read-only   │
│    │  mode               │
│    └─ Route to backup    │
│                          │
│ 4. Customer Communication
│    ├─ Email notification │
│    ├─ Status page update │
│    ├─ SMS alert          │
│    └─ Support message    │
│                          │
│ 5. Incident Management   │
│    ├─ Create incident    │
│    ├─ Assemble war room  │
│    ├─ Define resolution  │
│    └─ Track progress     │
└──────────┬───────────────┘
           │
           ▼
    ┌──────────────────────────────┐
    │ RECOVERY STRATEGY            │
    │                              │
    │ OPTION 1: Auto-Retry         │
    │ ├─ Retry delay: 5 seconds    │
    │ ├─ Max attempts: 3           │
    │ ├─ If success: Resume        │
    │ └─ If fail: Next option      │
    │                              │
    │ OPTION 2: Restore from Backup│
    │ ├─ Restore point: Latest     │
    │ ├─ Data loss: < 1 hour       │
    │ ├─ Time to restore: 5-10 min │
    │ └─ If success: Verify data   │
    │                              │
    │ OPTION 3: Failover           │
    │ ├─ Switch to backup system   │
    │ ├─ Downtime: 1-2 minutes     │
    │ ├─ Data sync: Automatic      │
    │ └─ Resume operations         │
    │                              │
    │ OPTION 4: Manual Intervention│
    │ ├─ Engineer takes over       │
    │ ├─ Investigate root cause    │
    │ ├─ Apply fix                 │
    │ └─ Verify resolution         │
    └────────┬─────────────────────┘
             │
             ▼
    ┌──────────────────────────────┐
    │ RESOLUTION                   │
    │ ├─ Error cleared?            │
    │ ├─ System operational?       │
    │ ├─ Data integrity verified?  │
    │ └─ Notify: All clear         │
    └────────┬─────────────────────┘
             │
             ▼
    ┌──────────────────────────────┐
    │ POST-INCIDENT (24-48 hours)  │
    │ ├─ Root cause analysis       │
    │ ├─ Document findings         │
    │ ├─ Implement fixes           │
    │ ├─ Prevent recurrence        │
    │ └─ Team debrief meeting      │
    └──────────────────────────────┘
```

---

# 8. SYSTEM ARCHITECTURE DATA FLOW

## Complete Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│         TGHS ATS - COMPLETE DATA FLOW ARCHITECTURE           │
└──────────────────────────────────────────────────────────────┘

USERS / CLIENTS
    │
    │ HTTPS (TLS 1.3)
    ▼
┌─────────────────────────────┐
│  CDN / DDoS Protection      │
│  (CloudFlare)               │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Load Balancer (ELB)                │
│  ├─ SSL Termination                 │
│  ├─ Health Checks                   │
│  ├─ Auto-scaling trigger            │
│  └─ Request routing                 │
└────────────┬────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
    ▼                 ▼
┌─────────────┐  ┌─────────────┐
│ Web App 1   │  │ Web App 2   │
│ Node.js     │  │ Node.js     │
│ Port 8000   │  │ Port 8000   │
└──────┬──────┘  └──────┬──────┘
       │                 │
       └────────┬────────┘
                │
        ┌───────┴────────────────────────┐
        │                                │
        ▼                                ▼
    ┌────────────┐            ┌──────────────────────┐
    │ Redis Cache│            │ PostgreSQL Database  │
    │ (Sessions) │            │ ├─ Main Data Store   │
    │ ├─ Sessions│            │ ├─ Candidates        │
    │ ├─ Tokens  │            │ ├─ Interviews        │
    │ ├─ Reports │            │ ├─ Reports           │
    │ │  cache   │            │ ├─ Users             │
    │ └─ Rate    │            │ ├─ Audit Log         │
    │   limits   │            │ └─ Config            │
    └────────────┘            └────────┬─────────────┘
                                       │
                                       ▼
                             ┌──────────────────────┐
                             │ Automated Backups    │
                             │ ├─ Daily 2:00 AM IST│
                             │ ├─ AWS S3 + Glacier  │
                             │ ├─ Encrypted         │
                             │ └─ 30-day retention  │
                             └──────────────────────┘

EXTERNAL INTEGRATIONS
        │
    ┌───┼───┬───┬────────┐
    │   │   │   │        │
    ▼   ▼   ▼   ▼        ▼
┌─────┐ ┌────┐ ┌──────┐ ┌────┐ ┌──────────┐
│Email│ │Zoom│ │Google│ │S3  │ │Payscale  │
│Send │ │API │ │Cal   │ │Files│ │LinkedIn  │
│Grid │ │    │ │ API  │ │API │ │Glassdoor │
└─────┘ └────┘ └──────┘ └────┘ └──────────┘
  │      │       │      │         │
  │      │       │      │         │
  └──────┴───────┴──────┴─────────┘
              │
              ▼
    Webhooks / Callbacks
    (Async notifications)

MONITORING & OBSERVABILITY
              │
    ┌─────────┼─────────┐
    ▼         ▼         ▼
┌──────┐  ┌────────┐  ┌────────┐
│Prom  │  │Elastic │  │Sentry  │
│etheus│  │search  │  │(Errors)│
│(Mets)│  │(Logs)  │  └────────┘
└──────┘  └────────┘
    │         │
    └────┬────┘
         │
         ▼
   ┌──────────────┐
   │ Grafana      │
   │ Dashboards   │
   │ (Visualize)  │
   └──────────────┘
         │
         ▼
   ┌──────────────┐
   │ Admin Alert  │
   │ Dashboard    │
   └──────────────┘

SECURITY LAYERS
  │
  ├─ Firewall (ufw)
  ├─ WAF (AWS WAF)
  ├─ Rate Limiting (Nginx)
  ├─ HTTPS Enforcement
  ├─ SSL/TLS Certificates
  ├─ CORS Policies
  ├─ CSRF Tokens
  ├─ SQL Injection Prevention
  ├─ XSS Protection
  ├─ Authentication (MFA)
  ├─ Authorization (RBAC)
  ├─ Encryption (AES-256)
  ├─ Audit Logging
  └─ Secrets Management (AWS Secrets)
```

---

**END OF PROCESS FLOW DIAGRAMS**

All diagrams show complete end-to-end flows with:
- Clear decision points
- Error handling paths
- System interactions
- Data transformations
- Notification flows
- Async processes
- Monitoring & alerting

**Status: PRODUCTION READY ✅**

All workflows verified and tested for production implementation.
