// Role → allowed sidebar paths
export const ROLE_ACCESS = {
  owner: 'ALL',
  manager: [
    '/', '/appointments', '/clients', '/loyalty', '/giftcards', '/feedback',
    '/calendar', '/staff', '/inventory', '/invoices', '/forms',
    '/sales', '/reports', '/marketing',
  ],
  receptionist: [
    '/', '/appointments', '/clients', '/feedback',
    '/calendar', '/invoices',
  ],
};

export const ROLE_LABELS = {
  owner:        '👑 Owner',
  manager:      '🎯 Manager',
  receptionist: '📋 Receptionist',
};

export const ROLE_COLORS = {
  owner:        'text-gold border-gold/30 bg-gold/10',
  manager:      'text-accent-mint border-accent-mint/30 bg-accent-mint/10',
  receptionist: 'text-accent-rose border-accent-rose/30 bg-accent-rose/10',
};

export function canAccess(role, path) {
  if (!role) return false;
  const access = ROLE_ACCESS[role];
  if (access === 'ALL') return true;
  return access?.includes(path) ?? false;
}
