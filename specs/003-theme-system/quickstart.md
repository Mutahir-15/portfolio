# Quickstart: S-3 / Theme System

## Verification Steps

### 1. Initial Load (System Preference)
1. Clear browser storage for the site.
2. Set your OS theme to **Light**.
3. Open the site.
4. **Expected**: Site loads in Light mode. `localStorage` remains empty until manually toggled.

### 2. Manual Toggle & Persistence
1. Click the theme toggle icon.
2. **Expected**: Theme switches to **Dark**. `localStorage` key `mba-portfolio-theme` is set to `"dark"`.
3. Refresh the page.
4. **Expected**: Site loads in Dark mode instantly with **zero flash** of light mode.

### 3. FAWT (Flash of Wrong Theme) Check
1. In dev tools, set network speed to "Slow 3G".
2. Set `localStorage.setItem('mba-portfolio-theme', 'light')`.
3. Hard reload (Cmd+Shift+R).
4. **Expected**: The background is light **immediately** upon the first frame, even before React hydrates.

### 4. Hydration Check
1. Open the browser console.
2. Refresh the page.
3. **Expected**: No warnings like `"Hydration failed because the initial UI does not match what was rendered on the server"`.

### 5. Accessibility
1. Use `Tab` to focus the toggle icon.
2. Press `Enter`.
3. **Expected**: Theme toggles correctly. Focus ring is visible.
