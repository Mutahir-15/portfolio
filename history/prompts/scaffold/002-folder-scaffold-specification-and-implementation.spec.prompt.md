---
id: 002
title: Folder Scaffold Specification and Implementation
stage: spec
date: 2026-04-30
surface: agent
model: Gemini 2.0 Flash
feature: scaffold
branch: foundation/folder-scaffold
user: ADMINS
command: /sp.specify
labels: ["scaffold", "foundation", "nextjs", "fastapi"]
links:
  spec: specs/scaffold/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/scaffold/spec.md
 - frontend/app/layout.tsx
 - frontend/app/page.tsx
 - frontend/components/ui/terminal-window.tsx
 - frontend/components/ui/terminal-loader.tsx
 - frontend/components/ui/terminal-error.tsx
 - frontend/components/ui/badge.tsx
 - frontend/components/ui/button.tsx
 - frontend/components/ui/index.ts
 - frontend/components/sections/hero-section.tsx
 - frontend/components/sections/about-section.tsx
 - frontend/components/sections/skills-section.tsx
 - frontend/components/sections/projects-section.tsx
 - frontend/components/sections/timeline-section.tsx
 - frontend/components/sections/certifications-section.tsx
 - frontend/components/sections/contact-section.tsx
 - frontend/components/sections/index.ts
 - frontend/components/layout/navbar.tsx
 - frontend/components/layout/footer.tsx
 - frontend/components/layout/theme-toggle.tsx
 - frontend/components/layout/page-wrapper.tsx
 - frontend/components/layout/index.ts
 - frontend/components/ai/chatbot-widget.tsx
 - frontend/components/ai/contact-form.tsx
 - frontend/components/ai/index.ts
 - frontend/hooks/use-typewriter.ts
 - frontend/hooks/use-theme.ts
 - frontend/hooks/use-reduced-motion.ts
 - frontend/lib/api.ts
 - frontend/lib/env.ts
 - frontend/lib/github.ts
 - frontend/lib/utils.ts
 - frontend/types/index.ts
 - frontend/types/github.ts
 - backend/main.py
 - backend/routers/__init__.py
 - backend/routers/chat_router.py
 - backend/routers/contact_router.py
 - backend/routers/projects_router.py
 - backend/agents/__init__.py
 - backend/agents/chat_agent.py
 - backend/agents/summary_agent.py
 - backend/agents/contact_agent.py
 - backend/models/__init__.py
 - backend/models/chat_models.py
 - backend/models/contact_models.py
 - backend/lib/__init__.py
 - backend/lib/gemini_client.py
 - backend/lib/config.py
 - backend/lib/prompts.py
 - backend/lib/rate_limiter.py
 - frontend/globals.css
 - frontend/data/project-summaries.json
 - frontend/tailwind.config.ts
 - frontend/next.config.ts
 - frontend/tsconfig.json
 - frontend/.env.local.example
 - backend/.env.example
 - backend/requirements.txt
 - .github/workflows/frontend-ci.yml
 - .github/workflows/backend-ci.yml
tests:
 - none
---

## Prompt

/sp.specifyProject:    Mutahir Bin Athar — Personal Portfolio
Spec:       S-1 / Folder Scaffold
Phase:      1 — Foundation
Stack:      Next.js 15 (TypeScript, App Router) + Python FastAPI backend

---

## OBJECTIVE

Create the complete folder structure for the portfolio project.
Every file is an empty shell with the correct export signature only —
no implementation, no logic, no styles yet.
This spec is purely structural. Subsequent specs will fill each file.

---

## ROOT STRUCTURE

Create a monorepo root with two top-level directories:

portfolio/
├── frontend/     ← Next.js 15 App Router (TypeScript)
├── backend/      ← Python FastAPI
└── .github/
    └── workflows/
        ├── frontend-ci.yml
        └── backend-ci.yml

---

## FRONTEND STRUCTURE

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
│   └── fonts/           ← empty, fonts loaded via next/font
│
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
├── .env.local.example
└── .eslintrc.json

---

## BACKEND STRUCTURE

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

---

## SHELL FILE RULES

### TypeScript shells
Every .tsx/.ts file must export only:
- A named export of the correct type (component, hook, or function)
- A TODO comment indicating what the file will implement
- No imports except what is needed for the type signature

Example for a component shell:
  // TODO: Implement HeroSection
  export default function HeroSection() {
    return null
  }

Example for a hook shell:
  // TODO: Implement useTypewriter hook
  export function useTypewriter() {}

Example for a barrel (index.ts):
  export { default as TerminalWindow } from './terminal-window'
  export { default as TerminalLoader } from './terminal-loader'
  export { default as TerminalError } from './terminal-error'
  export { default as Badge } from './badge'
  export { default as Button } from './button'

### Python shells
Every .py file must contain:
- Module docstring describing what the file will implement
- Correct imports needed for type signatures only
- Empty function/class stubs with pass and a TODO comment

Example for a router shell:
  """Chat router — POST /api/chat endpoint."""
  from fastapi import APIRouter
  router = APIRouter()
  # TODO: Implement chat endpoint

Example for an agent shell:
  """Chat agent — portfolio chatbot powered by OpenAI Agents SDK."""
  # TODO: Implement ChatAgent using OpenAI Agents SDK + Gemini 2.5 Flash

### Config file shells

tailwind.config.ts:
  import type { Config } from 'tailwindcss'
  const config: Config = {
    content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
    darkMode: 'class',
    theme: { extend: {} },
    plugins: [],
  }
  export default config

next.config.ts:
  import type { NextConfig } from 'next'
  const nextConfig: NextConfig = {}
  export default nextConfig

tsconfig.json:
  Strict mode enabled. Path alias @mapped to ./*
  {
    "compilerOptions": {
      "strict": true,
      "baseUrl": ".",
      "paths": { " @/*": ["./*"] }
    }
  }

globals.css:
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

project-summaries.json:
  []

.env.local.example:
  NEXT_PUBLIC_API_URL=http://localhost:8000

backend/.env.example:
  GEMINI_API_KEY=your_gemini_api_key_here
  RESEND_API_KEY=your_resend_api_key_here
  ALLOWED_ORIGINS=http://localhost:3000

requirements.txt:
  fastapi>=0.115.0
  uvicorn[standard]>=0.30.0
  openai-agents>=0.0.10
  pydantic>=2.7.0
  pydantic-settings>=2.3.0
  slowapi>=0.1.9
  resend>=2.0.0
  python-dotenv>=1.0.0
  httpx>=0.27.0
  ruff>=0.4.0
  pytest>=8.0.0

---

## ACCEPTANCE CRITERIA

- [x] All folders exist at the correct paths
- [x] All .tsx/.ts files export the correct named/default export
- [x] All .py files have a docstring and at least one stub
- [x] All barrel index.ts files export every sibling component
- [x] tsconfig.json has strict: true and @ alias
- [x] tailwind.config.ts has darkMode: 'class'
- [x] globals.css has only the three @tailwind directives
- [x] Both .env example files exist with the correct variable names
- [x] requirements.txt lists all 11 packages with minimum versions
- [x] Running tsc --noEmit from /frontend returns zero errors

## Response snapshot

Created the folder scaffold for the Mutahir Bin Athar Portfolio project. Saved the specification to 'specs/scaffold/spec.md' and implemented the complete directory structure and 60+ shell files across the frontend (Next.js 15) and backend (FastAPI), following strict export and stubbing rules.

## Outcome

- ✅ Impact: Complete project structural foundation established.
- 🧪 Tests: none (structural setup)
- 📁 Files: 60+ shell files and 19 directories created.
- 🔁 Next prompts: Phase 2 implementation of core components.
- 🧠 Reflection: Monorepo structure is now live and ready for logic.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): n/a
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
