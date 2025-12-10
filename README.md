# Quiz.ai

A futuristic, AI-powered knowledge assessment platform built with React, Tailwind CSS, and Google Gemini 2.5 Flash model.

## Features

*   **AI-Generated Content**: Instantly creates challenging multiple-choice questions on any topic (Tech, Science, Pop Culture, etc.).
*   **Adaptive Feedback**: Provides witty, context-aware feedback based on your score using AI.
*   **Dynamic Theming**: Toggle between a clean "Light Mode" and a fabulous "Cyber-Jungle Dark Mode" with neon emerald accents.
*   **Responsive Design**: Fully responsive layout that looks great on mobile and desktop.

## Tech Stack

*   **Frontend**: React 18, JavaScript, Tailwind CSS
*   **AI Model**: Google Gemini 2.5 Flash (via `@google/genai`) and other 3 models of Gemini as a backup which are little bit slower.
*   **Styling**: Custom Tailwind configuration with CSS variables for dynamic theming.
*   **State Management**: React `useState` for handling app flow and theme preference.

## Screenshots

## Getting Started

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Set up API Key**:
    Ensure `process.env.API_KEY` is available with your Google Gemini API key and add it to a dot env file.
4.  **Run the app**:
    ```bash
    npm run dev
    ```

## Project Structure

*   `App.jsx`: Main application controller. Manages global state (quiz status, score, user answers, theme).
*   `services/geminiService.ts`: Handles all interactions with the Gemini API. Uses structured JSON output schemas for reliability.
*   `components/`: Reusable UI components.
    *   `TopicSelection.jsx`: Grid of preset topics + custom input.
    *   `QuizInterface.jsx`: The main card for displaying questions and handling interaction.
    *   `ResultsScreen.jsx`: Displays score with a circular chart and AI feedback.
    *   `Button.jsx`: Reusable styled button component.

## Design System

The app uses a dual-theme system via CSS Variables:

**Dark Mode:**
*   Background: Slate 950
*   Surface: Slate 900
*   Accent: Neon Emerald

**Light Mode:**
*   Background: Slate 50
*   Surface: White
*   Accent: Emerald 500

## AI Prompts Used

**Question Generation:**
> "Generates 5 high-quality, engaging multiple-choice questions about recommended topics and any custome topic. Difficulty: Intermediate to Advanced..."

**Feedback Generation:**
> "Provides a witty, helpful, and concise feedback message... If the score is low, be encouraging..."
