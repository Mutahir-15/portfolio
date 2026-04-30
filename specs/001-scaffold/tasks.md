# Tasks: S-1 / Folder Scaffold

**Input**: Design documents from `/specs/001-scaffold/`
**Prerequisites**: plan.md (required), spec.md (required)

**Organization**: Tasks are grouped by implementation phases defined in the plan to ensure correct dependency ordering (configs -> components -> barrels).

## Format: `[ID] [P?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)

---

## Phase 1: Setup (Root & Configs)

**Purpose**: Monorepo initialization and core frontend configurations.

- [X] T001 Create project root directories (frontend, backend, .github/workflows)
- [X] T002 [P] Create frontend/package.json
  TASK-002: Create package.json
  File: frontend/package.json
  Shell: { "name": "portfolio-frontend", "version": "0.1.0", "private": true }
  Done: File exists
- [X] T003 [P] Create frontend/tsconfig.json
  TASK-003: Create tsconfig.json
  File: frontend/tsconfig.json
  Shell: { "compilerOptions": { "strict": true, "baseUrl": ".", "paths": { "@/*": ["./*"] } } }
  Done: tsc recognizes strict mode and alias
- [X] T004 [P] Create frontend/tailwind.config.ts
  TASK-004: Create tailwind.config.ts
  File: frontend/tailwind.config.ts
  Shell: import type { Config } from 'tailwindcss'; const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], darkMode: 'class', theme: { extend: {} }, plugins: [], }; export default config
  Done: File exists with darkMode class
- [X] T005 [P] Create frontend/next.config.ts
  TASK-005: Create next.config.ts
  File: frontend/next.config.ts
  Shell: import type { NextConfig } from 'next'; const nextConfig: NextConfig = {}; export default nextConfig
  Done: File exists
- [X] T006 [P] Create frontend/.env.local.example
  TASK-006: Create .env.local.example
  File: frontend/.env.local.example
  Shell: NEXT_PUBLIC_API_URL=http://localhost:8000
  Done: File exists
- [X] T007 [P] Create frontend/.eslintrc.json
  TASK-007: Create .eslintrc.json
  File: frontend/.eslintrc.json
  Shell: { "extends": "next/core-web-vitals" }
  Done: File exists
- [X] T008 [P] Create frontend/globals.css
  TASK-008: Create globals.css
  File: frontend/globals.css
  Shell: @tailwind base; @tailwind components; @tailwind utilities;
  Done: File contains 3 tailwind directives

---

## Phase 2: Foundational (App & UI Shells)

**Purpose**: Core application shell and atomic UI components.

- [X] T009 Create frontend/app/favicon.ico
- [X] T010 Create frontend/app/layout.tsx
  TASK-010: Create layout.tsx
  File: frontend/app/layout.tsx
  Shell: // TODO: Implement RootLayout\nexport default function RootLayout({ children }: { children: React.ReactNode }) { return null }
  Done: Export signature exists
- [X] T011 Create frontend/app/page.tsx
  TASK-011: Create page.tsx
  File: frontend/app/page.tsx
  Shell: // TODO: Implement Home page\nexport default function Home() { return null }
  Done: Export signature exists
- [X] T012 [P] Create frontend/components/ui/terminal-window.tsx
  TASK-012: Create terminal-window.tsx
  File: frontend/components/ui/terminal-window.tsx
  Shell: // TODO: Implement TerminalWindow\nexport default function TerminalWindow() { return null }
  Done: Export signature exists
- [X] T013 [P] Create frontend/components/ui/terminal-loader.tsx
  TASK-013: Create terminal-loader.tsx
  File: frontend/components/ui/terminal-loader.tsx
  Shell: // TODO: Implement TerminalLoader\nexport default function TerminalLoader() { return null }
  Done: Export signature exists
- [X] T014 [P] Create frontend/components/ui/terminal-error.tsx
  TASK-014: Create terminal-error.tsx
  File: frontend/components/ui/terminal-error.tsx
  Shell: // TODO: Implement TerminalError\nexport default function TerminalError() { return null }
  Done: Export signature exists
- [X] T015 [P] Create frontend/components/ui/badge.tsx
  TASK-015: Create badge.tsx
  File: frontend/components/ui/badge.tsx
  Shell: // TODO: Implement Badge\nexport default function Badge() { return null }
  Done: Export signature exists
- [X] T016 [P] Create frontend/components/ui/button.tsx
  TASK-016: Create button.tsx
  File: frontend/components/ui/button.tsx
  Shell: // TODO: Implement Button\nexport default function Button() { return null }
  Done: Export signature exists

---

## Phase 3: Section Shells

**Purpose**: Organize the main page organisms.

- [X] T017 [P] Create frontend/components/sections/hero-section.tsx
  TASK-017: Create hero-section.tsx
  File: frontend/components/sections/hero-section.tsx
  Shell: // TODO: Implement HeroSection\nexport default function HeroSection() { return null }
  Done: Export signature exists
- [X] T018 [P] Create frontend/components/sections/about-section.tsx
  TASK-018: Create about-section.tsx
  File: frontend/components/sections/about-section.tsx
  Shell: // TODO: Implement AboutSection\nexport default function AboutSection() { return null }
  Done: Export signature exists
- [X] T019 [P] Create frontend/components/sections/skills-section.tsx
  TASK-019: Create skills-section.tsx
  File: frontend/components/sections/skills-section.tsx
  Shell: // TODO: Implement SkillsSection\nexport default function SkillsSection() { return null }
  Done: Export signature exists
- [X] T020 [P] Create frontend/components/sections/projects-section.tsx
  TASK-020: Create projects-section.tsx
  File: frontend/components/sections/projects-section.tsx
  Shell: // TODO: Implement ProjectsSection\nexport default function ProjectsSection() { return null }
  Done: Export signature exists
- [X] T021 [P] Create frontend/components/sections/timeline-section.tsx
  TASK-021: Create timeline-section.tsx
  File: frontend/components/sections/timeline-section.tsx
  Shell: // TODO: Implement TimelineSection\nexport default function TimelineSection() { return null }
  Done: Export signature exists
- [X] T022 [P] Create frontend/components/sections/certifications-section.tsx
  TASK-022: Create certifications-section.tsx
  File: frontend/components/sections/certifications-section.tsx
  Shell: // TODO: Implement CertificationsSection\nexport default function CertificationsSection() { return null }
  Done: Export signature exists
- [X] T023 [P] Create frontend/components/sections/contact-section.tsx
  TASK-023: Create contact-section.tsx
  File: frontend/components/sections/contact-section.tsx
  Shell: // TODO: Implement ContactSection\nexport default function ContactSection() { return null }
  Done: Export signature exists

---

## Phase 4: Layout & AI Shells

**Purpose**: Page templates and AI interaction components.

- [X] T024 [P] Create frontend/components/layout/navbar.tsx
  TASK-024: Create navbar.tsx
  File: frontend/components/layout/navbar.tsx
  Shell: // TODO: Implement Navbar\nexport default function Navbar() { return null }
  Done: Export signature exists
- [X] T025 [P] Create frontend/components/layout/footer.tsx
  TASK-025: Create footer.tsx
  File: frontend/components/layout/footer.tsx
  Shell: // TODO: Implement Footer\nexport default function Footer() { return null }
  Done: Export signature exists
- [X] T026 [P] Create frontend/components/layout/theme-toggle.tsx
  TASK-026: Create theme-toggle.tsx
  File: frontend/components/layout/theme-toggle.tsx
  Shell: // TODO: Implement ThemeToggle\nexport default function ThemeToggle() { return null }
  Done: Export signature exists
- [X] T027 [P] Create frontend/components/layout/page-wrapper.tsx
  TASK-027: Create page-wrapper.tsx
  File: frontend/components/layout/page-wrapper.tsx
  Shell: // TODO: Implement PageWrapper\nexport default function PageWrapper({ children }: { children: React.ReactNode }) { return null }
  Done: Export signature exists
- [X] T028 [P] Create frontend/components/ai/chatbot-widget.tsx
  TASK-028: Create chatbot-widget.tsx
  File: frontend/components/ai/chatbot-widget.tsx
  Shell: // TODO: Implement ChatbotWidget\nexport default function ChatbotWidget() { return null }
  Done: Export signature exists
- [X] T029 [P] Create frontend/components/ai/contact-form.tsx
  TASK-029: Create contact-form.tsx
  File: frontend/components/ai/contact-form.tsx
  Shell: // TODO: Implement ContactForm\nexport default function ContactForm() { return null }
  Done: Export signature exists

---

## Phase 5: Hooks, Lib, Types & Data

**Purpose**: Shared logic, utilities, and typing.

- [X] T030 [P] Create frontend/hooks/use-typewriter.ts
  TASK-030: Create use-typewriter.ts
  File: frontend/hooks/use-typewriter.ts
  Shell: // TODO: Implement useTypewriter hook\nexport function useTypewriter() {}
  Done: Export signature exists
- [X] T031 [P] Create frontend/hooks/use-theme.ts
  TASK-031: Create use-theme.ts
  File: frontend/hooks/use-theme.ts
  Shell: // TODO: Implement useTheme hook\nexport function useTheme() {}
  Done: Export signature exists
- [X] T032 [P] Create frontend/hooks/use-reduced-motion.ts
  TASK-032: Create use-reduced-motion.ts
  File: frontend/hooks/use-reduced-motion.ts
  Shell: // TODO: Implement useReducedMotion hook\nexport function useReducedMotion() {}
  Done: Export signature exists
- [X] T033 [P] Create frontend/lib/api.ts
  TASK-033: Create api.ts
  File: frontend/lib/api.ts
  Shell: // TODO: Implement api utilities\nexport const api = {}
  Done: Export signature exists
- [X] T034 [P] Create frontend/lib/env.ts
  TASK-034: Create env.ts
  File: frontend/lib/env.ts
  Shell: // TODO: Implement env validation\nexport const env = {}
  Done: Export signature exists
- [X] T035 [P] Create frontend/lib/github.ts
  TASK-035: Create github.ts
  File: frontend/lib/github.ts
  Shell: // TODO: Implement github client\nexport const github = {}
  Done: Export signature exists
- [X] T036 [P] Create frontend/lib/utils.ts
  TASK-036: Create utils.ts
  File: frontend/lib/utils.ts
  Shell: // TODO: Implement shared utils\nexport const utils = {}
  Done: Export signature exists
- [X] T037 [P] Create frontend/types/index.ts
  TASK-037: Create index.ts (types)
  File: frontend/types/index.ts
  Shell: // TODO: Implement shared types\nexport {}
  Done: Export signature exists
- [X] T038 [P] Create frontend/types/github.ts
  TASK-038: Create github.ts (types)
  File: frontend/types/github.ts
  Shell: // TODO: Implement GitHub API types\nexport interface GithubRepo {}
  Done: Export signature exists
- [X] T039 [P] Create frontend/data/project-summaries.json
  TASK-039: Create project-summaries.json
  File: frontend/data/project-summaries.json
  Shell: []
  Done: File exists and is empty array

---

## Phase 6: Barrel Exports

**Purpose**: Clean imports via index.ts files.

- [X] T040 Create frontend/components/ui/index.ts
  TASK-040: Create ui index.ts
  File: frontend/components/ui/index.ts
  Shell: export { default as TerminalWindow } from './terminal-window';\nexport { default as TerminalLoader } from './terminal-loader';\nexport { default as TerminalError } from './terminal-error';\nexport { default as Badge } from './badge';\nexport { default as Button } from './button';
  Done: All siblings exported
- [X] T041 Create frontend/components/sections/index.ts
  TASK-041: Create sections index.ts
  File: frontend/components/sections/index.ts
  Shell: export { default as HeroSection } from './hero-section';\nexport { default as AboutSection } from './about-section';\nexport { default as SkillsSection } from './skills-section';\nexport { default as ProjectsSection } from './projects-section';\nexport { default as TimelineSection } from './timeline-section';\nexport { default as CertificationsSection } from './certifications-section';\nexport { default as ContactSection } from './contact-section';
  Done: All siblings exported
- [X] T042 Create frontend/components/layout/index.ts
  TASK-042: Create layout index.ts
  File: frontend/components/layout/index.ts
  Shell: export { default as Navbar } from './navbar';\nexport { default as Footer } from './footer';\nexport { default as ThemeToggle } from './theme-toggle';\nexport { default as PageWrapper } from './page-wrapper';
  Done: All siblings exported
- [X] T043 Create frontend/components/ai/index.ts
  TASK-043: Create ai index.ts
  File: frontend/components/ai/index.ts
  Shell: export { default as ChatbotWidget } from './chatbot-widget';\nexport { default as ContactForm } from './contact-form';
  Done: All siblings exported

---

## Phase 7: Backend Structure

**Purpose**: Python FastAPI architecture.

- [X] T044 Create backend/main.py
  TASK-044: Create main.py
  File: backend/main.py
  Shell: \"\"\"Main entry point for FastAPI.\"\"\"\nfrom fastapi import FastAPI\napp = FastAPI()\n# TODO: Implement main app
  Done: FastAPI instance created
- [X] T045 Create backend/requirements.txt
  TASK-045: Create requirements.txt
  File: backend/requirements.txt
  Shell: fastapi>=0.115.0\nuvicorn[standard]>=0.30.0\nopenai-agents>=0.0.10\npydantic>=2.7.0\npydantic-settings>=2.3.0\nslowapi>=0.1.9\nresend>=2.0.0\npython-dotenv>=1.0.0\nhttpx>=0.27.0\nruff>=0.4.0\npytest>=8.0.0
  Done: 11 packages listed
- [X] T046 Create backend/.env.example
  TASK-046: Create .env.example
  File: backend/.env.example
  Shell: GEMINI_API_KEY=your_gemini_api_key_here\nRESEND_API_KEY=your_resend_api_key_here\nALLOWED_ORIGINS=http://localhost:3000
  Done: File exists
- [X] T047 Create backend/README.md
- [X] T048 [P] Create backend/routers/__init__.py
- [X] T049 [P] Create backend/routers/chat_router.py
  TASK-049: Create chat_router.py
  File: backend/routers/chat_router.py
  Shell: \"\"\"Chat router — POST /api/chat endpoint.\"\"\"\nfrom fastapi import APIRouter\nrouter = APIRouter()\n# TODO: Implement chat endpoint
  Done: APIRouter instance created
- [X] T050 [P] Create backend/routers/contact_router.py
- [X] T051 [P] Create backend/routers/projects_router.py
- [X] T052 [P] Create backend/agents/__init__.py
- [X] T053 [P] Create backend/agents/chat_agent.py
  TASK-053: Create chat_agent.py
  File: backend/agents/chat_agent.py
  Shell: \"\"\"Chat agent — portfolio chatbot powered by OpenAI Agents SDK.\"\"\"\n# TODO: Implement ChatAgent using OpenAI Agents SDK + Gemini 2.5 Flash
  Done: Docstring exists
- [X] T054 [P] Create backend/agents/summary_agent.py
- [X] T055 [P] Create backend/agents/contact_agent.py
- [X] T056 [P] Create backend/models/__init__.py
- [X] T057 [P] Create backend/models/chat_models.py
- [X] T058 [P] Create backend/models/contact_models.py
- [X] T059 [P] Create backend/lib/__init__.py
- [X] T060 [P] Create backend/lib/gemini_client.py
- [X] T061 [P] Create backend/lib/config.py
- [X] T062 [P] Create backend/lib/prompts.py
- [X] T063 [P] Create backend/lib/rate_limiter.py

---

## Phase 8: CI Workflow Shells

- [X] T064 [P] Create .github/workflows/frontend-ci.yml
- [X] T065 [P] Create .github/workflows/backend-ci.yml

---

## Phase 9: Verification

- [X] T066 [P] Verify folder structure existence
- [X] T067 Verify frontend build health
  TASK-FINAL: Verify S-1 scaffold integrity
  Run: cd frontend && tsc --noEmit
  Run: find . -name \"index.ts\" -exec cat {} \;
  Done: tsc returns 0 errors, all barrels export correct names

---

## Dependencies & Execution Order

- **Phases 1-6** (Frontend) must be sequential.
- **Phase 7** (Backend) can run in parallel with Frontend phases.
- **Phase 9** (Verification) must run after all other phases.
