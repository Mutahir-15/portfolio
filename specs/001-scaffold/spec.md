# Feature Specification: S-1 / Folder Scaffold

**Feature Branch**: `foundation/folder-scaffold`  
**Created**: 2026-04-29  
**Status**: Draft  
**Input**: User description for folder scaffold

## Objective

Create the complete folder structure for the portfolio project.
Every file is an empty shell with the correct export signature only —
no implementation, no logic, no styles yet.
This spec is purely structural. Subsequent specs will fill each file.

## Root Structure

Create a monorepo root with two top-level directories:

```text
portfolio/
├── frontend/     ← Next.js 15 App Router (TypeScript)
├── backend/      ← Python FastAPI
└── .github/
    └── workflows/
        ├── frontend-ci.yml
        └── backend-ci.yml
```

## Frontend Structure

```text
frontend/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── favicon.ico
│
├── components/
│   ├── ui/
│   │   ├── terminal-window.tsx
│   │   ├── terminal-loader.tsx
│   │   ├── terminal-error.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   └── index.ts
│   │
│   ├── sections/
│   │   ├── hero-section.tsx
│   │   ├── about-section.tsx
│   │   ├── skills-section.tsx
│   │   ├── projects-section.tsx
│   │   ├── timeline-section.tsx
│   │   ├── certifications-section.tsx
│   │   ├── contact-section.tsx
│   │   └── index.ts
│   │
│   ├── layout/
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── theme-toggle.tsx
│   │   ├── page-wrapper.tsx
│   │   └── index.ts
│   │
│   └── ai/
│       ├── chatbot-widget.tsx
│       ├── contact-form.tsx
│       └── index.ts
│
├── hooks/
│   ├── use-typewriter.ts
│   ├── use-theme.ts
│   └── use-reduced-motion.ts
│
├── lib/
│   ├── api.ts
│   ├── env.ts
│   ├── github.ts
│   └── utils.ts
│
├── types/
│   ├── index.ts
│   └── github.ts
│
├── data/
│   └── project-summaries.json
│
├── public/
│   └── fonts/           ← empty
│
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
├── .env.local.example
└── .eslintrc.json
```

## Backend Structure

```text
backend/
├── main.py
├── routers/
│   ├── __init__.py
│   ├── chat_router.py
│   ├── contact_router.py
│   └── projects_router.py
│
├── agents/
│   ├── __init__.py
│   ├── chat_agent.py
│   ├── summary_agent.py
│   └── contact_agent.py
│
├── models/
│   ├── __init__.py
│   ├── chat_models.py
│   └── contact_models.py
│
├── lib/
│   ├── __init__.py
│   ├── gemini_client.py
│   ├── config.py
│   ├── prompts.py
│   └── rate_limiter.py
│
├── requirements.txt
├── .env.example
└── README.md
```

## Shell File Rules

### TypeScript shells
Every .tsx/.ts file must export only:
- A named export of the correct type (component, hook, or function)
- A TODO comment indicating what the file will implement
- No imports except what is needed for the type signature

### Python shells
Every .py file must contain:
- Module docstring describing what the file will implement
- Correct imports needed for type signatures only
- Empty function/class stubs with pass and a TODO comment

### Config file shells
Detailed shells for configuration files (tailwind.config.ts, next.config.ts, tsconfig.json, globals.css, project-summaries.json, .env.local.example, backend/.env.example, requirements.txt) are defined in the user prompt.

## Acceptance Criteria

- [x] All folders exist at the correct paths
- [x] All .tsx/.ts files export the correct named/default export
- [x] All .py files have a docstring and at least one stub
- [x] All barrel index.ts files export every sibling component
- [x] tsconfig.json has strict: true and alias mapped to ./*
- [x] tailwind.config.ts has darkMode: 'class'
- [x] globals.css has only the three @tailwind directives
- [x] Both .env example files exist with the correct variable names
- [x] requirements.txt lists all 11 packages with minimum versions
- [x] Running tsc --noEmit from /frontend returns zero errors
