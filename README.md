# Pixisphere

Pixisphere is a Next.js web application for discovering and booking the best photographers for your special moments. It features a modern UI, advanced filtering, and a mock API for development and testing.

## Features
- Browse a curated list of photographers with ratings, locations, and styles
- Filter by price, rating, style, and city
- Search by name, location, or tags
- View detailed photographer profiles with portfolios and reviews
- Responsive, mobile-friendly design
- Mock API using `json-server` for local development
- Uses local stock images for demonstration

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start the mock API server
```bash
npm run json-server
```
This will start a local API at [http://localhost:3001/photographers](http://localhost:3001/photographers).

### 3. Start the Next.js development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Project Structure
```
├── public/
│   ├── images/                # Stock and profile images for photographers
│   └── ...                    # Static assets (SVGs, favicon, etc.)
├── src/
│   ├── app/                   # Next.js app directory (routing, layout, pages)
│   ├── components/            # React components (cards, filters, UI)
│   ├── store/                 # Zustand state management
│   └── types/                 # TypeScript type definitions
├── db.json                    # Mock API data for photographers
├── package.json               # Project metadata and scripts
└── ...
```

## Mock API
- The app uses `json-server` to serve mock photographer data from `db.json`.
- Images referenced in the API are stored in `public/images/`.

## Scripts
- `npm run dev` – Start the Next.js development server
- `npm run build` – Build the app for production
- `npm run start` – Start the production server
- `npm run lint` – Run ESLint
- `npm run json-server` – Start the mock API server

## Tech Stack
- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [json-server](https://github.com/typicode/json-server)

## License
This project is for educational/demo purposes only. All images are from free stock sources (Unsplash, etc.).
