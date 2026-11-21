# BuddyStudy — Antigravity Master Build Prompt
## AI-Powered Student Learning Assistant | Hackathon Project

> **How to use:** Open your project in Google Antigravity, provide this entire file as the primary build specification, and ask the agent to execute it in phases. The agent must inspect the existing repository before changing anything. If the repository is empty, scaffold the project using the stack below. Do not merely describe a plan—implement, run, test, and verify the application.

---

# 1. Product vision

Build **BuddyStudy**, a polished, responsive, AI-powered learning platform that helps students understand difficult academic concepts and follow a personalized learning journey from beginner to advanced.

## Problem statement

Students often struggle to understand complex academic topics and find learning resources that match their understanding levels. BuddyStudy must simplify difficult concepts, improve understanding, and make learning more effective through AI-powered assistance.

## Product promise

**“Your goals. Your level. Your learning path.”**

BuddyStudy is not just an AI chat interface or a course directory. It is a personal learning ecosystem that:

1. Understands a student's target domain and current knowledge.
2. Diagnoses strengths, weaknesses, and prerequisite gaps.
3. Builds a logical, dependency-aware skill roadmap.
4. Explains difficult concepts at the student's level.
5. Reinforces learning with quizzes, practice, revision, and projects.
6. Builds motivation through achievable milestones and transparent progress.

Every major feature must support the stated education problem. Avoid unrelated features that dilute the product.

---

# 2. Product principles

- **Learning before decoration:** every interface should help a student understand, practise, plan, or measure learning.
- **Personalization with evidence:** adapt to assessment results and demonstrated mastery, not arbitrary AI guesses.
- **Prerequisite correctness:** never recommend an advanced skill before its required foundations are completed or explicitly assessed as mastered.
- **Explainability:** show why a skill is recommended and what it unlocks.
- **Motivation without manipulation:** use realistic goals, progress feedback, and encouraging language. Avoid shame, punitive streak loss, or addictive engagement patterns.
- **Accessible by default:** keyboard navigation, semantic HTML, visible focus, sufficient contrast, and screen-reader-friendly status updates.
- **Secure by design:** validate inputs, protect user data, and keep secrets on the server.
- **Honest AI:** label generated content, communicate uncertainty, and never fabricate citations, course links, credentials, or learning outcomes.
- **Fast and reliable:** minimize unnecessary requests, use loading and error states, and keep the core experience useful even if the AI provider is unavailable.

---

# 3. Target users and primary journeys

## Target users

- School, college, and university students.
- Self-learners exploring a new technical or academic domain.
- Students who know their goal but do not know what to learn first.
- Students who need difficult concepts explained at an appropriate level.

## Primary journey A — Start learning

1. Student lands on the BuddyStudy homepage.
2. Student creates an account or enters a clearly labelled demo mode.
3. Student selects a learning goal, domain, current level, available study time, and target timeline.
4. Student takes a short diagnostic assessment.
5. BuddyStudy generates a roadmap based on the skill graph and assessment results.
6. Student reviews the roadmap, understands why the first skill matters, and begins the first lesson.
7. Student practises, receives feedback, and updates mastery.
8. Roadmap progress and the next recommended action update.

## Primary journey B — Understand a difficult topic

1. Student opens the AI Learning Companion.
2. Student enters a topic or question and optionally chooses their level.
3. BuddyStudy explains it in simple language, with a relevant analogy and worked example.
4. Student can ask for a simpler explanation, a deeper explanation, an example, or a short quiz.
5. BuddyStudy checks understanding and suggests the next useful step.

## Primary journey C — Change or advance a goal

1. Student chooses a new specialization or target.
2. BuddyStudy compares the new target with existing mastered skills.
3. The roadmap reuses relevant skills and identifies missing prerequisites.
4. Student sees what changed and why.

---

# 4. Feature requirements

## 4.1 Landing page

Create a strong first impression with:

- BuddyStudy logo/wordmark and clear navigation.
- Hero headline: **“Stop guessing what to learn next.”**
- Supporting copy explaining personalized, prerequisite-aware learning.
- Primary CTA: **Build my learning path**.
- Secondary CTA: **Explore how it works**.
- A visually compelling preview of a skill roadmap.
- Feature sections for AI explanations, adaptive roadmaps, practice, and progress.
- A short “How it works” section.
- Trust section explaining how learning recommendations are generated.
- Footer with privacy, terms, accessibility, and contact links.

Avoid generic template styling. The landing page must communicate the product's unique value within a few seconds.

## 4.2 Authentication and demo mode

- Provide sign-up, sign-in, sign-out, and protected dashboard routes if authentication is implemented.
- Validate all form fields.
- Use secure session handling through the chosen auth provider.
- Never store plaintext passwords.
- Provide a demo mode with clearly labelled sample data if backend credentials are unavailable.
- Never pretend demo data is a real student's saved progress.

## 4.3 Onboarding and learner profile

Collect only useful information:

- Learning goal / target specialization.
- Current experience level: beginner, intermediate, advanced, or unsure.
- Existing knowledge or skills.
- Weekly study availability.
- Preferred learning style (optional).
- Target date or duration (optional).

Do not make onboarding unnecessarily long. Allow students to skip optional fields and edit preferences later.

## 4.4 Diagnostic assessment

- Generate a short, level-appropriate assessment for the chosen domain.
- Questions should test prerequisite knowledge and conceptual understanding.
- Support multiple-choice and short-answer questions where feasible.
- Give explanations after answers, not just right/wrong labels.
- Calculate a transparent skill-level estimate.
- Mark uncertain mastery as “needs review” rather than assuming competence.
- Allow retakes and show improvement over time.
- Do not use a single quiz score as a definitive measure of intelligence or ability.

## 4.5 AI Skill Dependency Graph — signature feature

This is the core differentiator and must be implemented as a real data-driven feature, not a decorative diagram.

### Graph model

Represent each skill as a node with fields such as:

- `id`
- `name`
- `description`
- `domain`
- `level` (beginner, intermediate, advanced)
- `estimatedHours`
- `learningObjectives`
- `resources`
- `assessmentId` (optional)
- `projectId` (optional)

Represent prerequisite relationships as directed edges:

- `fromSkillId`
- `toSkillId`
- `relationship` (prerequisite)
- `isRequired`
- `reason`

An edge from A to B means **A must be mastered before B**.

### Example: Machine Learning path

A possible curated dependency structure:

- Programming foundations → Python fundamentals.
- Python fundamentals → Data structures and algorithms (selected topics).
- Algebra and functions → Calculus foundations (where relevant).
- Algebra and functions → Linear algebra.
- Probability foundations → Statistics.
- Python fundamentals + Statistics + Linear algebra → Data analysis and preprocessing.
- Data analysis and preprocessing → Supervised learning.
- Supervised learning → Model evaluation and validation.
- Supervised learning + model evaluation → Unsupervised learning and advanced ML topics.
- Relevant ML foundations → Capstone project.

Do not force every learner through every branch. Some prerequisites may be alternatives or domain-specific. Encode these rules explicitly.

### Personalization algorithm

Implement a deterministic and testable roadmap engine:

1. Load the curated skill graph for the selected target domain.
2. Load the learner's existing skills and mastery evidence.
3. Validate the graph and detect cycles.
4. Identify all prerequisite ancestors of the target skills.
5. Mark skills as:
   - mastered,
   - in progress,
   - available now,
   - locked by prerequisites,
   - needs review.
6. Treat a skill as mastered only when it meets a configurable mastery threshold supported by assessment or explicit verified evidence.
7. Use a topological sort to produce a valid learning order.
8. Prioritize available skills based on relevance, learner level, estimated time, and the student's available study time.
9. Generate milestones and a realistic weekly schedule.
10. Recompute the roadmap when mastery evidence, target goals, or available time changes.

### Graph correctness requirements

- Use a well-tested topological sorting implementation (Kahn's algorithm or DFS-based topological sort).
- Detect cycles and return a useful validation error; never silently produce an invalid path.
- Handle missing nodes, duplicate edges, self-loops, disconnected nodes, optional prerequisites, and already-mastered skills.
- Preserve prerequisite ordering.
- Do not mark a skill available if a required prerequisite is incomplete.
- If multiple prerequisite branches exist, show them clearly.
- Provide a reason for every recommended next skill.
- Keep the graph engine independent from the UI and AI provider.
- Write unit tests for graph algorithms and edge cases.

### Graph interface

- Render an interactive, readable graph with nodes and directional connections.
- Use a graph visualization library only if it is compatible with the chosen stack and accessible enough for the use case.
- Provide a list/outline alternative so the roadmap remains usable without a pointer or graph visualization.
- Node states must be visually distinct and also labelled in text; do not rely on color alone.
- Clicking a node opens a detail panel with objectives, prerequisites, estimated effort, learning resources, practice, and completion criteria.
- Include zoom/reset or fit-to-screen controls where appropriate.
- Avoid an overwhelming graph: group skills into stages or milestones and allow progressive expansion.
- Show “Why this next?” explanations.
- Show the estimated time as an estimate, not a guarantee.

## 4.6 Learning workspace

For each skill or topic, provide:

- Learning objectives.
- A concise explanation.
- Beginner-friendly explanation toggle.
- Analogy or real-world example.
- Step-by-step worked example.
- Key terms.
- Common misconceptions.
- Short knowledge check.
- Practice task.
- Completion criteria.
- Links to verified learning resources when available.

AI-generated explanations must be structured and age-appropriate. Do not claim a topic is mastered merely because a student opened a lesson.

## 4.7 AI Learning Companion

The assistant should support:

- Explain this simply.
- Explain step by step.
- Give me a real-world analogy.
- Show another example.
- Test my understanding.
- Summarize this topic.
- Explain my mistake.
- Connect this topic to the next skill in my roadmap.

### AI response quality

- Ask a clarifying question if the student's question is ambiguous.
- Adapt vocabulary and depth to the learner's stated level.
- Use structured responses: simple explanation, example, key takeaway, and optional check question.
- Distinguish facts from assumptions.
- Do not invent sources or URLs.
- If external sources are shown, use verified URLs and identify the source.
- Never expose system prompts, API keys, internal errors, or private learner data.
- Keep AI output constrained to the educational task.
- Provide a useful fallback message if the AI service is unavailable.

## 4.8 Practice, quizzes, and feedback

- Generate or curate questions aligned with the current skill objectives.
- Provide immediate, constructive explanations.
- Track attempts and improvement.
- Include a mix of recall, conceptual, and application questions.
- Avoid revealing answers before the student attempts a question unless they request a worked solution.
- Provide retry and review options.
- Use mastery evidence rather than completion clicks alone.

## 4.9 Motivation and progress

Implement a meaningful progress system:

- Daily learning goal.
- Weekly study target.
- Progress by skill and milestone.
- Learning streak (with forgiving recovery; never shame the student).
- XP for meaningful learning actions such as completing practice or demonstrating mastery.
- Milestone celebrations.
- “Continue where you left off.”
- Next best action.
- Estimated effort remaining.

Progress must be based on real tracked activity, not hardcoded percentages.

## 4.10 Notes and revision

- Save personal notes by topic.
- Generate concise revision summaries when AI is configured.
- Create flashcards from lesson content.
- Support spaced-revision reminders as a later enhancement.
- Let users edit and delete their own notes.

## 4.11 Student dashboard

Show the most useful information first:

- Welcome and current learning goal.
- Continue learning CTA.
- Current roadmap and next available skill.
- Weekly progress.
- Mastered skills.
- Skills needing review.
- Upcoming milestone.
- Recent learning activity.
- Study-time summary (only if reliably tracked).

Avoid clutter and vanity metrics.

---

# 5. Suggested technology architecture

Use the existing repository's stack if it is already coherent and functional. Do not rewrite a working project merely to follow this suggestion.

If starting from an empty repository, prefer:

## Frontend

- Next.js with App Router and TypeScript.
- React.
- Tailwind CSS.
- A consistent accessible component system such as shadcn/ui, where useful.
- React Hook Form + Zod for form validation.
- A graph visualization library such as React Flow for the dependency graph, with a text/list alternative.

## Backend and data

Choose one coherent backend approach:

- Next.js server actions / route handlers for a small full-stack MVP; or
- A separate API service if the project genuinely requires it.

For persistence, use PostgreSQL with Prisma or Drizzle. Supabase may provide PostgreSQL, authentication, and storage if configured. Do not introduce multiple overlapping backend systems.

## AI integration

- Call the AI provider only from server-side code.
- Keep provider keys in environment variables.
- Create a provider abstraction so the application is not tightly coupled to one model.
- Validate request and response schemas.
- Set request timeouts and reasonable token/output limits.
- Handle rate limits and provider errors.
- Add a deterministic mock provider for local development and automated tests.
- Never make the entire product unusable when an AI key is missing.

## Quality tooling

- ESLint.
- Prettier.
- TypeScript strict mode.
- Unit tests with Vitest or Jest.
- Component tests with React Testing Library.
- End-to-end tests with Playwright.
- Accessibility checks with axe where practical.

Do not install unnecessary packages. Check current project versions and compatibility before adding dependencies.

---

# 6. Data model

Design a normalized schema appropriate to the selected database. At minimum consider:

## User
- id
- name
- email
- createdAt
- updatedAt

## LearnerProfile
- id
- userId
- targetDomain
- targetSpecialization
- currentLevel
- weeklyStudyMinutes
- preferences

## Skill
- id
- domainId
- name
- slug
- description
- level
- estimatedMinutes
- learningObjectives

## SkillDependency
- id
- prerequisiteSkillId
- dependentSkillId
- isRequired
- reason

## LearnerSkill
- id
- userId
- skillId
- status
- masteryScore
- lastAssessedAt
- completedAt

## Assessment
- id
- skillId
- title
- questions
- passingThreshold

## AssessmentAttempt
- id
- userId
- assessmentId
- score
- answers
- feedback
- createdAt

## LearningActivity
- id
- userId
- skillId
- activityType
- durationMinutes
- metadata
- createdAt

## Note
- id
- userId
- skillId
- content
- createdAt
- updatedAt

Add indexes, unique constraints, foreign keys, and cascade behavior deliberately. Enforce user ownership in every read/write path. Store JSON only where it is appropriate and validate its schema.

---

# 7. API and application boundaries

Create clear service boundaries. Example modules:

- `roadmap-engine`: graph validation, prerequisite traversal, topological sorting, path generation.
- `assessment-service`: question delivery, scoring, mastery evidence.
- `learning-service`: lessons, activities, notes, progress.
- `ai-service`: provider abstraction, prompts, structured output validation.
- `auth`: authentication and authorization.
- `analytics`: derived progress metrics.

Example endpoints or server actions (adapt to the selected architecture):

- `GET /api/profile`
- `PATCH /api/profile`
- `POST /api/onboarding`
- `POST /api/assessments`
- `POST /api/assessments/:id/attempts`
- `GET /api/roadmap`
- `POST /api/roadmap/recalculate`
- `GET /api/skills/:id`
- `POST /api/skills/:id/activities`
- `POST /api/ai/explain`
- `POST /api/ai/quiz`
- `GET /api/progress`
- `POST /api/notes`
- `PATCH /api/notes/:id`
- `DELETE /api/notes/:id`

Use consistent response shapes, correct HTTP status codes, input validation, authorization checks, and safe error messages. Never trust a user ID supplied by the client; derive identity from the authenticated session.

---

# 8. Visual design direction

## Brand

Name: **BuddyStudy**

Personality:
- Intelligent but approachable.
- Calm, focused, encouraging.
- Modern and trustworthy.
- Academic without looking old-fashioned.
- Premium product quality without visual clutter.

## Visual direction

Create a distinctive, polished education SaaS interface.

Suggested direction:
- Deep navy / ink surfaces with clean light content surfaces, or a carefully balanced light-first interface.
- One strong accent color such as electric blue or violet.
- Subtle gradients used sparingly.
- Rounded cards with consistent radii.
- Clear typography hierarchy.
- Generous spacing.
- Crisp icons.
- Restrained shadows and borders.
- Smooth, purposeful transitions.
- Consistent empty, loading, error, and success states.

Do not use:
- Excessive glassmorphism.
- Random gradients on every card.
- Overloaded dashboards.
- Tiny low-contrast text.
- Unnecessary animations.
- Generic stock imagery as a substitute for product UI.
- Decorative charts with fake data.

## Required pages

1. `/` — Landing page.
2. `/auth/sign-in` — Sign-in.
3. `/auth/sign-up` — Sign-up.
4. `/onboarding` — Learner setup.
5. `/dashboard` — Personalized overview.
6. `/roadmap` — Interactive skill dependency graph.
7. `/learn/[skillId]` — Learning workspace.
8. `/assistant` — AI Learning Companion.
9. `/practice/[skillId]` — Quiz and practice.
10. `/progress` — Learning analytics.
11. `/notes` — Personal notes and revision.
12. `/settings` — Profile and preferences.

If time is limited, implement the primary journey end-to-end before building every secondary page.

---

# 9. Accessibility requirements

Target WCAG 2.2 AA where practical.

- Use semantic landmarks and headings in logical order.
- All functionality must be keyboard accessible.
- Provide visible focus indicators.
- Use sufficient text and UI contrast.
- Give form controls persistent labels and clear validation messages.
- Provide accessible names for icon-only controls.
- Do not use color as the only indicator of status.
- Respect `prefers-reduced-motion`.
- Ensure dialogs manage focus correctly.
- Announce dynamic feedback with appropriate live regions.
- Give roadmap graph nodes accessible names and state descriptions.
- Provide an equivalent structured list for the graph.
- Ensure layouts work at 200% zoom and on narrow mobile screens.
- Test with keyboard-only navigation and screen-reader-friendly semantics.

---

# 10. Security and privacy requirements

Treat security as a release requirement, not a later enhancement.

- Keep API keys and secrets on the server.
- Commit an `.env.example` containing placeholders only; never commit real secrets.
- Validate and sanitize untrusted inputs at every server boundary.
- Use parameterized database queries or a safe ORM.
- Enforce authentication and resource-level authorization.
- Ensure users can only access their own profile, notes, attempts, and activity.
- Apply rate limiting to AI and authentication-sensitive endpoints.
- Limit request body size and AI output size.
- Protect against XSS, CSRF where applicable, injection, and insecure direct object references.
- Use secure cookies and appropriate session settings.
- Avoid logging passwords, tokens, prompts containing sensitive personal data, or secrets.
- Use safe error messages; keep internal stack traces out of production responses.
- Add security headers and a restrictive Content Security Policy where compatible.
- Use HTTPS in production.
- Define data retention and deletion behavior.
- Request only the personal information needed for learning.
- Do not send private learner records to an AI provider unless required, disclosed, and minimized.
- Treat uploaded files and AI output as untrusted content.
- Never execute generated code or content on the server.
- Document any security trade-offs that remain.

---

# 11. Performance and reliability

- Use server components by default where appropriate; use client components only for interactive UI.
- Lazy-load heavy graph and editor components.
- Avoid unnecessary client-side JavaScript.
- Paginate or limit long activity and note lists.
- Add database indexes for common queries.
- Avoid N+1 queries.
- Cache only data that is safe and correct to cache.
- Debounce search and expensive interactive inputs.
- Use loading skeletons for meaningful waits.
- Provide retry behavior for transient failures.
- Use timeouts and graceful fallbacks for AI requests.
- Avoid duplicate submissions and race conditions.
- Keep core roadmap viewing functional if the AI provider is unavailable.
- Measure performance rather than claiming the app is optimized without evidence.

---

# 12. Testing strategy — mandatory

Do not stop after the UI renders. Create and run tests.

## Unit tests

Roadmap engine:
- Valid topological ordering.
- Prerequisites always appear before dependent skills.
- Already-mastered prerequisites are handled correctly.
- Missing target skill.
- Missing prerequisite node.
- Duplicate edge.
- Self-loop.
- Cycle detection.
- Disconnected nodes.
- Optional prerequisites.
- Multiple prerequisite branches.
- Empty graph.
- Invalid mastery values.

Assessment:
- Correct scoring.
- Invalid answers.
- Empty submissions.
- Mastery threshold behavior.
- Retake behavior.

Validation and authorization:
- Invalid payloads rejected.
- Unauthorized requests rejected.
- User A cannot read or modify User B's data.

## Component tests

- Forms and validation.
- Roadmap node states.
- Accessible graph/list alternative.
- Quiz answer selection and feedback.
- Loading, empty, error, and success states.
- Responsive navigation.

## End-to-end tests

At minimum test this complete flow:

1. Open homepage.
2. Enter demo mode or create an account.
3. Complete onboarding.
4. Complete a diagnostic assessment.
5. Generate a roadmap.
6. Confirm prerequisite order.
7. Open an available skill.
8. Complete a lesson or practice activity.
9. Confirm progress updates.
10. Ask the AI companion a question or use the mock provider.
11. Refresh and verify persisted state when persistence is configured.

## Quality gates

Before declaring completion, run the available equivalents of:

- Type check.
- Lint.
- Unit tests.
- Component tests.
- End-to-end tests.
- Production build.
- Accessibility checks.

Fix errors rather than hiding, skipping, or weakening tests. If a check cannot run because a service or secret is unavailable, report that precisely and provide a mock or documented manual verification path.

---

# 13. Seed data and demo experience

A hackathon demo must work without requiring judges to configure private API keys.

Provide realistic, clearly labelled sample data for at least these learning domains:

1. **Machine Learning**
   - Python foundations
   - Mathematics foundations
   - Statistics and probability
   - Data analysis
   - Supervised learning
   - Model evaluation
   - Unsupervised learning
   - Capstone project

2. **Web Development**
   - HTML
   - CSS
   - JavaScript fundamentals
   - Git and GitHub
   - TypeScript
   - React
   - APIs
   - Backend fundamentals
   - Database fundamentals
   - Full-stack project

3. **Data Analytics**
   - Spreadsheet fundamentals
   - Statistics
   - SQL
   - Data cleaning
   - Data visualization
   - Python for analysis
   - Portfolio project

4. **Cybersecurity fundamentals**
   - Computer and networking foundations
   - Operating system fundamentals
   - Security principles
   - Basic scripting
   - Web security fundamentals
   - Defensive security lab

Ensure each sample graph is logically valid and its prerequisites are curated. Do not imply that the sample roadmap is the only correct route.

Provide a demo learner with sample progress, but label it as demo data. Include a reset-demo option if appropriate.

---

# 14. Hackathon presentation and differentiation

The demo should tell a clear story:

**Problem:** Students are overwhelmed by disconnected courses and do not know what to learn first.

**Insight:** Learning is a dependency problem. Advanced skills rely on foundations, and students start with different levels of knowledge.

**Solution:** BuddyStudy combines diagnostic assessment, a curated skill dependency graph, a personalized roadmap engine, and AI explanations.

**Differentiator:** The roadmap is not a random list. It is generated from prerequisites and the student's existing mastery.

**Impact:** Students can see where they are, why a skill matters, what to learn next, and how each step moves them toward their goal.

## Recommended live demo sequence

1. Open the landing page and explain the problem in one sentence.
2. Select Machine Learning as the target.
3. Complete a short diagnostic assessment.
4. Show how existing knowledge changes the generated roadmap.
5. Expand the dependency graph and explain prerequisite edges.
6. Click a recommended skill and show “Why this next?”
7. Ask the AI companion to explain a difficult concept simply.
8. Complete a short practice question.
9. Show progress and the next unlocked skill.

Do not spend the demo on sign-up friction, settings, or decorative animations.

---

# 15. Implementation plan for Antigravity

Work in small, verifiable phases. Do not generate the entire application in one enormous unreviewed code dump.

## Phase 0 — Repository inspection

- Inspect the repository, package manager, scripts, framework, existing components, and environment files.
- Identify what already works.
- Do not overwrite useful code.
- Report the current architecture and propose the smallest safe implementation path.
- Create or update a concise implementation checklist.

## Phase 1 — Foundation

- Establish the app structure and design tokens.
- Configure TypeScript strict mode, linting, formatting, and tests.
- Build responsive navigation and reusable UI components.
- Implement landing page and demo entry.
- Verify the app runs.

## Phase 2 — Core learning data

- Define domain, skill, dependency, learner, and mastery models.
- Create realistic seed data.
- Implement graph validation and roadmap generation as pure functions.
- Write unit tests before connecting the graph engine to the UI.

## Phase 3 — Personalized roadmap

- Build onboarding and diagnostic assessment.
- Connect assessment results to learner mastery.
- Generate the personalized roadmap.
- Build interactive graph and accessible list view.
- Add explanations for recommendations.
- Test prerequisite correctness.

## Phase 4 — Learning experience

- Build skill detail and lesson workspace.
- Implement quizzes, feedback, activity tracking, and notes.
- Update mastery and unlock eligible skills.
- Verify persistence or clearly labelled demo persistence.

## Phase 5 — AI companion

- Add server-side provider abstraction.
- Add structured prompts and output validation.
- Add level-aware explanations and follow-up actions.
- Add rate limits, timeouts, error handling, and mock provider.
- Verify no secret is exposed to the browser.

## Phase 6 — Progress and polish

- Build dashboard, milestones, and progress views.
- Add responsive refinements, loading/empty/error states, accessibility improvements, and subtle motion.
- Remove dead code, placeholder links, fake buttons, and unused dependencies.

## Phase 7 — Verification and delivery

- Run typecheck, lint, tests, accessibility checks, and production build.
- Fix all actionable failures.
- Test the primary end-to-end journey.
- Review security boundaries and mobile layouts.
- Provide setup instructions, environment variable documentation, seed instructions, and a concise demo script.
- Summarize what is implemented, what is verified, and what remains incomplete.

After each phase, report:
- Files created or changed.
- Decisions and trade-offs.
- Commands run and their results.
- Known issues.
- Next phase.

Do not claim a phase is complete until its checks have actually passed.

---

# 16. Code quality rules

Act as a senior software engineer and technical lead.

- Use clear, descriptive names.
- Keep components focused and reasonably small.
- Separate UI, business logic, data access, and provider integrations.
- Prefer pure functions for graph algorithms and calculations.
- Use explicit types; avoid `any`.
- Avoid giant components and giant files.
- Avoid duplicated business logic.
- Avoid hidden global state.
- Handle errors explicitly.
- Do not leave dead code, debug logs, or unexplained TODOs.
- Do not silence TypeScript, ESLint, or test failures without a documented reason.
- Add comments for non-obvious decisions, not for self-explanatory code.
- Keep dependencies minimal and justified.
- Do not fake functionality with buttons that do nothing.
- Do not use hardcoded progress for real user accounts.
- Keep demo data isolated from production user data.
- Keep configuration documented.
- Prefer maintainable solutions over clever abstractions.

---

# 17. Definition of done

The project is ready for the hackathon demo only when:

- [ ] The application starts using documented commands.
- [ ] The homepage clearly communicates the education problem and BuddyStudy solution.
- [ ] A student can enter demo mode or authenticate.
- [ ] A student can select a domain and target specialization.
- [ ] A diagnostic assessment can be completed.
- [ ] A personalized roadmap is generated from a real skill dependency graph.
- [ ] The roadmap respects prerequisite ordering.
- [ ] Cycles and invalid graph data are detected.
- [ ] The student can understand why the next skill is recommended.
- [ ] A student can open a skill and complete a learning activity.
- [ ] Practice feedback is useful and understandable.
- [ ] Progress updates from real activity.
- [ ] The AI companion works with a configured provider or clearly labelled mock mode.
- [ ] AI failures do not break the rest of the application.
- [ ] Core flows work on mobile and desktop.
- [ ] Keyboard navigation and accessible graph alternatives are available.
- [ ] User data access is protected by authorization checks.
- [ ] Type checking, linting, tests, and production build have been run.
- [ ] No real secrets are committed.
- [ ] Demo data is clearly identified as demo data.
- [ ] Setup and demo instructions are documented.

---

# 18. Final instruction to the Antigravity agent

You are the senior product engineer, software architect, UI/UX engineer, security reviewer, and QA lead responsible for delivering BuddyStudy.

First inspect the repository. Then implement the product in the phases above, prioritizing a complete and reliable primary learning journey over a large collection of disconnected screens.

Make thoughtful engineering decisions and explain important trade-offs. Do not ask the user to make routine technical decisions that you can safely make yourself. Ask only when a decision genuinely blocks implementation, such as a required provider credential or an irreversible product choice.

Use mock services and seeded data when external credentials are unavailable, but label mock behavior honestly. Never fabricate successful API calls, test results, citations, or integrations.

The final result must be:
- Visually polished and coherent.
- Functionally interactive.
- Aligned with the exact education problem statement.
- Built around a genuinely working prerequisite-aware personalized roadmap.
- Secure, accessible, responsive, maintainable, and tested.
- Ready to demonstrate to hackathon judges.

**Build BuddyStudy as a real learning product—not just a beautiful dashboard.**
