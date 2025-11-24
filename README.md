AI Resume Analyzer

AI-powered Resume Analyzer built with React & Puter.js. Includes seamless auth, resume upload/storage, and candidate-job matching using AI evaluations — packaged with a clean, reusable UI.

## Features

- Upload and store resumes
- AI-driven resume analysis and candidate-job matching
- Authentication and user flows
- Reusable UI components for quick customization
- Docker-ready for production deployment

## Tech stack

- Frontend: React (Vite)
- Framework: Puter.js (used in this project)
- Languages: JavaScript + TypeScript
- Tooling: Vite, Docker

## Quickstart

Prerequisites:
- Node.js (16+ recommended)
- npm or yarn


1. Clone the repo
   git clone https://github.com/ahmeddin12/ai_resume_analyzer.git
   cd ai_resume_analyzer

2. Install dependencies
   npm install
   # or
   yarn

3. Run in development
   npm run dev
   # or
   yarn dev

4. Build for production
   npm run build
   # or
   yarn build

5. Preview production build locally
   npm run preview
   # or
   yarn preview

Note: If scripts differ, check `package.json` for exact script names.

## Environment variables

Create a `.env` file at the project root as needed. Example placeholders (update based on your setup):

- VITE_API_URL=https://api.example.com
- VITE_OPENAI_API_KEY=your_openai_api_key
- VITE_AUTH_PROVIDER=auth-provider-config

Replace keys with the actual variables your backend or AI provider expects. Consult the project source for exact variable names referenced (search for `process.env.` or `import.meta.env` usage).



## Project structure (high level)

- app/ — main application code
- public/ — static assets
- constants/, types/, lib/ — utility and shared code
- vite.config.ts — dev/build config
- package.json — scripts and dependencies
- Dockerfile — container image steps

## Contributing

- Fork the repo and create a feature branch
- Keep changes focused and small
- Open a pull request with a clear description and testing steps
- Add or update tests where applicable

If you plan to add features that require new environment variables, update this README with their names and descriptions.

## Troubleshooting

- If the dev server fails to start, ensure Node.js and your package manager are up to date, then delete `node_modules` and reinstall.
- If AI calls fail, verify your API keys and environment variables are set correctly.

## License

Specify a license in the repository (e.g., MIT). If none exists, add a LICENSE file to clarify terms.

## Contact

For questions or help, open an issue in the repository or contact the maintainer.


