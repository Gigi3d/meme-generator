import type { InstantRules } from '@instantdb/react';

const rules = {
  users: {
    allow: {
      view: 'true', // Public read
      create: 'auth.id != null', // Authenticated users can create
      update: 'auth.id == data.id', // Users can only update themselves
      delete: 'auth.id == data.id', // Users can only delete themselves
    },
  },
  memes: {
    allow: {
      view: 'true', // Public read
      create: 'auth.id != null', // Authenticated users can create
      update: 'auth.id == data.creatorId', // Users can only update their own memes
      delete: 'auth.id == data.creatorId', // Users can only delete their own memes
    },
  },
  votes: {
    allow: {
      view: 'true', // Public read
      create: 'auth.id != null', // Authenticated users can create votes
      update: 'auth.id == data.userId', // Users can only update their own votes
      delete: 'auth.id == data.userId', // Users can only delete their own votes
    },
  },
  comments: {
    allow: {
      view: 'true', // Public read
      create: 'auth.id != null', // Authenticated users can create comments
      update: 'auth.id == data.userId', // Users can only update their own comments
      delete: 'auth.id == data.userId', // Users can only delete their own comments
    },
  },
  meme_templates: {
    allow: {
      view: 'true', // Public read
      create: 'auth.id != null', // Authenticated users can create templates
      update: 'auth.id != null', // Authenticated users can update templates
      delete: 'auth.id != null', // Authenticated users can delete templates
    },
  },
  attrs: {
    allow: {
      $default: 'false', // Prevent unauthorized attribute creation
    },
  },
} satisfies InstantRules;

export default rules;

