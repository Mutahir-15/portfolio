# Quickstart: S-5 / Base Layout

## Integration Scenarios

### 1. Wrapping a New Page Section
All new page sections (Hero, About, etc.) MUST be wrapped in `PageWrapper` to ensure consistent alignment.

```tsx
import { PageWrapper } from '@/components/layout';

export default function MySection() {
  return (
    <PageWrapper className="py-20">
      <h2>Section Title</h2>
      <p>Content goes here...</p>
    </PageWrapper>
  );
}
```

### 2. Adding a Navigation Link
To add a new link to the `Navbar`, update the `Links` array in `navbar.tsx`.

```tsx
const navLinks = [
  { label: '[about]', href: '#about' },
  // ... existing links
  { label: '[new]', href: '#new' },
];
```

### 3. Theme Toggle Usage
The `ThemeToggle` is already integrated into the `Navbar`. To use it elsewhere:

```tsx
import { ThemeToggle } from '@/components/layout';

// Render where needed
<ThemeToggle />
```

## Troubleshooting

- **Navbar not hiding**: Ensure the page height is greater than the viewport height (scrolling is possible).
- **Navbar covering content**: Verify `<main>` in `app/layout.tsx` has `pt-16`.
- **Theme not applying**: Check if `ThemeProvider` is correctly wrapping the components in `layout.tsx`.
