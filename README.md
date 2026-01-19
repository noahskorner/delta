## Overview

Build a lightweight, AI-powered education platform where users can discover or generate courses composed of structured learning assets and complete them with measurable progress and feedback.

---

## Functional Scope

### 1. Users & Profiles

- Email / OAuth sign up & sign in (Supabase Auth)
- Public profile:
  - Username (unique)
  - Avatar upload (Supabase Storage)
  - Bio (optional)
- View other users’ public profiles
- Follow / bookmark creators _(optional but recommended for discovery)_

---

### 2. Assets (Learning Units)

Assets are atomic content blocks tied to courses.

**Supported Asset Types**

1. Lecture (video or AI-generated outline)
2. Reading (links, uploaded docs, summaries)
3. Exercise (MCQ, short answer, coding, reflection)
4. Assignment / Project
5. Discussion Prompt
6. Quiz / Assessment
7. Feedback Request
8. Office Hours / Support Note
9. Milestone / Checkpoint
10. Final Evaluation

**Capabilities**

- Manual asset creation
- Import from:
  - YouTube
  - URLs (articles, blogs, research)
  - Uploaded PDFs/docs
- AI enrichment:
  - Summaries
  - Key concepts
  - Difficulty tagging
  - Estimated completion time
- Community searchable asset library
- Tagging + subject categorization
- Asset reuse across multiple courses

---

### 3. Courses

**Discovery**

- Browse public community courses
- Filter by subject, difficulty, popularity, duration

**Creation**

- Create course manually OR via AI Course Builder
- Course metadata:
  - Title
  - Subject
  - Description
  - Level (Beginner → Advanced)
  - Estimated duration
  - Visibility (Public / Private)

**AI Syllabus & Asset Generation**

- Chat-driven course generator (LLM)
- User specifies:
  - Length
  - Depth
  - Focus areas
  - Learning style
- LLM generates:
  - Structured syllabus
  - All required asset types
  - Exercises + solutions
  - Final evaluation
- Assets saved directly to DB via structured output schema

---

### 4. Learning & Progress

- Enroll in courses
- Track:
  - Completed assets
  - Scores
  - Milestone progress
  - Time spent _(optional)_
- Interactive exercises:
  - MCQ auto-graded
  - Free response graded by LLM
- AI Feedback Engine:
  - Conceptual critique
  - Improvement suggestions
  - Encouragement based on performance
- Course completion state:
  - Active
  - Completed
  - Archived
  - Dropped

---

### 5. AI Grading (Subjective)

- LLM evaluates:
  - Written answers
  - Project summaries
  - Reflections
- Returns structured feedback:
  - Strengths
  - Weaknesses
  - Suggestions
  - Concept gaps
- Score is secondary; qualitative feedback prioritized

---

### 6. Motivation & Gamification

- XP per asset completed
- Coins for:
  - Course completion
  - Streaks
  - High quiz scores
- Badges:
  - Subject mastery
  - Course creator
  - Consistency streaks
- Leaderboard _(optional future phase)_

---

## Recommended Additions (Missing but Important)

- Course ratings & reviews
- Save / favorite courses
- Recently viewed
- Creator attribution on AI-generated courses
- Difficulty progression system
- Daily learning streak tracking
- Admin moderation for public assets/courses

---

## Non-Functional

- Fast UI (streaming responses for AI)
- Deterministic structured outputs for all generated assets
- Server-side validation before persistence
- Scalable Postgres schema (assets reused across courses)
- Secure row-level policies in Supabase
- Minimal friction UX

---

## Summary

The app enables:

- Users → create profiles
- AI → generate full structured courses
- Community → share assets & courses
- Learners → complete exercises and receive intelligent feedback
- System → reward progress with gamification

A focused, AI-native learning platform built for rapid course creation and engagement.
