export const CHARM_CATEGORIES = [
  {
    id: 'Lucky Horseshoe',
    title: 'Lucky Horseshoe',
    image: require('../../assets/images/ladysmoodcat1.png'),
    quotes: [
      'Let your hair down — let it breathe with you.',
      'Put on a song you love and dance a little.',
      'Drink something warm from a nice cup.',
      'Take a deep breath. And another.',
      'Smile at yourself in the mirror.',
      'Write a simple “how are you?” to a friend.',
      'Go outside, even for a moment.',
      'Look at the sky — it’s always beautiful.',
    ],
  },
  {
    id: 'Amulet Drop',
    title: 'Amulet Drop',
    image: require('../../assets/images/ladysmoodcat2.png'),
    quotes: [
      'Take a photo of something that makes you happy right now.',
      'Wear something that makes you feel good.',
      'Pet a cat or dog, if you have one.',
      'Wash your face with cool water.',
      'Allow yourself to simply do nothing.',
      'Listen to the rain or silence — whichever is more pleasant.',
      'Light a candle with a nice scent.',
      'Write down 3 things you’re grateful for today.',
    ],
  },
  {
    id: 'Crystal Orb',
    title: 'Crystal Orb',
    image: require('../../assets/images/ladysmoodcat3.png'),
    quotes: [
      'Straighten your back — it’s easier to breathe right away.',
      'Have a small snack with something tasty.',
      'Remember a moment when you laughed to tears.',
      'Say your name gently — it’s beautiful.',
      'Put on your favorite jewelry just like that.',
      'Open a window and feel the air on your skin.',
      'Hug someone or a blanket.',
      'Remember how much you’ve changed — and that’s beautiful.',
    ],
  },
  {
    id: 'Lucky Clover',
    title: 'Lucky Clover',
    image: require('../../assets/images/ladysmoodcat4.png'),
    quotes: [
      'Compliment yourself mentally.',
      'Say “thank you” even for the smallest thing.',
      'Look through old photos, but without sadness.',
      'Turn off your phone and just be with yourself.',
      'Drink water — seriously, it helps.',
      'Smile for no reason — it’s magical.',
    ],
  },
];

export const CHARM_QUIZ_QUESTIONS = {
  'Lucky Horseshoe': [
    {
      q: 'How do you feel about today?',
      opts: ['Optimistic', 'Neutral', 'I want it to end'],
    },
    {
      q: 'What is your luck today?',
      opts: ['Good mood', 'Coffee without a queue', `I don't know`],
    },
    {
      q: 'How do you react to small setbacks?',
      opts: ['Laughing', 'Sighing', 'Angry'],
    },
    {
      q: 'If there was a song today —',
      opts: ['Dancing', 'Calm', 'Melancholy'],
    },
    {
      q: 'Do you feel like the day will be successful?',
      opts: ['Yes', `We'll see`, 'Unlikely'],
    },
  ],
  'Amulet Drop': [
    { q: 'How do you recharge yourself?', opts: ['Coffee', 'Music', 'Quiet'] },
    {
      q: 'What will help you right now?',
      opts: ['A walk', 'A movie', 'Sleep'],
    },
    { q: 'What is your pace today?', opts: ['Calm', 'Active', 'Lazy'] },
    { q: 'Your inner state now —', opts: ['Balance', 'Energy', 'Distracted'] },
    {
      q: 'What will calm you down today?',
      opts: ['Shower', 'Warm tea', 'Someone close'],
    },
  ],
  'Crystal Orb': [
    { q: `What's on your mind today?`, opts: ['Dreams', 'Silence', 'Chaos'] },
    { q: 'What is your wish for this day?', opts: ['Joy', 'Balance', 'Peace'] },
    {
      q: 'How do you perceive this day?',
      opts: ['Like a miracle', 'Like a challenge', 'Like a Monday'],
    },
    {
      q: 'What do you want to feel right now?',
      opts: ['Inspiration', 'Peace', 'Warmth'],
    },
    {
      q: 'How much do you believe in your luck today?',
      opts: ['100%', 'A little', 'Zero'],
    },
  ],
  'Lucky Clover': [
    { q: 'How are you feeling today?', opts: ['Great', 'So-so', 'Tired'] },
    { q: 'What is your mood this morning?', opts: ['Sunny', 'Calm', 'Grumpy'] },
    {
      q: 'What do you want most right now?',
      opts: ['To relax', 'To communicate', 'To disappear under the covers'],
    },
    {
      q: 'What kind of day is in store for you?',
      opts: ['Happy', 'Normal', 'Cloudy'],
    },
    { q: 'Do you want a hug today?', opts: ['Very', 'Maybe', 'Not right now'] },
  ],
};
