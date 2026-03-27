import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Star, MessageSquare, ThumbsUp, Filter, Search } from 'lucide-react';

const MOCK_REVIEWS = [
  { id: 1, client: 'Priya Sharma', avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Priya', rating: 5, comment: 'Absolutely magical experience. Meera transformed my hair completely and I walked out feeling like a queen. Will definitely be back!', staff: 'Meera K.', service: 'Keratin Treatment', date: '2 days ago' },
  { id: 2, client: 'Anjali Mehta', avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Anjali', rating: 4, comment: 'Great experience overall. The ambiance is stunning and the service was top notch. Could be improved slightly on wait time.', staff: 'Sunita R.', service: 'Advanced Facial', date: '4 hours ago' },
  { id: 3, client: 'Kavya Pillai', avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Kavya', rating: 5, comment: 'My hair has never looked this good. The products they used are incredible and I can already feel the difference.', staff: 'Pooja D.', service: 'Hair Spa', date: 'Yesterday' },
  { id: 4, client: 'Sunita Rao', avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Sunita', rating: 3, comment: 'Service was decent but we had to wait 30 minutes past our scheduled appointment. The result was good but the wait was frustrating.', staff: 'Raj S.', service: 'Global Hair Color', date: '3 days ago' },
  { id: 5, client: 'Divya Kumar', avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Divya', rating: 5, comment: 'Premium experience from start to finish. The salon has such an incredible vibe and every single staff member was polite and professional.', staff: 'Meera K.', service: 'Balayage', date: '1 week ago' },
];

const RATING_DIST = [
  { stars: 5, count: 68, pct: 72 },
  { stars: 4, count: 15, pct: 16 },
  { stars: 3, count: 7, pct: 7 },
  { stars: 2, count: 3, pct: 3 },
  { stars: 1, count: 1, pct: 1 },
];

export default function Feedback() {
  const [filterRating, setFilterRating] = useState(0);

  const filtered = filterRating === 0 ? MOCK_REVIEWS : MOCK_REVIEWS.filter(r => r.rating === filterRating);

  return (
    <div className="animate-in fade-in duration-700 h-full flex flex-col pb-6">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display text-primary tracking-widest uppercase mb-1">Client Feedback</h2>
          <p className="text-sm text-secondary tracking-wide">Reviews, ratings, and satisfaction scores</p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input type="text" placeholder="Search feedback..." className="pl-9 pr-4 py-2 bg-card border border-border rounded-pill text-sm text-primary focus:outline-none focus:border-gold w-56 transition-all" />
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* Overall Score */}
        <Card className="col-span-3 flex flex-col items-center justify-center text-center gap-3">
          <p className="text-[10px] text-muted uppercase tracking-widest font-semibold">Overall Rating</p>
          <p className="text-7xl font-display text-gold">4.6</p>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < 5 ? 'fill-gold text-gold' : 'text-muted'}`} />
            ))}
          </div>
          <p className="text-xs text-secondary">{MOCK_REVIEWS.length * 6}+ reviews</p>
        </Card>

        {/* Rating distribution */}
        <Card className="col-span-5 flex flex-col justify-center gap-3">
          <p className="text-[10px] text-muted uppercase tracking-widest font-semibold mb-2">Rating Distribution</p>
          {RATING_DIST.map(r => (
            <button key={r.stars} onClick={() => setFilterRating(filterRating === r.stars ? 0 : r.stars)} className="flex items-center gap-3 group">
              <div className="flex shrink-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < r.stars ? 'fill-gold text-gold' : 'text-muted'}`} />
                ))}
              </div>
              <div className="flex-1 h-2 bg-elevated rounded-full overflow-hidden">
                <div className={`h-full bg-gold rounded-full transition-all duration-700 ${filterRating === r.stars ? 'brightness-125' : 'group-hover:brightness-110'}`} style={{ width: `${r.pct}%` }} />
              </div>
              <span className="text-xs font-mono text-secondary w-10 text-right">{r.count}</span>
            </button>
          ))}
        </Card>

        {/* Quick stats */}
        <div className="col-span-4 flex flex-col gap-4">
          <Card className="flex items-center gap-4 flex-1">
            <div className="w-10 h-10 rounded-full bg-accent-mint/10 flex items-center justify-center text-accent-mint"><ThumbsUp className="w-5 h-5" /></div>
            <div>
              <p className="text-[10px] text-muted uppercase tracking-widest font-semibold">Response Rate</p>
              <p className="text-2xl font-display text-primary">78%</p>
            </div>
          </Card>
          <Card className="flex items-center gap-4 flex-1">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold"><MessageSquare className="w-5 h-5" /></div>
            <div>
              <p className="text-[10px] text-muted uppercase tracking-widest font-semibold">NPS Score</p>
              <p className="text-2xl font-display text-primary">82 <span className="text-sm text-accent-mint font-ui">Excellent</span></p>
            </div>
          </Card>
        </div>
      </div>

      {filterRating > 0 && (
        <div className="flex items-center gap-2 mb-4 text-sm">
          <span className="text-muted">Filtered to:</span>
          <div className="flex items-center gap-1 bg-gold/10 border border-gold/30 px-3 py-1 rounded-pill text-gold text-xs font-semibold">
            {filterRating} stars
            <button onClick={() => setFilterRating(0)} className="ml-2 hover:text-primary">✕</button>
          </div>
        </div>
      )}

      <div className="flex-1 space-y-4 overflow-y-auto scrollbar-hide">
        {filtered.map(r => (
          <Card key={r.id} className="flex gap-5 hover:border-gold/20 transition-colors">
            <img src={r.avatar} alt="" className="w-12 h-12 rounded-full border border-border shrink-0 mt-1" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-semibold text-primary mr-3">{r.client}</span>
                  <span className="text-xs text-muted">{r.service} with {r.staff}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} className={`w-4 h-4 ${si < r.rating ? 'fill-gold text-gold' : 'text-muted'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-muted">{r.date}</span>
                </div>
              </div>
              <p className="text-sm text-secondary leading-relaxed italic">"{r.comment}"</p>
              <div className="flex gap-2 mt-3">
                <Button variant="secondary" className="text-[10px] py-1 px-3 h-auto">Reply</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
