# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Frontend deployment on Vercel

This repository now contains only the frontend React + Vite app.

- Import the repo into Vercel and select the root directory (`porras-webprog`).
- Use `npm run build` as the build command if Vercel does not detect it automatically.
- Use `dist` as the output directory.
- The root `vercel.json` rewrites all URLs to `index.html`, so client-side routes will not return 404 on refresh.

If you have a separate backend repository, set `VITE_API_URL` in Vercel to that backend URL after deployment.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
