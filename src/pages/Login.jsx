import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Scissors } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600)); // slight artificial delay for UX
    const result = login(email, password);
    setLoading(false);
    if (!result.ok) setError(result.error);
  };

  const demoLogin = (role) => {
    const creds = {
      owner: { email: 'owner@salon.com', password: 'owner123' },
      manager: { email: 'manager@salon.com', password: 'manager123' },
      receptionist: { email: 'reception@salon.com', password: 'reception123' },
    };
    setEmail(creds[role].email);
    setPassword(creds[role].password);
  };

  const inputClass = 'w-full bg-elevated border border-border px-4 py-3.5 rounded-lg text-sm text-primary placeholder:text-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all font-ui';

  return (
    <div className="min-h-screen bg-base flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-accent-rose/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold/10 border border-gold/30 mb-6 shadow-[0_0_30px_rgba(201,168,76,0.2)]">
            <Scissors className="w-6 h-6 text-gold" />
          </div>
          <h1 className="text-5xl font-display text-gold tracking-[0.2em] uppercase drop-shadow-[0_0_20px_rgba(201,168,76,0.3)] mb-2">Salon OS</h1>
          <p className="text-secondary text-sm tracking-widest uppercase">Luxury Salon Management</p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-display text-primary mb-1">Welcome back</h2>
          <p className="text-sm text-secondary mb-8">Sign in to your salon dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[10px] text-muted uppercase tracking-widest font-semibold block mb-2">Email Address</label>
              <input
                type="email" required value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@yoursalon.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-[10px] text-muted uppercase tracking-widest font-semibold block mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'} required value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputClass + ' pr-12'}
                />
                <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-gold transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-accent-rose/10 border border-accent-rose/30 rounded-lg px-4 py-2.5 text-accent-rose text-sm animate-in fade-in duration-300">
                {error}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              className="w-full bg-gold hover:bg-gold-light text-bg-base font-semibold py-3.5 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(201,168,76,0.25)] hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-bg-base/40 border-t-bg-base rounded-full animate-spin" />
              ) : 'Sign In'}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-[10px] text-muted uppercase tracking-widest font-semibold mb-3 text-center">Quick Demo Sign-in</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Owner', role: 'owner', color: 'text-gold border-gold/30 hover:bg-gold/10' },
                { label: 'Manager', role: 'manager', color: 'text-accent-mint border-accent-mint/30 hover:bg-accent-mint/10' },
                { label: 'Reception', role: 'receptionist', color: 'text-accent-rose border-accent-rose/30 hover:bg-accent-rose/10' },
              ].map(b => (
                <button key={b.role} onClick={() => demoLogin(b.role)} className={`border rounded-lg py-2 text-xs font-semibold transition-all ${b.color}`}>
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted mt-6">Secure workspace · Version 1.0</p>
      </div>
    </div>
  );
}
