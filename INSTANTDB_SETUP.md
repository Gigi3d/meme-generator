# InstantDB Setup Guide

This guide will help you set up InstantDB for the Meme Generator application.

## 1. Create InstantDB Account

1. Go to [https://instantdb.com](https://instantdb.com)
2. Sign up for an account
3. Create a new app

## 2. Get Your App ID

1. In your InstantDB dashboard, navigate to your app
2. Copy your App ID
3. Add it to your `.env.local` file:
   ```
   NEXT_PUBLIC_INSTANT_APP_ID=your_app_id_here
   ```

## 3. Set Up Database Schema

In your InstantDB dashboard, create the following tables:

### users
- `id` (string, primary key)
- `email` (string)
- `name` (string, optional)
- `avatar` (string, optional)
- `createdAt` (number)

### memes
- `id` (string, primary key)
- `imageUrl` (string)
- `topText` (string, optional)
- `bottomText` (string, optional)
- `creatorId` (string, foreign key → users.id)
- `points` (number, default: 0)
- `createdAt` (number)
- `templateId` (string, optional)

### votes
- `id` (string, primary key)
- `memeId` (string, foreign key → memes.id)
- `userId` (string, foreign key → users.id)
- `type` (string: "upvote" | "downvote")
- `createdAt` (number)
- Unique constraint: (memeId, userId)

### comments
- `id` (string, primary key)
- `memeId` (string, foreign key → memes.id)
- `userId` (string, foreign key → users.id)
- `text` (string)
- `createdAt` (number)

### meme_templates (optional - for caching templates)
- `id` (string, primary key)
- `imageUrl` (string)
- `name` (string)
- `category` (string: "crypto" | "developer" | "general")
- `popularity` (number)

## 4. Configure Permissions

Set up the following permission rules in InstantDB:

### memes
```javascript
{
  read: true, // Public read
  write: (auth, data) => {
    // Only authenticated users can create
    if (!auth.id) return false;
    // Users can only update their own memes
    return auth.id === data.creatorId;
  }
}
```

### votes
```javascript
{
  read: true, // Public read
  write: (auth) => !!auth.id // Authenticated only
}
```

### comments
```javascript
{
  read: true, // Public read
  write: (auth) => !!auth.id // Authenticated only
}
```

### users
```javascript
{
  read: true, // Public read
  write: (auth, data) => auth.id === data.id // Users can only update themselves
}
```

## 5. Configure Authentication

1. In InstantDB dashboard, go to Authentication settings
2. Enable Magic Link authentication
3. Enable OAuth providers (Google, GitHub) if desired
4. Configure redirect URLs:
   - Development: `http://localhost:3000`
   - Production: `https://your-domain.vercel.app`

## 6. Set Up Storage (Optional)

For production, you may want to set up InstantDB storage for meme images:

1. Go to Storage settings in InstantDB dashboard
2. Create a bucket for meme images
3. Configure permissions for authenticated users to upload
4. Update the `handleSave` function in `app/create/page.tsx` to upload images to storage

## 7. Test Your Setup

1. Start your development server: `npm run dev`
2. Try signing in with magic link or OAuth
3. Create a meme
4. Verify it appears in the feed
5. Test voting and commenting

## Troubleshooting

- **"App ID not found"**: Make sure `NEXT_PUBLIC_INSTANT_APP_ID` is set in your `.env.local` file
- **Authentication not working**: Check your redirect URLs in InstantDB dashboard
- **Permission errors**: Verify your permission rules match the examples above
- **Real-time updates not working**: Ensure you're using `useQuery` from `@instantdb/react` correctly

