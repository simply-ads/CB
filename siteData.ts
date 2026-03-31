export type Article = {
  slug: string;
  title: string;
  teaser: string;
  destination: string;
  decade: string;
  readTime: string;
};

export const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Destinations', path: '/destinations' },
  { label: 'Stars', path: '/stars' },
  { label: 'Films', path: '/films' },
  { label: 'Decades', path: '/decades' },
  { label: 'Shop', path: '/shop' },
  { label: 'About', path: '/about' },
  { label: 'Newsletter', path: '/newsletter' },
];

export const stars = [
  'Ava Gardner',
  'Frank Sinatra',
  'Elizabeth Taylor',
  'Grace Kelly',
  'Cary Grant',
  'Humphrey Bogart',
  'Robert Mitchum',
  'Brigitte Bardot',
];

export const launchArticles: Article[] = [
  {
    slug: 'greatest-swimming-pools-classic-hollywood',
    title: 'Greatest Swimming Pools of Classic Hollywood',
    teaser: 'From the Beverly Hills Hotel to Splendido Portofino.',
    destination: 'USA / Italy',
    decade: '1950s',
    readTime: '12 min read',
  },
  {
    slug: 'ultimate-frank-sinatra-travel-guide',
    title: 'Ultimate Frank Sinatra Travel Guide',
    teaser: 'Atlantic City, Hoboken, Vegas, Palm Springs, and beyond.',
    destination: 'USA / Hawaii',
    decade: '1940s–1960s',
    readTime: '14 min read',
  },
  {
    slug: 'bob-mitchum-music-career-homage',
    title: "Bob Mitchum's Music Career: A Humble Homage",
    teaser: 'Calypso, Nashville sessions, and cinematic detours.',
    destination: 'Trinidad / USA',
    decade: '1950s',
    readTime: '9 min read',
  },
  {
    slug: 'classic-movies-inspire-travel',
    title: 'Classic Movies That Will Inspire You to Travel',
    teaser: '23 films across Rome, Paris, Morocco, Kenya, and Hong Kong.',
    destination: 'Global',
    decade: '1930s–1960s',
    readTime: '18 min read',
  },
  {
    slug: 'becoming-carmen-hollywood-flamenco',
    title: 'Becoming Carmen: Hollywood, Flamenco & Spanish Tourism',
    teaser: 'Rita Hayworth, mythology, and the making of Spanish romance.',
    destination: 'Spain',
    decade: '1940s–1950s',
    readTime: '11 min read',
  },
  {
    slug: 'best-flamenco-performances-classic-cinema',
    title: '10 Best Flamenco Performances from Classic Cinema',
    teaser: 'A curated watchlist of movement, drama, and costume.',
    destination: 'Spain',
    decade: '1940s–1960s',
    readTime: '8 min read',
  },
  {
    slug: 'history-of-hearst-castle',
    title: 'Classic Hollywood History of Hearst Castle',
    teaser: 'Parties, pools, and the social architecture of stardom.',
    destination: 'California',
    decade: '1930s–1950s',
    readTime: '13 min read',
  },
  {
    slug: 'ava-gardner-travel-guide',
    title: 'Ultimate Ava Gardner Travel Guide',
    teaser: 'Tossa de Mar, Madrid, Portofino, London.',
    destination: 'Spain / Italy / UK',
    decade: '1950s',
    readTime: '10 min read',
  },
  {
    slug: 'elizabeth-taylor-travel-guide-europe',
    title: 'Ultimate Elizabeth Taylor Travel Guide — Europe',
    teaser: 'Rome, Portofino, Gstaad, London, Paris.',
    destination: 'Italy / Switzerland / France / UK',
    decade: '1950s–1960s',
    readTime: '12 min read',
  },
  {
    slug: 'elizabeth-taylor-travel-guide-americas',
    title: 'Ultimate Elizabeth Taylor Travel Guide — Americas',
    teaser: 'Beverly Hills, Puerto Vallarta, New York.',
    destination: 'USA / Mexico',
    decade: '1950s–1960s',
    readTime: '11 min read',
  },
];

export const destinations = [
  'France',
  'Spain',
  'Italy',
  'USA',
  'Cuba',
  'Kenya',
  'UK',
  'Croatia',
  'Switzerland',
  'Dominican Republic',
  'Mexico',
];
