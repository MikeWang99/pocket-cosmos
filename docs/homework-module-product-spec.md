# Pocket Cosmos Homework Module

## 1. Product outcome

The Homework module turns a scattered set of source questions into a lesson-level task. A student opens one assignment, completes its questions in order, and never needs to navigate across chapters. The teacher can create, publish, and inspect assignments from one workflow.

The source question remains the single unit of learning progress. Homework is an ordered collection of references to source questions, not a duplicated question bank.

## 2. Product principles

1. **One source of truth.** An assignment item stores the original `practiceSetId` and `questionId`. A Homework submission writes to the existing `practice_attempts` record for that pair.
2. **Draft before publish.** Manual and AI-assisted creation both produce an editable question list before students see it.
3. **One clear next action.** The student dashboard prioritizes open assignments and the runner keeps Previous/Next navigation visible.
4. **Teacher judgment remains final.** AI selects candidate IDs; the teacher can reorder or remove any question before publishing.
5. **Status means activity, not mastery.** A submitted attempt counts as completed. Accuracy is shown separately so an incorrect attempt is not confused with an untouched question.

## 3. Information architecture

### Student

- Homework navigation item
- Homework dashboard
  - Open assignment count
  - Overall question completion
  - Nearest outstanding deadline
  - Assignment cards with status and progress
- Sequential assignment runner
  - Assignment context and deadline
  - Question navigator
  - Source question content
  - Submit/retry
  - Previous/Next
  - Link to the same source question in Practice

### Teacher

- Homework Admin inside the Homework module
- Homework management panel inside the existing Admin section
- Assignment list and lifecycle actions
- Per-student progress table
- Manual assignment builder
- AI-assisted assignment builder
- Audience and deadline controls

## 4. Core workflows

### 4.1 Student completes homework

1. Student opens **Homework**.
2. Dashboard shows published assignments addressed to the student.
3. Student opens an assignment and lands on Question 1.
4. Student answers and submits.
5. The system upserts `practice_attempts` using:
   - authenticated student ID
   - source `practice_set_id`
   - source `question_id`
6. The assignment navigator marks the item attempted.
7. The original question in **Practice** reads the same record and therefore appears attempted.
8. Teacher progress updates from the same record.

### 4.2 Student previously completed a source question

1. Homework loads its ordered source references.
2. Existing `practice_attempts` are matched by `practiceSetId + questionId`.
3. Matching items appear completed immediately.
4. If one source question is intentionally reused in multiple assignments, the prior attempt counts in each assignment. This is consistent with question-level progress. A future “must redo for this assignment” feature would require assignment-specific submissions and is deliberately outside this release.

### 4.3 Teacher manually creates homework

1. Teacher clicks **New assignment**.
2. Teacher enters title, optional instructions, due date, and audience.
3. Teacher selects a question bank.
4. Teacher enters displayed question numbers, including comma-separated values and ranges such as `1, 2, 5-8`.
5. The interface resolves display numbers to stable source IDs.
6. Teacher reviews, reorders, or removes questions.
7. Teacher saves a draft or publishes immediately.
8. Published homework appears for its audience.

### 4.4 AI-assisted creation

1. Teacher describes topic, quantity, difficulty, focus, and audience.
2. The selection layer returns real `practiceSetId + questionId` pairs.
3. Every pair is validated against the deployed question catalog.
4. A normal editable draft is generated.
5. Teacher reviews and publishes.

Preview uses a deterministic topic/difficulty selector so the complete interaction can be tested without consuming an external model. The production contract is `POST /api/admin/assignments/ai`.

### 4.5 Teacher reviews progress

1. Teacher selects an assignment.
2. The page identifies the assignment audience.
3. Attempts are filtered to the assignment’s source-question pairs.
4. For each student the interface shows:
   - completed / total
   - progress bar
   - accuracy
   - not started / in progress / complete
   - last activity

Completion and correctness are separate measures.

## 5. State model

### Assignment lifecycle

| State | Student visibility | Teacher actions |
| --- | --- | --- |
| Draft | Hidden | Edit/review, publish |
| Published | Visible to audience | Review progress, archive |
| Archived | Hidden from active student list | Historical review |

### Student assignment status

| Condition | Status |
| --- | --- |
| `completed = total` | Completed |
| incomplete and deadline passed | Overdue |
| `completed > 0` | In progress |
| otherwise | To do |

## 6. Data model

### `assignments`

Assignment metadata, lifecycle, source type, deadline, publishing audience, and optional AI instruction.

### `assignment_items`

Ordered source-question references. Unique constraints prevent duplicates within an assignment and prevent two items from occupying one position.

### `assignment_students`

Explicit audience when an assignment is not addressed to all students.

### `practice_attempts`

Unchanged. It remains the canonical record for answers, scores, correctness, feedback, and timestamps.

## 7. API contract

### Manual/programmatic

`POST /api/admin/assignments`

```json
{
  "title": "Motion · Lesson 04",
  "description": "Complete in order.",
  "dueAt": "2026-08-03T12:00:00.000Z",
  "status": "published",
  "sourceType": "manual",
  "assignedToAll": false,
  "studentIds": ["student-user-uuid"],
  "items": [
    {
      "practiceSetId": "igcse-cie-topic-1-2",
      "questionId": "source-question-id"
    }
  ]
}
```

### AI-resolved

`POST /api/admin/assignments/ai`

```json
{
  "title": "Motion foundations",
  "instruction": "Select 8 easy motion questions focused on acceleration.",
  "status": "draft",
  "assignedToAll": true,
  "resolvedItems": [
    {
      "practiceSetId": "igcse-cie-topic-1-2",
      "questionId": "source-question-id"
    }
  ]
}
```

The endpoint supports either an authenticated Supabase admin bearer token or an `x-homework-api-key` matching the server-only `HOMEWORK_AUTOMATION_SECRET`.

## 8. Permission and integrity rules

- Students can read only published assignments addressed to them or all students.
- Students cannot create, edit, publish, or archive assignments.
- Administrators can manage all assignment data.
- Service-role credentials and automation secrets remain server-only.
- The API validates every source question and removes duplicate references.
- If child record creation fails, the partially created assignment is removed.

## 9. Empty, loading, and error states

- Signed-out production visitor: prompt to sign in.
- No published assignment: positive “No new homework” state.
- Loading: explicit Homework loading panel.
- Invalid manual question number: show missing numbers without losing valid selections.
- No selected audience: block saving.
- Unknown AI-resolved ID: reject the request.
- Failed progress save: do not show a completed result locally.

## 10. Acceptance criteria

- A student can finish an entire assignment without opening another module.
- Submitting in Homework makes the same source question attempted in Practice.
- An existing Practice attempt is reflected in Homework.
- A teacher can create a multi-question assignment by entering displayed question numbers.
- A teacher can reorder and remove questions before publishing.
- Draft assignments are not visible to students.
- The progress table reports each assigned student independently.
- AI-selected real IDs can create a draft or published assignment through an authenticated API.
- Student and teacher flows work on desktop and mobile layouts.

## 11. Recommended follow-up phases

1. Add assignment editing and duplicate-as-template.
2. Add teacher comments and manual marking for free-response work.
3. Add reminders for upcoming and overdue assignments.
4. Add assignment-specific redo rules only if reused-question semantics become a real teaching problem.
5. Add AI selection quality checks such as topic coverage, estimated duration, and duplicate-concept warnings.

