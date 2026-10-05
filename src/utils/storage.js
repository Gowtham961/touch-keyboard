/**
 * localStorage helpers for session history & personal bests.
 * Keys used:
 *   typeflow_sessions   - JSON array of last 10 sessions (newest first)
 *   typeflow_pb         - JSON object { keys, accuracy, wpm, kpm }
 */

const SESSION_KEY = 'typeflow_sessions';
const PB_KEY      = 'typeflow_pb';
const MAX_SESSIONS = 10;

// ─── Sessions ────────────────────────────────────────────────────────────────

export function loadSessions() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSession(session) {
  try {
    const sessions = loadSessions();
    sessions.unshift(session);             // newest first
    if (sessions.length > MAX_SESSIONS) sessions.pop();
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessions));
  } catch {
    // Storage full or private browsing — silently skip
  }
}

// ─── Personal Bests ───────────────────────────────────────────────────────────

export function loadPersonalBest() {
  try {
    const raw = localStorage.getItem(PB_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Compare current session against stored PB and return { isNewPB, updatedPB }.
 * We judge PB primarily by total keys pressed (core metric), then WPM as tiebreak.
 */
export function evaluateAndSavePB(session) {
  const pb = loadPersonalBest();
  let isNewPB = false;

  if (
    !pb ||
    session.totalKeys > pb.totalKeys ||
    (session.totalKeys === pb.totalKeys && session.wpm > pb.wpm)
  ) {
    isNewPB = true;
    try {
      localStorage.setItem(PB_KEY, JSON.stringify(session));
    } catch {
      // ignore
    }
  }

  return { isNewPB, pb: isNewPB ? session : pb };
}
