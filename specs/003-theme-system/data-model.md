# Data Model: S-3 / Theme System

## Entities

### ThemeState
Represents the current visual mode of the application.

| Attribute | Type | Description |
|-----------|------|-------------|
| theme | `'dark' \| 'light'` | The active theme name. |
| isDark | `boolean` | Derived convenience flag for theme checking. |

### Persistence Store (Browser)
The mechanism for remembering the user's preference.

| Storage | Key | Value |
|---------|-----|-------|
| localStorage | `mba-portfolio-theme` | `'dark' \| 'light'` |

## State Transitions

1. **Initialization**:
   - IF `localStorage` has value → Use it.
   - ELSE IF `window.matchMedia` matches dark → `dark`.
   - ELSE → `light`.

2. **Manual Toggle**:
   - `dark` → `light` (Update State + localStorage + HTML Class).
   - `light` → `dark` (Update State + localStorage + HTML Class).

3. **System Change Listener** (Active only if no manual override):
   - System Dark → UI Dark.
   - System Light → UI Light.
