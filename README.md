# ATLAS Learn — Personal AI Tutor

> **A Neural Works Educational Intelligence Product**  
> Personal AI tutor built around trusted educational content and the Sri Lankan school curriculum.

---

## 1. Product Overview

**ATLAS Learn** is an educational AI companion built on top of the reusable **ATLAS Core** intelligence platform. Unlike generic chat interfaces or corporate dashboards, ATLAS Learn is designed specifically for Sri Lankan school students (Grades 6–13).

- **Emotionally Grounded Tutor**: Features the animated **ATLAS Tutor** companion (`idle`, `listening`, `thinking`, `speaking`, `celebrating`, `encouraging`).
- **Sri Lankan Curriculum**: Grounded in national curriculum subjects (Science, Mathematics, History, ICT, English, Geography).
- **Trilingual First-Class Support**: Fully localized in **English**, **Sinhala (සිංහල)**, and **Tamil (தமிழ்)** using `i18next` and `react-i18next`.
- **Curriculum Learning Workflows**: "Teach Me" step-by-step interactive lessons, multi-turn AI tutoring with textbook citations, and practice exam questions with encouraging feedback.
- **Mobile-First Touch Architecture**: Designed for smartphones (360px–430px) with bottom navigation, tablets (768px), and desktops (1024px–1440px).

---

## 2. Technical Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 (`^19.1.1`), Vite 7 (`^7.1.1`) |
| **Language** | TypeScript Strict Mode (`~5.8.3`) |
| **Styling** | Tailwind CSS (`^3.4.17`), PostCSS, Autoprefixer |
| **Routing** | React Router (`^7.8.0`) |
| **Animations** | Framer Motion (`^12.4.7`) |
| **Async State** | TanStack Query (`^5.66.0`) |
| **Internationalization** | `i18next` (`^24.2.2`), `react-i18next` (`^15.4.1`) |
| **Icons** | Lucide React (`^0.536.0`) |
| **HTTP Client** | Axios (`^1.11.0`) |

---

## 3. Getting Started

### Prerequisites
- Node.js `v20+` or `v24+`
- npm `v10+` or `v11+`

### Installation
```bash
# Navigate to the project directory
cd "d:\Development\Spring AI\atlas-learn-ui"

# Install dependencies
npm install
```

### Development Server
```bash
# Start Vite development server (port 5174 by default)
npm run dev
```
Open [http://localhost:5174](http://localhost:5174) in your browser.

### Production Build
```bash
# Typecheck and build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 4. Environment Configuration

Configuration is managed via `.env`:

```env
# URL of the running ATLAS Spring Boot Backend
VITE_API_BASE_URL=http://localhost:8080

# Switch between realistic prototype mock mode and live backend
# true  = Standalone prototype mode with realistic Sri Lankan curriculum mock responses
# false = Connects directly to Spring Boot backend (/api/chat)
VITE_USE_MOCK_API=true

VITE_APP_TITLE=ATLAS Learn
```

---

## 5. ATLAS Backend Integration Architecture

The prototype strictly preserves the existing **ATLAS Enterprise** backend contract:

### Backend Wire Contract
```http
GET /api/chat?conversationId={conversationId}&message={message}
```

**Response Format**:
```json
{
  "answer": "string",
  "sources": [
    {
      "documentId": "string",
      "source": "string",
      "fileType": "string",
      "pageNumber": 42,
      "chunkNumber": 3,
      "distance": 0.14
    }
  ]
}
```

### Client Architecture Boundary
```
User Interface (TutorPage / TeachMe / Practice)
           │
           ▼
TutorService (src/api/tutorApi.ts)
  ├── Accepts frontend `LearningContext` (grade, subject, topic, language, conversationId)
  │
  ├── [VITE_USE_MOCK_API=true]  ──▶ MockTutorAdapter
  │                                   └── Realistic Sri Lankan curriculum answers with textbook citations
  │
  └── [VITE_USE_MOCK_API=false] ──▶ AtlasLiveTutorAdapter
                                      └── GET /api/chat?conversationId={id}&message={text}
```

> **Design Principle**: The live adapter initially maps only the fields supported by the existing ATLAS backend (`conversationId`, `message`). As new ATLAS Learn curriculum endpoints are developed, only the adapter is updated without modifying the UI components.

---

## 6. Project Structure

```
atlas-learn-ui/
├── src/
│   ├── api/
│   │   ├── client.ts            # Central Axios client with base URL & timeout interceptors
│   │   ├── tutorApi.ts          # TutorService, AtlasLiveTutorAdapter, MockTutorAdapter
│   │   └── types.ts             # Exact backend DTOs (RAGResponse, SourceCitation)
│   ├── brand/
│   │   └── assets.ts            # Approved losslessly embedded ATLAS_MARK and NEURAL_WORKS_LOGO
│   ├── components/
│   │   └── layout/
│   │       ├── AppShell.tsx     # Master layout shell with header, outlet, and mobile nav
│   │       ├── Header.tsx       # Brand header with Grade, Language, Streak, and Profile
│   │       └── MobileBottomNav.tsx # Mobile navigation bar (5 primary touch destinations)
│   ├── features/
│   │   ├── avatar/
│   │   │   └── TutorAvatar.tsx  # Decoupled SVG/Framer Motion animated Tutor companion
│   │   ├── home/
│   │   │   └── StudentHomePage.tsx # Personalized greeting, Tutor companion, 6 learning actions
│   │   ├── tutor/
│   │   │   ├── TutorPage.tsx    # Multi-turn dedicated Tutor conversation workspace
│   │   │   ├── CitationDrawer.tsx # Child-friendly textbook citations (no fabricated excerpts)
│   │   │   └── RichContentRenderer.tsx # Markdown headings, lists, and formula renderer
│   │   ├── teach-me/
│   │   │   └── TeachMePage.tsx  # Interactive step-by-step concept walkthrough (Photosynthesis)
│   │   ├── practice/
│   │   │   └── PracticePage.tsx # Practice questions with encouraging feedback & Tutor redirect
│   │   ├── progress/
│   │   │   └── ProgressPage.tsx # Streak tracker, mastery meters, badges, parent portal preview
│   │   ├── subjects/
│   │   │   ├── SubjectsPage.tsx # Sri Lankan school subjects overview
│   │   │   └── SubjectDetailPage.tsx # Subject topics and chapter curriculum breakdown
│   │   └── onboarding/
│   │       └── OnboardingModal.tsx # Welcome modal with language and grade selection
│   ├── i18n/
│   │   └── index.ts             # i18next configuration with English, Sinhala, Tamil dictionaries
│   ├── mocks/
│   │   └── curriculumData.ts    # Sri Lankan curriculum demo data (clearly labeled sample material)
│   ├── state/
│   │   └── studentContext.tsx   # React Context for grade, language, streak, and tutor state
│   ├── styles/
│   │   └── index.css            # Tailwind directives, custom scrollbars, and mesh glows
│   ├── App.tsx                  # Root routing tree
│   └── main.tsx                 # Vite DOM entry
```

---

## 7. Remaining Backend Integration Points for Future Milestones

1. **Curriculum Metadata Filtering in Retrieval**:
   - Pass `grade` and `subject` as document metadata filters in `EnterpriseSearchController` or RAG chat retrieval.
2. **Textbook Excerpt Streaming**:
   - Support SSE / token streaming from `ChatController` for real-time word-by-word tutor speech rendering.
3. **Multilingual System Prompts**:
   - Instruct LLM inference layer in Spring AI to respond in Sinhala (`si`) or Tamil (`ta`) when requested in `LearningContext`.
4. **Homework Vision Ingestion**:
   - Connect the camera/snapshot placeholder to `/api/documents/upload` for multimodal OCR and problem solving.
5. **Voice AI (TTS/STT)**:
   - Connect speech audio toggle to a localized Text-to-Speech service for Sinhala, Tamil, and English voice playback.
