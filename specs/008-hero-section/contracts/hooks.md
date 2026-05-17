# Local Contracts: Hero Section (S-8)

## Hooks

### `useTypewriter`
**Path**: `frontend/hooks/use-typewriter.ts`

```typescript
export function useTypewriter(options: {
  strings: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
}): {
  displayText: string;
  isTyping: boolean;
  isDeleting: boolean;
  currentIndex: number;
}
```

### `useReducedMotion`
**Path**: `frontend/hooks/use-reduced-motion.ts` (Existing)

```typescript
export function useReducedMotion(): boolean;
```

## Component Props

### `HeroSection`
**Path**: `frontend/components/sections/hero-section.tsx`

```typescript
export default function HeroSection(): JSX.Element;
```
