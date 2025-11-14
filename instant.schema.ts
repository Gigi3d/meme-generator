import { i } from '@instantdb/core';

const schema = i.schema({
  entities: {
    users: i.entity({
      email: i.string().indexed(),
      name: i.string().optional(),
      avatar: i.string().optional(),
      createdAt: i.number(),
    }),
    memes: i.entity({
      imageUrl: i.string(),
      topText: i.string().optional(),
      bottomText: i.string().optional(),
      creatorId: i.string(),
      points: i.number(),
      createdAt: i.number(),
      templateId: i.string().optional(),
    }),
    votes: i.entity({
      memeId: i.string(),
      userId: i.string(),
      type: i.string(), // "upvote" | "downvote"
      createdAt: i.number(),
    }),
    comments: i.entity({
      memeId: i.string(),
      userId: i.string(),
      text: i.string(),
      createdAt: i.number(),
    }),
    meme_templates: i.entity({
      imageUrl: i.string(),
      name: i.string(),
      category: i.string(), // "crypto" | "developer" | "general"
      popularity: i.number(),
    }),
  },
  links: {
    memeCreator: {
      forward: {
        on: 'memes',
        has: 'one',
        label: 'creator',
      },
      reverse: {
        on: 'users',
        has: 'many',
        label: 'memes',
      },
    },
    memeVotes: {
      forward: {
        on: 'votes',
        has: 'many',
        label: 'meme',
      },
      reverse: {
        on: 'memes',
        has: 'many',
        label: 'votes',
      },
    },
    memeComments: {
      forward: {
        on: 'comments',
        has: 'many',
        label: 'meme',
      },
      reverse: {
        on: 'memes',
        has: 'many',
        label: 'comments',
      },
    },
    userVotes: {
      forward: {
        on: 'votes',
        has: 'many',
        label: 'user',
      },
      reverse: {
        on: 'users',
        has: 'many',
        label: 'votes',
      },
    },
    userComments: {
      forward: {
        on: 'comments',
        has: 'many',
        label: 'user',
      },
      reverse: {
        on: 'users',
        has: 'many',
        label: 'comments',
      },
    },
  },
});

export default schema;

