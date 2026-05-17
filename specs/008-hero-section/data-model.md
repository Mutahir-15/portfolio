# Data Model: Hero Section (S-8)

## Interfaces

### `UseTypewriterOptions`
Defines the configuration for the `useTypewriter` hook.

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| `strings` | `string[]` | Array of strings to cycle through | `[]` |
| `typeSpeed` | `number` | Delay in ms per character typed | `80` |
| `deleteSpeed` | `number` | Delay in ms per character deleted | `40` |
| `pauseDuration` | `number` | Delay in ms to pause at a full string | `2000` |
| `loop` | `boolean` | Whether to restart after the last string | `true` |

### `UseTypewriterReturn`
The state returned by the `useTypewriter` hook.

| Field | Type | Description |
|-------|------|-------------|
| `displayText` | `string` | The current text to display |
| `isTyping` | `boolean` | True if currently typing forward |
| `isDeleting` | `boolean` | True if currently deleting characters |
| `currentIndex` | `number` | The index of the current string in the array |

## State Machine Transitions

| Current State | Condition | Next State | Action |
|---------------|-----------|------------|--------|
| `TYPING` | `displayText === strings[currentIndex]` | `PAUSING` | Wait `pauseDuration` |
| `PAUSING` | Timeout complete | `DELETING` | Start deleting |
| `DELETING` | `displayText === ""` | `TYPING` | Increment `currentIndex`, next string |
