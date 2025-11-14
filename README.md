# Meme Generator

A comprehensive meme generator built with Next.js 16, InstantDB, and deployed on Vercel.

## Features

- **Create Page**: Upload custom images, add text overlays, and choose from preloaded meme templates (crypto/developer focused)
- **Feed Page**: Masonry/Pinterest-style layout displaying all memes with real-time updates
- **Voting System**: Upvote/downvote memes (1 upvote = 10 points). Users can vote multiple times and change votes
- **Comments**: Add comments on memes (authenticated users only)
- **User Profiles**: View user profiles showing created memes and stats
- **Authentication**: InstantDB built-in auth (magic link + OAuth). Guest users can view feed but need auth for actions

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database & Auth**: InstantDB
- **Canvas Editing**: react-konva
- **Layout**: react-masonry-css
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up InstantDB:
   - Create an account at [InstantDB](https://instantdb.com)
   - Create a new app
   - Get your App ID

4. Create a `.env.local` file:
   ```
   NEXT_PUBLIC_INSTANT_APP_ID=your_instant_app_id_here
   ```

5. Set up InstantDB schema:
   - Go to your InstantDB dashboard
   - Create the following tables:
     - `users` (id, email, name?, avatar?, createdAt)
     - `memes` (id, imageUrl, topText?, bottomText?, creatorId, points, createdAt, templateId?)
     - `votes` (id, memeId, userId, type, createdAt)
     - `comments` (id, memeId, userId, text, createdAt)
     - `meme_templates` (id, imageUrl, name, category, popularity)

6. Configure permissions in InstantDB:
   - `memes`: Public read, authenticated write
   - `votes`: Public read, authenticated write
   - `comments`: Public read, authenticated write
   - `users`: Public read

7. Run the development server:
   ```bash
   npm run dev
   ```

8. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variable `NEXT_PUBLIC_INSTANT_APP_ID` in Vercel dashboard
4. Deploy!

## Project Structure

```
meme-generator/
├── app/
│   ├── layout.tsx          # Root layout with InstantProvider
│   ├── page.tsx            # Redirects to /feed
│   ├── feed/               # Feed page
│   ├── create/             # Meme creation page
│   ├── profile/[userId]/  # User profile pages
│   └── api/templates/     # Templates API route
├── components/
│   ├── Auth/              # Authentication components
│   ├── Meme/              # Meme editor and template selector
│   ├── Feed/              # Feed components
│   ├── Comments/          # Comment components
│   ├── Voting/            # Voting components
│   └── Header.tsx         # Navigation header
├── lib/
│   ├── instant.ts         # InstantDB client
│   ├── templates.ts       # Meme template data
│   └── utils.ts           # Utility functions
└── types/
    └── index.ts           # TypeScript types
```

## Notes

- Meme images are currently stored as data URLs. For production, consider uploading to InstantDB storage buckets
- The app uses InstantDB's real-time capabilities for live updates
- Guest users can view the feed but need to sign in to create, vote, or comment
