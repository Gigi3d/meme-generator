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

## Prerequisites

- Node.js 18+ and npm
- An InstantDB account ([sign up here](https://instantdb.com))

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Gigi3d/meme-generator.git
cd meme-generator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up InstantDB

1. Create an account at [InstantDB](https://instantdb.com)
2. Create a new app in the dashboard
3. Copy your App ID

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_INSTANT_APP_ID=your_instant_app_id_here
```

**Note**: The app includes a fallback App ID for development, but you should use your own for production.

### 5. Push Schema and Permissions to InstantDB

The project includes schema and permission definitions in `instant.schema.ts` and `instant.perms.ts`. Push them to InstantDB using the CLI:

```bash
# Login to InstantDB (will open browser for authentication)
npx instant-cli login

# Push the database schema
npx instant-cli push

# Push the permission rules
npx instant-cli push perms
```

This will create the following tables:
- **users**: User accounts (email, name, avatar, createdAt)
- **memes**: Meme posts (imageUrl, topText, bottomText, creatorId, points, createdAt, templateId)
- **votes**: User votes on memes (memeId, userId, type, createdAt)
- **comments**: Comments on memes (memeId, userId, text, createdAt)
- **meme_templates**: Meme templates (imageUrl, name, category, popularity)

### 6. Configure Authentication

1. Go to [InstantDB Dashboard](https://instantdb.com/dash)
2. Select your app
3. Navigate to **Authentication** settings
4. Enable **Magic Link** authentication
5. (Optional) Enable **OAuth** providers (Google, GitHub)
6. Configure redirect URLs:
   - Development: `http://localhost:3000`
   - Production: Your production URL (when deployed)

### 7. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Running the App

### Development Mode

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variable `NEXT_PUBLIC_INSTANT_APP_ID` in Vercel dashboard
4. Update InstantDB authentication redirect URLs to include your production domain
5. Deploy!

The app will automatically build and deploy. Make sure your InstantDB app has the correct redirect URLs configured for your production domain.

## Project Structure

```
meme-generator/
├── app/
│   ├── layout.tsx          # Root layout with InstantProvider
│   ├── page.tsx            # Redirects to /feed
│   ├── feed/               # Feed page
│   ├── create/             # Meme creation page
│   ├── profile/[userId]/   # User profile pages
│   └── api/templates/      # Templates API route
├── components/
│   ├── Auth/              # Authentication components
│   ├── Meme/              # Meme editor and template selector
│   ├── Feed/              # Feed components
│   ├── Comments/          # Comment components
│   ├── Voting/            # Voting components
│   └── Header.tsx         # Navigation header
├── lib/
│   ├── instant.ts         # InstantDB client configuration
│   ├── templates.ts       # Meme template data
│   └── utils.ts           # Utility functions
├── types/
│   └── index.ts           # TypeScript types
├── instant.schema.ts      # InstantDB database schema definition
├── instant.perms.ts       # InstantDB permission rules
└── .env.local             # Environment variables (not in git)
```

## Database Schema

The app uses InstantDB with the following schema:

- **users**: User accounts with email, name, avatar, and timestamps
- **memes**: Meme posts with image URLs, text overlays, creator references, and points
- **votes**: User votes on memes (upvote/downvote)
- **comments**: Comments on memes with user references
- **meme_templates**: Predefined meme templates with categories

All relationships are properly configured with forward and reverse links for efficient queries.

## Permissions

The app implements the following access rules:

- **Public Read**: All tables are publicly readable (anyone can view content)
- **Authenticated Write**: Only authenticated users can create content
- **Ownership**: Users can only update/delete their own content (memes, votes, comments)
- **Security**: Unauthorized attribute creation is blocked

## Troubleshooting

### Schema Not Found Error
```bash
# Make sure you've pushed the schema
npx instant-cli push
```

### Permission Errors
```bash
# Push the permissions
npx instant-cli push perms
```

### Authentication Not Working
- Check that Magic Link or OAuth is enabled in InstantDB dashboard
- Verify redirect URLs are correctly configured (localhost:3000 for dev)
- Ensure `NEXT_PUBLIC_INSTANT_APP_ID` is set correctly

### App ID Not Found
- The app includes a fallback App ID for development
- For production, always set `NEXT_PUBLIC_INSTANT_APP_ID` in your environment variables

## Notes

- Meme images are currently stored as data URLs. For production, consider uploading to InstantDB storage buckets or a CDN
- The app uses InstantDB's real-time capabilities for live updates (no polling needed)
- Guest users can view the feed but need to sign in to create, vote, or comment
- The schema and permissions are version-controlled in `instant.schema.ts` and `instant.perms.ts`
