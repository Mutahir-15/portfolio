# Data Model: About Section (S-9)

## Component Props

### TerminalWindowProps
```typescript
interface TerminalWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  showDots?: boolean; // default: true
  animate?: boolean; // default: true
}
```

### InfoCard Data
```typescript
interface InfoItem {
  label: string;
  value: string;
  subValue?: string;
  icon?: LucideIcon;
}
```

## Section Content
- **Greeting Strings**:
  - English: "Hello, World! 👋"
  - Arabic: "Marhaba! مرحبا 👋"
  - Urdu: "Assalam o Alaikum! 🌙"
- **Bio**: Narrative about Mutahir's background, GIAIC status, and passion for SDD.
- **Focus**: "Currently focused on: AIDD"
- **Location**: "Based in: Karachi, Pakistan"
