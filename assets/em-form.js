/* em-form.js — the forms behind the buttons that promised them.

   Several calls on this site named an action and then handed the reader a page
   that could not perform it: "Book a Session" went to /support/, which had no
   form on it at all; /veza/'s two waitlist buttons linked to /veza/, the page
   they were already on; and /support/ said "before you write in" without
   offering anywhere to write.

   These are real forms - they validate, they report their own errors, they
   confirm - but there is no destination for the data yet, because the backend
   decision (Shopify or otherwise) has not been made. So nothing is transmitted
   and nothing is stored. The submitted values are handed to a single function,
   send(), which is the one place to wire up when there is somewhere to send
   them. Until then it resolves and the form shows its confirmation, which is
   what a prototype should do: behave correctly and keep no secrets.

   Mark up a form with data-emform="<name>" and give it a data-done message. */
(function () {
  'use strict';

  /* THE WIRE-UP POINT. Replace the body of this with a fetch() to whatever
     endpoint is chosen and the whole site's forms start delivering. */
  function send(name, values) {
    if (window.EM_FORM_ENDPOINT) {
      return fetch(window.EM_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: name, values: values })
      }).then(function (r) { if (!r.ok) throw new Error('bad status'); });
    }
    return Promise.resolve();          /* no endpoint yet - see the note above */
  }

  var CSS = [
    '.emf{display:grid;gap:14px;margin-top:clamp(20px,2.6vw,30px);max-width:520px}',
    '.emf-row{display:grid;gap:6px}',
    '.emf label{font-family:var(--sans);font-weight:600;font-size:11px;letter-spacing:.14em;',
    '  text-transform:uppercase;color:var(--stone)}',
    '.emf input,.emf textarea,.emf select{font-family:var(--sans);font-size:15px;color:var(--ink);',
    '  background:var(--surface);border:1px solid var(--hair);border-radius:4px;',
    '  padding:12px 13px;min-height:46px;width:100%;transition:border-color .2s}',
    '.emf textarea{min-height:104px;resize:vertical;line-height:1.55}',
    '.emf input:focus-visible,.emf textarea:focus-visible,.emf select:focus-visible{',
    '  outline:2px solid var(--copper);outline-offset:2px;border-color:var(--copper)}',
    '.emf [aria-invalid="true"]{border-color:#A33A2B}',
    '.emf-err{font-family:var(--sans);font-size:12.5px;color:#A33A2B;min-height:0}',
    '.emf button{justify-self:start;margin-top:4px}',
    '.emf-note{font-family:var(--sans);font-size:12px;line-height:1.5;color:var(--stone);max-width:46ch}',
    '.emf-done{border-top:2px solid var(--copper);padding-top:18px;margin-top:clamp(20px,2.6vw,30px);',
    '  max-width:520px}',
    '.emf-done strong{display:block;font-family:var(--serif);font-weight:400;font-size:clamp(19px,2vw,24px)}',
    '.emf-done p{margin-top:8px;color:var(--ink-soft);font-size:15px;line-height:1.6}'
  ].join('\n');

  function styles() {
    if (document.getElementById('em-form-css')) return;
    var s = document.createElement('style');
    s.id = 'em-form-css'; s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }

  function boot() {
    var forms = [].slice.call(document.querySelectorAll('form[data-emform]'));
    if (!forms.length) return;
    styles();

    forms.forEach(function (form) {
      var err = form.querySelector('.emf-err');
      var btn = form.querySelector('button[type="submit"]');

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var fields = [].slice.call(form.querySelectorAll('input,textarea,select'));
        var bad = null, values = {};

        fields.forEach(function (f) {
          f.removeAttribute('aria-invalid');
          var v = (f.value || '').trim();
          values[f.name || f.id || 'field'] = v;
          if (f.required && !v) bad = bad || { f: f, why: 'Fill in ' + labelFor(f) + '.' };
          else if (f.type === 'email' && v && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v))
            bad = bad || { f: f, why: 'That email address does not look right.' };
        });

        if (bad) {
          bad.f.setAttribute('aria-invalid', 'true');
          if (err) err.textContent = bad.why;
          bad.f.focus();
          return;
        }
        if (err) err.textContent = '';
        if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

        send(form.getAttribute('data-emform'), values).then(function () {
          var done = document.createElement('div');
          done.className = 'emf-done';
          done.setAttribute('role', 'status');
          done.innerHTML = '<strong>' + (form.getAttribute('data-done-title') || 'Thank you.') + '</strong>'
            + '<p>' + (form.getAttribute('data-done') || 'We have your details.') + '</p>';
          form.parentNode.replaceChild(done, form);
          done.setAttribute('tabindex', '-1');
          done.focus();
        }).catch(function () {
          if (err) err.textContent = 'That did not send. Try again in a moment.';
          if (btn) { btn.disabled = false; btn.textContent = btn.getAttribute('data-label') || 'Send'; }
        });
      });
    });
  }

  function labelFor(f) {
    var l = f.closest('.emf-row') && f.closest('.emf-row').querySelector('label');
    return l ? l.textContent.trim().toLowerCase() : 'this field';
  }

  /* Exposed so the forms that already had good handlers of their own - the
     affiliates application with its bespoke field styling, the quiz result
     capture, the newsletter band - can route their values through the same
     single point instead of each dropping them on the floor. Six forms, one
     place to wire up. */
  window.EM_FORM = { send: send };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
