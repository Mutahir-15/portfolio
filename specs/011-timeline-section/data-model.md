# Data Model: S-11 / Timeline Section

## Interfaces

### TimelineEvent
The authoritative data structure for each quarter in the timeline.

```typescript
interface TimelineEvent {
  quarter: string;
  period: string;
  title: string;
  status: 'completed' | 'active';
  description: string;
  skills: string[];
  highlights: string[];
  variant: 'green' | 'cyan';
}
```

## Component State

### expandedIndex
Tracks which timeline card is currently expanded.

- **Type**: `number | null`
- **Default**: `null` (all collapsed)
- **Rules**: 
  - Clicking a collapsed card sets `expandedIndex` to its index.
  - Clicking an expanded card sets `expandedIndex` to `null`.
  - Only one index can be stored at a time.

## State Transitions

| Trigger | Current State | Action | Next State |
|---------|---------------|--------|------------|
| Click Card A | `null` | `setExpandedIndex(A)` | `A` |
| Click Card A | `A` | `setExpandedIndex(null)` | `null` |
| Click Card B | `A` | `setExpandedIndex(B)` | `B` |
| Scroll into View | N/A | Trigger Entry Animation | N/A |
