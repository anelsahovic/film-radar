# Film Radar
![film-radar-project-demo (1)](https://github.com/user-attachments/assets/23983769-8ee8-44c0-8fd1-c71bff7ee5fb)

##

Film Radar is a modern React TypeScript frontend app that allows users to discover movies, TV shows, and people using data fetched from The Movie Database (TMDb) API.Featuring sorting and pagination to navigate large datasets, debounced search for efficient querying, and genre-based filtering. Users can also toggle between dark and light mode themes to suit their preferences. It also features user favorites and watchlist management persisted via local storage for seamless user experience.

## Features

- Browse popular movies, TV shows, and people from TMDb.
- Add and remove items from Favorites and Watchlist with local storage persistence.
- Sorting, pagination, and filtering capabilities for easy content discovery.
- Search functionality with debounce to optimize API requests and user experience.
- Genre selection to filter media by categories.
- Responsive design with mobile-friendly navigation.
- Dark mode and light mode support for comfortable viewing.
- Built with React 19, TypeScript, Tailwind CSS, Radix UI, React Router v7, and more.

## Demo

App is hosted live on vercel:
[anelsahovic-film-radar.vercel.app/](https://anelsahovic-film-radar.vercel.app/)

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. Clone the repository:

```
git clone https://github.com/anelsahovic/film-radar.git
cd film-radar

```

2. Install dependencies:

```

npm install

#or

yarn install

```

3. Create a `.env` file in the root directory and add your TMDb API key / Access Token:

```

VITE_TMDB_ACCESS_TOKEN=your_tmdb_api_access_token_here

```

---

## Project Structure

- `/src` — React components, pages, hooks, and styles
- `/public` — Static assets such as images
- `vite.config.ts` — Vite configuration
- `package.json` — Project dependencies and scripts

---

## Technologies Used

- React 19 with TypeScript for type-safe UI development
- Vite for fast development and optimized builds
- Tailwind CSS and Radix UI for styling and accessible UI primitives
- React Router v7 for client-side routing
- Axios for API requests
- Local Storage API for favorites and watchlist persistence
- React Icons and Lucide React for iconography
- Additional utilities: date-fns, clsx, class-variance-authority, react-use, embla-carousel-react

---

## Scripts

| Script            | Description                                   |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Starts development server with live reloading |
| `npm run build`   | Builds optimized production assets            |
| `npm run preview` | Previews production build locally             |
| `npm run lint`    | Runs ESLint to statically analyze code        |

---

## Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check [issues page](https://github.com/anelsahovic/film-radar/issues).

---

## License

This project is licensed under the MIT License.

---

## Author

Developed by Anel Sahovic — [https://www.anelsahovic.com](https://www.anelsahovic.com)
