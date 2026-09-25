import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/types/BlogPost';

// Fallback seed posts for graceful offline experience
const FALLBACK_POSTS: BlogPost[] = [
  {
    id: 'fairplay-login-guide',
    slug: 'fairplay-login',
    title: 'Fairplay Login: Your Ultimate Online Cricket Betting ID Provider in India',
    excerpt: 'Step-by-step instructions on accessing your verified Fairplay betting ID, instant login credentials, and fast deposit security.',
    content: [
      'Welcome to FairPlay India — the premier destination for live cricket exchange betting, live casinos, and instant VIP IDs.',
      '## How to Access Your Fairplay Betting Account',
      'Getting started on FairPlay takes less than 2 minutes. Whether you are looking for live IPL odds, International T20 leagues, or live dealer casino tables, your verified login ID grants you instant access to India\'s highest betting odds and fastest payout system.',
      '## Key Features of FairPlay Login',
      '1. **Instant WhatsApp Login**: Request your ID directly via our verified WhatsApp desk without complicated paperwork.',
      '2. **Fast UPI Deposits & 2-Minute Withdrawals**: Deposit via PhonePe, GPay, Paytm, or IMPS and withdraw your winnings instantly.',
      '3. **300% Welcome Bonus**: Claim an exclusive bonus on your first qualifying deposit.',
      '## Security & 24/7 Support',
      'FairPlay ensures bank-grade 256-bit encryption on all player balances and transactions. Our official WhatsApp support team is available 24/7/365 to assist with passwords, deposits, and game rules.'
    ],
    cover_image: '/images/blog-online-cricket-betting.jpg',
    author: 'FairPlay Sports Desk',
    category: 'Betting Guides',
    status: 'published',
    reading_time_minutes: 4,
    tags: ['Fairplay Login', 'Cricket ID', 'WhatsApp Support'],
    created_at: new Date().toISOString(),
    published_at: new Date().toISOString(),
  },
  {
    id: 'fairplay-ipl-2026-guide',
    slug: 'fairplay-ipl-2026',
    title: 'Fairplay 2026: Best Cricket Betting Exchange & Odds Guide in India',
    excerpt: 'How back and lay betting exchange works for IPL 2026, market margins, and strategic insights for serious cricket bettors.',
    content: [
      'IPL 2026 promises to be the biggest cricket tournament of the year. To maximize your profits, understanding cricket exchange betting is essential.',
      '## Back vs Lay: How Exchange Betting Works',
      'Unlike traditional bookmakers where you bet against the house, FairPlay\'s exchange allows you to bet against other players with zero unfair margins. You can **Back** (bet on a team to win) or **Lay** (bet against an outcome).',
      '## Top IPL 2026 Markets on FairPlay',
      '- Match Winner & Tournament Champion',
      '- Session Runs & Over-by-Over Live Odds',
      '- Top Batsman & Top Bowler Markets',
      '- Toss Winner & Player Performance Points'
    ],
    cover_image: '/images/blog-cricket-betting-exchange.jpg',
    author: 'FairPlay Analytics',
    category: 'Exchange Trading',
    status: 'published',
    reading_time_minutes: 5,
    tags: ['IPL 2026', 'Betting Exchange', 'Cricket Odds'],
    created_at: new Date().toISOString(),
    published_at: new Date().toISOString(),
  },
  {
    id: 'fairplay-casino-guide',
    slug: 'fairplay-features',
    title: 'Fairplay Live Casino & Online Game Betting Strategies',
    excerpt: 'Explore popular live tables including Teen Patti, Roulette, Dragon Tiger, and Rummy with real-time dealers.',
    content: [
      'FairPlay Live Casino brings world-class gaming tables directly to your mobile screen with live HD streaming and real Hindi-speaking dealers.',
      '## Top Live Casino Games Available 24/7',
      '- **Live Teen Patti**: Play standard 3-card poker, Muflis, and AK47 variations.',
      '- **Live Roulette**: European, American, and Lightning Roulette with up to 500x multipliers.',
      '- **Dragon Tiger**: High-speed, 2-card baccarat gameplay designed for instant wins.',
      '- **Andar Bahar**: India\'s favourite traditional card game with thrilling side bets.'
    ],
    cover_image: '/images/blog-casino-game-betting.jpg',
    author: 'FairPlay Casino Desk',
    category: 'Casino & Arcade',
    status: 'published',
    reading_time_minutes: 4,
    tags: ['Live Casino', 'Teen Patti', 'Roulette'],
    created_at: new Date().toISOString(),
    published_at: new Date().toISOString(),
  }
];

// Projected fields for fast card feeds (avoids downloading huge paragraphs)
const LIST_PROJECTION =
  'id, slug, title, excerpt, cover_image, author, category, status, reading_time_minutes, tags, published_at, created_at';

// SWR In-Memory Cache
interface CacheEntry<T> {
  data: T;
  cachedAt: number;
}
let postsListCache: CacheEntry<BlogPost[]> | null = null;
const postDetailCache = new Map<string, CacheEntry<BlogPost>>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function fetchPublishedPosts(force = false): Promise<BlogPost[]> {
  const now = Date.now();

  // Instant SWR Cache Hit (0ms)
  if (!force && postsListCache && now - postsListCache.cachedAt < CACHE_TTL_MS) {
    return postsListCache.data;
  }

  try {
    const { data, error } = await supabase
      .from('fairplay_posts')
      .select(LIST_PROJECTION)
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      const posts = data as BlogPost[];
      postsListCache = { data: posts, cachedAt: now };
      return posts;
    }
    if (error) {
      console.warn('[blogService] Supabase fetch error, fallback active:', error.message);
    }
  } catch (err) {
    console.warn('[blogService] Network error fetching posts:', err);
  }

  if (postsListCache) return postsListCache.data;
  return FALLBACK_POSTS;
}

export async function fetchPostBySlug(slug: string, force = false): Promise<BlogPost | null> {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  const now = Date.now();

  // Instant Cache Hit for single post reader (0ms)
  const cached = postDetailCache.get(cleanSlug);
  if (!force && cached && now - cached.cachedAt < CACHE_TTL_MS) {
    return cached.data;
  }

  try {
    const { data, error } = await supabase
      .from('fairplay_posts')
      .select('*')
      .eq('slug', cleanSlug)
      .eq('status', 'published')
      .maybeSingle();

    if (!error && data) {
      const post = data as BlogPost;
      postDetailCache.set(cleanSlug, { data: post, cachedAt: now });
      return post;
    }
  } catch (err) {
    console.warn('[blogService] Error fetching post by slug:', err);
  }

  // Check fallback
  const match = FALLBACK_POSTS.find((p) => p.slug === cleanSlug);
  return match || null;
}
