/* =============================================================
   VIVIRION — VI WELL: MENTAL HEALTH SUPPORT PAGE
   mental-health.js
   ============================================================= */

'use strict';

/* ── CONSTANTS ─────────────────────────────────────────────── */
const STORAGE_KEY = 'vi-check_assessment_progress';
const TOTAL_SCREENS = 6;

/* ── PROFESSIONAL DATA ─────────────────────────────────────── */
const professionals = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    initials: 'SC',
    credentials: 'PhD, C.Psych',
    title: 'Registered Psychologist | CBT & Mindfulness Specialist',
    specialties: ['Anxiety', 'Depression', 'Burnout', 'Work Stress'],
    approach: 'I use a warm, evidence-based approach combining CBT and mindfulness to help you build practical tools that work in real life.',
    languages: ['English', 'Mandarin'],
    location: 'Toronto, ON',
    availability: 'Accepting new patients',
    session: 'Virtual & In-person',
    category: ['anxiety', 'depression', 'burnout'],
    modality: ['virtual', 'in-person'],
    language: 'mandarin',
  },
  {
    id: 2,
    name: 'Marcus Osei',
    initials: 'MO',
    credentials: 'MSW, RSW',
    title: 'Registered Social Worker | Trauma-Informed Therapist',
    specialties: ['Trauma', 'Grief', 'Relationships', 'BIPOC Mental Health'],
    approach: 'My practice centres on cultural safety and trauma-informed care. I believe healing happens in relationship, and I work to make that relationship as safe as possible.',
    languages: ['English', 'French'],
    location: 'Markham, ON',
    availability: 'Accepting new patients',
    session: 'Virtual',
    category: ['trauma', 'relationships', 'grief'],
    modality: ['virtual'],
    language: 'french',
  },
  {
    id: 3,
    name: 'Dr. Amara Patel',
    initials: 'AP',
    credentials: 'MD, FRCPC',
    title: 'Psychiatrist | Adolescent & Adult Mental Health',
    specialties: ['Adolescent Mental Health', 'Anxiety', 'ADHD', 'Medication Management'],
    approach: 'I take an integrated approach to psychiatric care, combining medication when appropriate with collaborative goal-setting and psychoeducation.',
    languages: ['English', 'Spanish'],
    location: 'Scarborough, ON',
    availability: 'Accepting new patients',
    session: 'Virtual & In-person',
    category: ['anxiety', 'adolescent'],
    modality: ['virtual', 'in-person', 'hybrid'],
    language: 'spanish',
  },
  {
    id: 4,
    name: 'Jordan Kim',
    initials: 'JK',
    credentials: 'MCP, RCC',
    title: 'Registered Clinical Counsellor | Burnout & Life Transitions',
    specialties: ['Burnout', 'Career Transitions', 'LGBTQ+ Affirming', 'Anxiety'],
    approach: 'I offer a non-judgmental, strengths-based space where we explore what is genuinely working for you and build from there, without pressure or a one-size-fits-all plan.',
    languages: ['English'],
    location: 'Vancouver, BC',
    availability: 'Waitlist: 2 weeks',
    session: 'Virtual',
    category: ['burnout', 'anxiety', 'relationships'],
    modality: ['virtual'],
    language: 'english',
  },
];

/* ── RESOURCE DATA ─────────────────────────────────────────── */
const resources = [
  // Crisis
  { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>', title: '988 Suicide & Crisis Lifeline', desc: 'Free, confidential support 24/7 by call or text. Dial or text 988.', category: 'crisis', link: 'tel:988', linkText: 'Call or Text 988' },
  { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>', title: 'Crisis Text Line', desc: 'Text HOME to 741741. Free, 24/7 crisis support via SMS.', category: 'crisis', link: 'sms:741741', linkText: 'Text HOME to 741741' },
  { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>', title: 'Find A Helpline', desc: 'International directory of crisis support lines by country and topic.', category: 'crisis', link: 'https://findahelpline.com', linkText: 'Visit Resource' },
  { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>', title: 'IASP Crisis Centre Directory', desc: 'Crisis centres worldwide from the International Association for Suicide Prevention.', category: 'crisis', link: 'https://www.iasp.info/resources/Crisis_Centres/', linkText: 'Visit Resource' },
  // Apps
  { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>', title: 'Woebot', desc: 'An AI-powered companion using CBT techniques to help with anxiety and low mood.', category: 'apps', link: 'https://woebothealth.com', linkText: 'Visit Resource' },
  { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" stroke-width="1.5"/><path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="2" stroke="currentColor" stroke-width="1.5"/></svg>', title: 'Headspace', desc: 'Guided meditations, sleep sounds, and mindfulness exercises for daily wellbeing.', category: 'apps', link: 'https://www.headspace.com', linkText: 'Visit Resource' },
  { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 22c4.97-2.5 8-6.5 8-11V4l-8-2-8 2v7c0 4.5 3.03 8.5 8 11z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>', title: 'Calm', desc: 'Sleep stories, breathing exercises, and relaxation tools for stress and anxiety.', category: 'apps', link: 'https://www.calm.com', linkText: 'Visit Resource' },
  { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>', title: 'Wysa', desc: 'AI-powered emotional support and CBT exercises, with optional access to human coaches.', category: 'apps', link: 'https://www.wysa.io', linkText: 'Visit Resource' },
  // Screening
  { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><polyline points="14 2 14 8 20 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><polyline points="10 9 9 9 8 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>', title: 'PHQ-9 Depression Screen', desc: 'A validated 9-question tool used by clinicians to assess depression severity.', category: 'screening', link: 'https://www.phqscreeners.com', linkText: 'Visit Resource' },
  { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>', title: 'GAD-7 Anxiety Screen', desc: 'A 7-item validated scale for generalized anxiety often used in primary care.', category: 'screening', link: 'https://www.phqscreeners.com', linkText: 'Visit Resource' },
  { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>', title: 'NAMI Mental Health Screening', desc: 'Free, anonymous online screening tools from the National Alliance on Mental Illness.', category: 'screening', link: 'https://www.nami.org/Support-Education/NAMI-HelpLine/Top-FAQs/How-to-Find-a-Mental-Health-Screener', linkText: 'Visit Resource' },
  // Community
  { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>', title: '7 Cups', desc: 'Free, anonymous peer support and professional online therapy for any concern.', category: 'community', link: 'https://www.7cups.com', linkText: 'Visit Resource' },
  { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>', title: 'NAMI Peer Groups', desc: 'Free in-person and online peer support groups led by trained people with lived experience.', category: 'community', link: 'https://www.nami.org/Support-Education/Support-Groups', linkText: 'Visit Resource' },
  { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>', title: 'Mental Health America', desc: 'Community tools, advocacy resources, and a national network of local affiliates.', category: 'community', link: 'https://www.mhanational.org', linkText: 'Visit Resource' },
  // Professionals
  { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>', title: 'Physician Support Line', desc: 'Confidential, free peer support for physicians and medical students. Call 1-888-409-0141.', category: 'professionals', link: 'https://www.physiciansupportline.com', linkText: 'Visit Resource' },
  { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><polyline points="14 2 14 8 20 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>', title: 'Therapist Aid Worksheets', desc: 'Free, professionally reviewed worksheets and CBT tools for clients and practitioners.', category: 'professionals', link: 'https://www.therapistaid.com', linkText: 'Visit Resource' },
  { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>', title: 'APA Practice Resources', desc: 'American Psychological Association\'s library of clinical practice guidelines and tools.', category: 'professionals', link: 'https://www.apa.org/practice', linkText: 'Visit Resource' },
];

/* ── ASSESSMENT LOGIC ──────────────────────────────────────── */
let answers = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
let currentScreen = 1;

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
}

function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
  answers = {};
}

/* ── PROGRESS BAR ──────────────────────────────────────────── */
function updateProgress(screenNum) {
  const bar = document.getElementById('progress-bar');
  const label = document.getElementById('progress-label');
  const progressEl = document.querySelector('.assessment-progress');
  if (!bar || !label) return;
  const pct = ((screenNum - 1) / TOTAL_SCREENS) * 100;
  bar.style.width = pct + '%';
  label.textContent = screenNum <= TOTAL_SCREENS ? `Step ${screenNum} of ${TOTAL_SCREENS}` : 'Almost done!';
  if (progressEl) progressEl.setAttribute('aria-valuenow', screenNum);
}

/* ── SCREEN TRANSITIONS ────────────────────────────────────── */
function showScreen(targetNum, direction = 'forward') {
  const screens = document.querySelectorAll('.assessment-screen');
  const current = document.querySelector('.assessment-screen.active');
  const next = document.querySelector(`[data-screen="${targetNum}"]`);
  if (!next) return;

  if (current) {
    current.style.animation = direction === 'forward'
      ? 'screenOut 0.25s ease forwards'
      : 'screenOutReverse 0.25s ease forwards';
    setTimeout(() => {
      current.classList.remove('active');
      current.style.animation = '';
    }, 230);
  }

  setTimeout(() => {
    next.classList.add('active');
    next.style.animation = direction === 'forward'
      ? 'screenIn 0.35s ease'
      : 'screenInReverse 0.35s ease';
    currentScreen = Number.isInteger(targetNum) ? targetNum : TOTAL_SCREENS + 1;
    if (Number.isInteger(targetNum)) updateProgress(targetNum);
    next.querySelector('[class]')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 240);
}

/* ── OPTION BUTTONS ────────────────────────────────────────── */
function setupOptionButtons() {
  document.querySelectorAll('.assessment-options').forEach(group => {
    const isMulti = group.classList.contains('assessment-options--multi');
    const field = group.dataset.field;

    group.querySelectorAll('.option-btn').forEach(btn => {
      // Restore from localStorage
      const saved = answers[field];
      if (saved) {
        if (Array.isArray(saved) && saved.includes(btn.dataset.value)) {
          btn.setAttribute('aria-pressed', 'true');
        } else if (saved === btn.dataset.value) {
          btn.setAttribute('aria-pressed', 'true');
        }
      }

      btn.addEventListener('click', () => {
        if (isMulti) {
          const pressed = btn.getAttribute('aria-pressed') === 'true';
          btn.setAttribute('aria-pressed', String(!pressed));
          const selected = [...group.querySelectorAll('[aria-pressed="true"]')]
            .map(b => b.dataset.value);
          answers[field] = selected;
        } else {
          group.querySelectorAll('.option-btn').forEach(b => b.setAttribute('aria-pressed', 'false'));
          btn.setAttribute('aria-pressed', 'true');
          answers[field] = btn.dataset.value;
        }
        saveProgress();

        // Crisis detection for Screen 6
        if (field === 'safety') {
          handleSafetyResponse(btn.dataset.value);
        }
      });
    });
  });
}

/* ── CRISIS DETECTION ──────────────────────────────────────── */
function handleSafetyResponse(value) {
  const crisisInline = document.getElementById('crisis-inline');
  const msgEl = document.getElementById('crisis-inline-message');
  if (!crisisInline) return;

  if (value === 'yes_now') {
    crisisInline.removeAttribute('hidden');
    crisisInline.style.borderColor = '#c0392b';
    if (msgEl) msgEl.textContent = 'Thank you for telling us. Please reach out to one of these right now — support is available 24/7.';
    crisisInline.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } else if (value === 'sometimes') {
    crisisInline.removeAttribute('hidden');
    crisisInline.style.borderColor = '#d68910';
    if (msgEl) msgEl.textContent = 'Thank you for sharing that. It\'s okay to not be okay. Here are some resources that are available to you at any time.';
    crisisInline.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } else {
    crisisInline.setAttribute('hidden', '');
  }
}

/* ── NAVIGATION BUTTONS ────────────────────────────────────── */
function setupNavButtons() {
  document.querySelectorAll('[data-next]').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = btn.dataset.next;
      showScreen(next === 'results' ? 'results' : parseInt(next), 'forward');
      if (next !== 'results') updateProgress(parseInt(next));
    });
  });

  document.querySelectorAll('[data-prev]').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(btn.dataset.prev);
      showScreen(prev, 'backward');
      updateProgress(prev);
    });
  });
}

/* ── SUBMIT ASSESSMENT ─────────────────────────────────────── */
async function submitAssessment() {
  // Determine concern band before transitioning
  const band = calculateBand(answers);

  // Navigate to the results screen first
  showScreen('results', 'forward');

  // Wait for the screen transition (240ms) to complete before touching the DOM
  await new Promise(resolve => setTimeout(resolve, 260));

  const loading = document.getElementById('results-loading');
  const content = document.getElementById('results-content');
  if (loading) loading.removeAttribute('hidden');
  if (content) content.setAttribute('hidden', '');

  try {
    const summary = await fetchAISummary(answers, band);
    displayResults(band, summary);
  } catch (e) {
    displayResults(band, generateFallbackSummary(answers, band));
  }

  if (loading) loading.setAttribute('hidden', '');
  if (content) content.removeAttribute('hidden');
  clearProgress();
}

function calculateBand(a) {
  let score = 0;
  const mood = a.mood || [];
  const highRiskMoods = ['low_depressed', 'anxious', 'overwhelmed', 'burnt_out'];
  highRiskMoods.forEach(m => { if (mood.includes(m)) score++; });

  const duration = a.duration || '';
  if (duration === 'six_plus_months') score += 2;
  else if (duration === 'few_months') score += 1.5;
  else if (duration === 'few_weeks') score += 0.5;

  const impact = a.impact || [];
  score += Math.min(impact.filter(i => i !== 'managing_okay').length * 0.5, 2);

  const safety = a.safety || 'no';
  if (safety === 'yes_now') return 'high';
  if (safety === 'sometimes') score += 2;

  if (score >= 5) return 'high';
  if (score >= 2.5) return 'moderate';
  return 'light';
}

async function fetchAISummary(answers, band) {
  const res = await fetch('/api/mental-health-summary', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers, band }),
  });
  if (!res.ok) throw new Error('API error');
  const data = await res.json();
  return data.summary;
}

function generateFallbackSummary(a, band) {
  const mood = (a.mood || []).join(', ').replace(/_/g, ' ') || 'a range of emotions';
  const impact = (a.impact || []).filter(i => i !== 'managing_okay').map(i => i.replace(/_/g, ' ')).join(', ') || 'daily life';

  const summaries = {
    light: `Based on what you've shared, it sounds like you've been experiencing some ${mood} lately. These feelings can naturally affect how we move through each day, and noticing them is already an important step.\n\nMany people find that at this stage, a mix of self-care strategies and peer support can make a meaningful difference. The resources below are a great place to start.\n\nRemember — there's no threshold you need to reach before you're "allowed" to seek support. Reaching out is always valid.`,
    moderate: `Based on what you've shared, it sounds like you may have been experiencing feelings of ${mood} for a noticeable period of time, and this has been affecting areas like your ${impact}. That's a lot to carry.\n\nWhat you're describing suggests that connecting with a trained professional could be a really meaningful and supportive step. A therapist, counsellor, or psychologist can offer you a dedicated space to work through what you're experiencing with someone who genuinely understands.\n\nYou don't have to figure this out alone — that's exactly what professional support is for.`,
    high: `Based on what you've shared, it sounds like things have felt very difficult recently. The feelings of ${mood} you've described, along with the impact on your ${impact}, suggest that speaking with a professional as soon as you can would be genuinely helpful.\n\nPlease know that what you're going through is real, and support is available. We strongly encourage you to connect with one of the professionals below, or to reach out to a crisis support service if you need to talk to someone right now.\n\nYou reached out by being here today. That takes courage, and it matters.`,
  };

  return summaries[band];
}

const BAND_LABELS = {
  light: 'Mild emotional stress indicators',
  moderate: 'Moderate wellbeing concern patterns',
  high: 'Elevated distress patterns — support recommended',
};

const BAND_RECOMMENDATIONS = {
  light: 'Based on what you shared, you might benefit from exploring some self-help tools and checking in with yourself regularly. Connecting with a professional is always an option, even when things feel manageable.',
  moderate: 'We recommend connecting with one of our licensed professionals who can offer you a safe, dedicated space to process what you\'re going through — a therapist or counsellor would be a great first step.',
  high: 'We strongly encourage you to connect with a professional as soon as possible. We\'re here to help you find the right person. If you need immediate support, please reach out to a crisis line.',
};

function displayResults(band, summary) {
  const badge = document.getElementById('results-badge');
  const summaryEl = document.getElementById('results-summary');
  const labelEl = document.getElementById('results-label');
  const recEl = document.getElementById('results-recommendation');

  if (badge) {
    badge.textContent = band === 'light' ? 'Informational Only' : band === 'moderate' ? 'Informational Only' : 'Informational Only';
    badge.className = `results-badge results-badge--${band}`;
  }

  if (summaryEl) {
    summaryEl.innerHTML = summary.split('\n\n').filter(Boolean)
        .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
  }

  if (labelEl) {
    labelEl.innerHTML = `<strong>Informational pattern:</strong> ${BAND_LABELS[band]}`;
  }

  if (recEl) {
    recEl.innerHTML = `<strong>Suggested next step:</strong> ${BAND_RECOMMENDATIONS[band]}`;
  }

  // Scroll results into view
  document.getElementById('assessment-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ── RETAKE ────────────────────────────────────────────────── */
function setupRetake() {
  document.getElementById('retake-assessment')?.addEventListener('click', () => {
    clearProgress();
    document.querySelectorAll('.option-btn').forEach(b => b.setAttribute('aria-pressed', 'false'));
    document.getElementById('crisis-inline')?.setAttribute('hidden', '');
    showScreen(1, 'backward');
    updateProgress(1);
  });
}

/* ── SUBMIT BUTTON ─────────────────────────────────────────── */
document.getElementById('submit-assessment')?.addEventListener('click', submitAssessment);

/* ── PROFESSIONAL CARDS ────────────────────────────────────── */
function renderProfessionals(filtered = professionals) {
  const grid = document.getElementById('professionals-grid');
  const fallback = document.getElementById('matching-fallback');
  if (!grid) return;

  if (!filtered.length) {
    grid.innerHTML = '';
    fallback?.removeAttribute('hidden');
    return;
  }
  fallback?.setAttribute('hidden', '');

  grid.innerHTML = filtered.map(p => `
    <article class="pro-card" role="listitem" aria-label="${p.name}, ${p.credentials}">
      <div class="pro-card__header">
        <div class="pro-card__photo" aria-hidden="true">${p.initials}</div>
        <div>
          <div class="pro-card__name">${p.name}, <span style="font-weight:400">${p.credentials}</span></div>
          <div class="pro-card__credentials">${p.title}</div>
        </div>
      </div>
      <div class="pro-card__body">
        <div class="pro-card__specialties" aria-label="Specialties">
          ${p.specialties.map(s => `<span class="spec-tag">${s}</span>`).join('')}
        </div>
        <div class="pro-card__availability" aria-label="Availability: ${p.availability}">${p.availability}</div>
        <div class="pro-card__session">${p.session} · ${p.location}</div>
      </div>
      <div class="pro-card__footer">
        <button class="btn btn--primary" 
          data-pro-id="${p.id}" 
          data-pro-name="${p.name}"
          aria-label="Connect with ${p.name}">
          Connect
        </button>
      </div>
    </article>
  `).join('');

  // Attach connect buttons
  grid.querySelectorAll('[data-pro-id]').forEach(btn => {
    btn.addEventListener('click', () => openBookingModal(btn.dataset.proId, btn.dataset.proName));
  });
}

/* ── PROFESSIONAL FILTERS ──────────────────────────────────── */
function setupFilters() {
  const specialtyEl = document.getElementById('filter-specialty');
  const sessionEl = document.getElementById('filter-session');
  const languageEl = document.getElementById('filter-language');
  const resetBtn = document.getElementById('reset-filters');

  function applyFilters() {
    const specialty = specialtyEl?.value || 'all';
    const session = sessionEl?.value || 'all';
    const language = languageEl?.value || 'all';

    const filtered = professionals.filter(p => {
      const matchSpecialty = specialty === 'all' || p.category.includes(specialty);
      const matchSession = session === 'all' || p.modality.includes(session);
      const matchLanguage = language === 'all' || p.language === language;
      return matchSpecialty && matchSession && matchLanguage;
    });
    renderProfessionals(filtered);
  }

  specialtyEl?.addEventListener('change', applyFilters);
  sessionEl?.addEventListener('change', applyFilters);
  languageEl?.addEventListener('change', applyFilters);

  resetBtn?.addEventListener('click', () => {
    if (specialtyEl) specialtyEl.value = 'all';
    if (sessionEl) sessionEl.value = 'all';
    if (languageEl) languageEl.value = 'all';
    renderProfessionals();
  });
}

/* ── BOOKING MODAL ─────────────────────────────────────────── */
function openBookingModal(proId, proName) {
  const modal = document.getElementById('booking-modal');
  const subEl = document.getElementById('modal-professional-name');
  if (!modal) return;

  if (subEl) subEl.textContent = `with ${proName}`;
  document.getElementById('modal-success')?.setAttribute('hidden', '');
  document.getElementById('booking-form')?.removeAttribute('hidden');
  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  document.getElementById('modal-close')?.focus();
  modal.dataset.proId = proId;
}

function closeModal() {
  const modal = document.getElementById('booking-modal');
  if (!modal) return;
  modal.setAttribute('hidden', '');
  document.body.style.overflow = '';
}

document.getElementById('modal-close')?.addEventListener('click', closeModal);
document.getElementById('modal-overlay')?.addEventListener('click', closeModal);
document.getElementById('modal-close-success')?.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

document.getElementById('booking-form')?.addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('booking-form')?.setAttribute('hidden', '');
  document.getElementById('modal-success')?.removeAttribute('hidden');
});

/* ── RESOURCE LIBRARY ──────────────────────────────────────── */
function renderResources(category = 'all') {
  const grid = document.getElementById('resources-grid');
  if (!grid) return;
  const filtered = category === 'all' ? resources : resources.filter(r => r.category === category);

  grid.innerHTML = filtered.map(r => `
    <article class="resource-card" aria-label="${r.title}">
      <div class="resource-card__icon" aria-hidden="true">${r.icon}</div>
      <div class="resource-card__category">${r.category.replace('_', ' ')}</div>
      <div class="resource-card__title">${r.title}</div>
      <p class="resource-card__desc">${r.desc}</p>
      <a href="${r.link}" 
         class="resource-card__link" 
         target="${r.link.startsWith('http') ? '_blank' : '_self'}"
         rel="${r.link.startsWith('http') ? 'noopener noreferrer' : ''}"
         aria-label="Visit ${r.title}">
        ${r.linkText} →
      </a>
    </article>
  `).join('');
}

function setupResourceTabs() {
  document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      renderResources(tab.dataset.category);
    });
  });
}

/* ── QUOTE CAROUSEL ────────────────────────────────────────── */
let currentQuote = 0;
const totalQuotes = 3;

function setQuote(index) {
  document.querySelectorAll('.quote-card').forEach((card, i) => {
    card.classList.toggle('active', i === index);
  });
  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
    dot.setAttribute('aria-current', i === index ? 'true' : 'false');
  });
  currentQuote = index;
}

function setupCarousel() {
  document.getElementById('carousel-prev')?.addEventListener('click', () => {
    setQuote((currentQuote - 1 + totalQuotes) % totalQuotes);
  });
  document.getElementById('carousel-next')?.addEventListener('click', () => {
    setQuote((currentQuote + 1) % totalQuotes);
  });
  document.querySelectorAll('.carousel-dot').forEach(dot => {
    dot.addEventListener('click', () => setQuote(parseInt(dot.dataset.index)));
  });

  // Auto-advance every 6s
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(() => setQuote((currentQuote + 1) % totalQuotes), 6000);
  }
}

/* ── CRISIS WIDGET TOGGLE ──────────────────────────────────── */
function setupCrisisWidget() {
  const toggle = document.getElementById('crisis-toggle');
  const panel = document.getElementById('crisis-panel');
  if (!toggle || !panel) return;

  toggle.addEventListener('click', () => {
    const isOpen = !panel.hidden;
    panel.hidden = isOpen;
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  // Close on click outside
  document.addEventListener('click', e => {
    const widget = document.getElementById('crisis-widget');
    if (widget && !widget.contains(e.target)) {
      panel.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ── MOBILE NAV TOGGLE ─────────────────────────────────────── */
function setupMobileNav() {
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const open = !mobileNav.hidden;
    mobileNav.hidden = open;
    hamburger.setAttribute('aria-expanded', String(!open));
  });
}

/* ── SMOOTH ANCHOR SCROLLING ───────────────────────────────── */
function setupAnchorScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ── CSS ANIMATION ADDITIONS ───────────────────────────────── */
const extraStyles = document.createElement('style');
extraStyles.textContent = `
  @keyframes screenInReverse { from { opacity: 0; transform: translateX(-24px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes screenOutReverse { to { opacity: 0; transform: translateX(24px); } }
`;
document.head.appendChild(extraStyles);

/* ── INIT ──────────────────────────────────────────────────── */
function init() {
  setupOptionButtons();
  setupNavButtons();
  setupRetake();
  renderProfessionals();
  setupFilters();
  renderResources();
  setupResourceTabs();
  setupCarousel();
  setupCrisisWidget();
  setupMobileNav();
  setupAnchorScrolling();
  updateProgress(1);

  // Pre-fill "Match Me With a Professional" CTA from results
  document.getElementById('results-cta-match')?.addEventListener('click', () => {
    document.getElementById('matching')?.scrollIntoView({ behavior: 'smooth' });
  });
}

document.addEventListener('DOMContentLoaded', init);
