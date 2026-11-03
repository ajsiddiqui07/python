# Session 4 — Reusable React Components

A responsive component showcase built with React and Vite. It includes a prop-driven
navigation bar, playlist cards, social footer, ticket booking modal, and a dynamic
form used for an IPL fantasy league sign-up.

## Run locally

```bash
npm install
npm run dev
```

## Validate

```bash
npm run lint
npm run build
```

## Components

- `Navbar` accepts `activeLink` and `onNavigate`.
- `PlaylistCard` accepts playlist artwork, name, song count, and mood as props.
- `Footer` accepts a `socialLinks` array with `name`, `href`, and `icon`.
- `Modal` accepts `isOpen`, `onClose`, `title`, and its content as children.
- `DynamicForm` accepts a `fields` array, `title`, `submitLabel`, and `onSubmit`.
