/* middleware.js — the password on the door.

   Why this exists: Vercel's own Deployment Protection will not cover the
   production URL on this plan. "Require Log In" is switched on, but Standard
   Protection covers previews and deployment URLs only, so
   energy-muse-workingfolder.vercel.app answers 200 to anybody. Protecting
   production, or turning on Vercel's own Password Protection, is the $150 a
   month Advanced Deployment Protection add-on. This does the same job for
   nothing.

   It runs at the edge, BEFORE any file is served. Someone without the
   password never receives the page at all — no HTML, no images, nothing they
   could read out of view-source. That is the difference between this and a
   script that hides the page after sending it.

   The password lives in the SITE_PASSWORD environment variable in Vercel,
   never in this repo.

   IT FAILS OPEN, ON PURPOSE. With no SITE_PASSWORD set, every request passes
   straight through and the site behaves exactly as it does today. Deploying
   this can therefore not lock anyone out and cannot take the site down; the
   gate only closes once the variable exists. The cost of that choice is that
   a typo in the variable name leaves the site public rather than throwing an
   error, so confirm it is actually shut afterwards:

       curl -s -o /dev/null -w '%{http_code}\n' https://energy-muse-workingfolder.vercel.app/

   401 means shut. 200 means the variable did not take.

   Remove this file and package.json to lift the gate at launch. */
import { next } from '@vercel/functions';

export const config = {
  /* everything except Vercel's own internals */
  matcher: '/((?!_vercel/).*)',
};

/* Any username is accepted — the browser's dialog demands one and there is no
   sense inventing a second secret to remember. Say so in the prompt itself.

   ASCII ONLY. A header value is a ByteString, so a stray em dash here throws
   when the Response is constructed and every locked-out visitor gets a crash
   instead of a password box. The local test covers this. */
const REALM = 'Energy Muse preview - any username, password from Clay';

export default function middleware(request) {
  const expected = process.env.SITE_PASSWORD;
  if (!expected) return next();

  const header = request.headers.get('authorization') || '';
  if (header.startsWith('Basic ')) {
    let decoded = '';
    try { decoded = atob(header.slice(6)); } catch { decoded = ''; }
    const split = decoded.indexOf(':');
    const supplied = split < 0 ? '' : decoded.slice(split + 1);
    if (constantTimeEqual(supplied, expected)) return next();
  }

  return new Response('This preview is private. A password is required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="' + REALM + '", charset="UTF-8"',
      'content-type': 'text/plain; charset=utf-8',
      /* never let a rejection, or an acceptance, be cached at the edge */
      'cache-control': 'no-store',
    },
  });
}

/* Compare every character even after a mismatch, so the time taken does not
   leak how much of the password was right. */
function constantTimeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
