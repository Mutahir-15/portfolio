# Data Model: Skills Section (S-10)

## Entities

### Skill
Represents a single technology or tool.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| label | string | Display name of the skill | Required, unique within category |
| variant | enum | 'green' \| 'cyan' \| 'muted' | Required |

### SkillCategory
Represents a group of related skills.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| name | string | Category display name | Required |
| icon | string | Unicode terminal prefix icon | Required |
| skills | Skill[] | List of skills in this category | Min 1 skill |

## Data Structure (Frontend)

Defined as a constant `skillCategories` in `frontend/components/sections/skills-section.tsx`.

```typescript
interface Skill {
  label: string;
  variant: 'green' | 'cyan' | 'muted';
}

interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  // ... data from spec
] as const;
```
