# Research: S-3 / Theme System

## FAWT Prevention (Flash of Wrong Theme)

**Decision**: Use a blocking inline `<script>` in the `<head>` of `layout.tsx` using `dangerouslySetInnerHTML`.

**Rationale**: Next.js 15 (App Router) renders the initial HTML on the server. If the theme is stored in `localStorage`, the server doesn't know it. Without a script, the browser would render the default theme, then the JS would load and flip it, causing a flash. An inline script in `<head>` executes before the body is parsed.

**Implementation**:
```javascript
(function() {
  try {
    var theme = localStorage.getItem('mba-portfolio-theme');
    var support = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (theme === 'dark' || (!theme && support)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
```
**Minified (< 200 bytes)**:
`!(function(){try{var t=localStorage.getItem("mba-portfolio-theme"),e=window.matchMedia("(prefers-color-scheme: dark)").matches;"dark"===t||!t&&e?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}catch(t){}})();`
(Length: ~185 bytes)

---

## Real-time System Preference Sync

**Decision**: Use `window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ...)` inside `useEffect`.

**Rationale**: As clarified in the spec (Option A), the site should respond to OS theme changes immediately unless a manual override exists.

**Implementation**:
- Hook will check for the existence of the `localStorage` key.
- If no key exists, it will attach a listener to the media query.
- If a key exists, the listener is skipped (manual override takes precedence).

---

## SSR / Hydration Safety

**Decision**: Default to `theme: 'dark'` (or `undefined` initially) and only read `localStorage`/`matchMedia` inside `useEffect`.

**Rationale**: Prevents "Hydration failed" errors where the server-rendered HTML (which assumes a default) doesn't match the client's first render (which might read a different theme from the browser). The FAWT script ensures the *visual* state is correct before React even starts.
