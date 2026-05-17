// FILE: netlify/functions/submit-bug.ts
//
// Receives bug reports from the TradeTrack Pro desktop app and stores
// them in Netlify Blobs. Free tier; no external account needed.

import type { Handler } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'https://christianngnga.netlify.app',
  // Electron loads via file:// or localhost; we keep CORS permissive on POST.
];

const corsHeaders = (origin: string) => ({
  'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
});

interface BugReport {
  summary?: string;
  steps?: string;
  expected?: string;
  systemInfo?: Record<string, string>;
  composed?: string;
}

export const handler: Handler = async (event) => {
  const origin = event.headers?.origin ?? '';
  const headers = { ...corsHeaders(origin), 'Content-Type': 'application/json' };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ ok: false, error: 'Method not allowed' }) };
  }

  let report: BugReport;
  try {
    report = JSON.parse(event.body ?? '{}');
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: 'Invalid JSON' }) };
  }

  const summary = (report.summary ?? '').trim();
  if (!summary) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: 'Summary is required' }) };
  }
  if (summary.length > 2000 || (report.steps?.length ?? 0) > 4000 || (report.expected?.length ?? 0) > 2000) {
    return { statusCode: 413, headers, body: JSON.stringify({ ok: false, error: 'Report too long' }) };
  }

  // Log it so it shows up immediately in Netlify Functions logs.
  console.log('[bug-report]', JSON.stringify({
    summary,
    sysInfo: report.systemInfo,
    ip: event.headers?.['x-nf-client-connection-ip'] ?? 'unknown',
    ua: event.headers?.['user-agent'] ?? '',
  }));

  // Persist in Netlify Blobs (free, ~100k ops + 100 GB storage on free tier).
  try {
    const store = getStore({ name: 'tradetrack-bugs', consistency: 'strong' });
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const key = `bugs/${new Date().toISOString().slice(0, 10)}/${id}.json`;
    await store.setJSON(key, {
      id,
      receivedAt: new Date().toISOString(),
      ip: event.headers?.['x-nf-client-connection-ip'] ?? 'unknown',
      userAgent: event.headers?.['user-agent'] ?? '',
      report,
    });
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, id }) };
  } catch (err) {
    console.error('[bug-report] blob write failed', err);
    // Even if storage fails, we logged it above — return ok so the user
    // doesn't see an error after typing their report.
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, id: null, warning: 'logged-only' }) };
  }
};
