import { addDays, subDays } from 'date-fns';

const today = new Date();

export const MOCK_STAFF = [
  { id: 's1', name: 'Meera K.', role: 'Senior Stylist', status: 'Present', avatar: 'https://i.pravatar.cc/150?u=meera', rating: 4.9, joinDate: '2022-03-10', specializations: ['Hair Color', 'Keratin'], clientsServed: 142 },
  { id: 's2', name: 'Sunita R.', role: 'Senior Aesthetician', status: 'Present', avatar: 'https://i.pravatar.cc/150?u=sunita', rating: 4.8, joinDate: '2021-11-05', specializations: ['Facial', 'Skin Care'], clientsServed: 128 },
  { id: 's3', name: 'Pooja D.', role: 'Stylist', status: 'On Break', avatar: 'https://i.pravatar.cc/150?u=pooja', rating: 4.6, joinDate: '2023-01-20', specializations: ['Blowout', 'Hair Spa'], clientsServed: 95 },
  { id: 's4', name: 'Raj S.', role: 'Junior Stylist', status: 'Present', avatar: 'https://i.pravatar.cc/150?u=raj', rating: 4.5, joinDate: '2023-08-15', specializations: ['Men Haircut', 'Hair Spa'], clientsServed: 76 },
  { id: 's5', name: 'Anita B.', role: 'Nail Technician', status: 'Left', avatar: 'https://i.pravatar.cc/150?u=anita', rating: 4.7, joinDate: '2022-07-22', specializations: ['Manicure', 'Pedicure'], clientsServed: 110 },
];

export const MOCK_CLIENTS = [
  { id: 'c1', name: 'Priya Sharma', phone: '+91 9876543210', visits: 14, totalSpend: 18400, tier: 'Gold', lastVisit: subDays(today, 5).toISOString(), avatar: 'https://i.pravatar.cc/150?u=c1', joinedAt: '2023-01-10', prefStylist: 's1' },
  { id: 'c2', name: 'Ananya Mehta', phone: '+91 9876543211', visits: 5, totalSpend: 5400, tier: 'Silver', lastVisit: subDays(today, 12).toISOString(), avatar: 'https://i.pravatar.cc/150?u=c2', joinedAt: '2023-05-20', prefStylist: 's2' },
  { id: 'c3', name: 'Riya Patel', phone: '+91 9876543212', visits: 22, totalSpend: 42000, tier: 'Platinum', lastVisit: subDays(today, 2).toISOString(), avatar: 'https://i.pravatar.cc/150?u=c3', joinedAt: '2022-11-15', prefStylist: 's1' },
  { id: 'c4', name: 'Neha Desai', phone: '+91 9876543213', visits: 2, totalSpend: 1500, tier: 'Bronze', lastVisit: subDays(today, 20).toISOString(), avatar: 'https://i.pravatar.cc/150?u=c4', joinedAt: '2024-01-05', prefStylist: 's3' },
  { id: 'c5', name: 'Kavya Iyer', phone: '+91 9876543214', visits: 8, totalSpend: 11200, tier: 'Silver', lastVisit: subDays(today, 8).toISOString(), avatar: 'https://i.pravatar.cc/150?u=c5', joinedAt: '2023-08-10', prefStylist: 's5' },
  { id: 'c6', name: 'Aditya Rao', phone: '+91 9876543215', visits: 12, totalSpend: 9600, tier: 'Silver', lastVisit: subDays(today, 15).toISOString(), avatar: 'https://i.pravatar.cc/150?u=c6', joinedAt: '2023-03-22', prefStylist: 's4' },
  { id: 'c7', name: 'Simran Kaur', phone: '+91 9876543216', visits: 3, totalSpend: 3200, tier: 'Bronze', lastVisit: subDays(today, 25).toISOString(), avatar: 'https://i.pravatar.cc/150?u=c7', joinedAt: '2023-10-18', prefStylist: 's1' },
  { id: 'c8', name: 'Vikram Singh', phone: '+91 9876543217', visits: 6, totalSpend: 4500, tier: 'Bronze', lastVisit: subDays(today, 30).toISOString(), avatar: 'https://i.pravatar.cc/150?u=c8', joinedAt: '2023-09-01', prefStylist: 's4' },
  { id: 'c9', name: 'Roshni Jain', phone: '+91 9876543218', visits: 18, totalSpend: 28000, tier: 'Gold', lastVisit: subDays(today, 3).toISOString(), avatar: 'https://i.pravatar.cc/150?u=c9', joinedAt: '2022-09-11', prefStylist: 's2' },
  { id: 'c10', name: 'Devika Nair', phone: '+91 9876543219', visits: 1, totalSpend: 800, tier: 'Bronze', lastVisit: subDays(today, 1).toISOString(), avatar: 'https://i.pravatar.cc/150?u=c10', joinedAt: '2024-03-20', prefStylist: 's3' },
];

export const MOCK_SERVICES = [
  { id: 'srv1', name: 'Keratin Treatment', category: 'Hair', defaultPrice: 4500, durationMins: 150, color: 'bg-accent-mint' },
  { id: 'srv2', name: 'Hair Color (Global)', category: 'Hair', defaultPrice: 3500, durationMins: 120, color: 'bg-accent-rose' },
  { id: 'srv3', name: 'Blowout', category: 'Hair', defaultPrice: 800, durationMins: 45, color: 'bg-gold-muted' },
  { id: 'srv4', name: 'Advanced Facial', category: 'Skin', defaultPrice: 2000, durationMins: 60, color: 'bg-accent-rose' },
  { id: 'srv5', name: 'Threading & Waxing', category: 'Skin', defaultPrice: 600, durationMins: 30, color: 'bg-gold-muted' },
  { id: 'srv6', name: 'Manicure', category: 'Nails', defaultPrice: 700, durationMins: 45, color: 'bg-accent-mint' },
  { id: 'srv7', name: 'Pedicure', category: 'Nails', defaultPrice: 900, durationMins: 60, color: 'bg-gold' },
  { id: 'srv8', name: 'Hair Spa', category: 'Spa', defaultPrice: 1500, durationMins: 60, color: 'bg-text-secondary' },
];

export const MOCK_PRODUCTS = [
  { id: 'p1', brand: "L'Oréal", name: 'Pro Keratin Shampoo', category: 'Haircare', stock: 12, cost: 600, retail: 850, alertThreshold: 5, lastRestocked: '2024-03-01' },
  { id: 'p2', brand: "L'Oréal", name: 'Pro Keratin Masque', category: 'Haircare', stock: 8, cost: 750, retail: 1050, alertThreshold: 10, lastRestocked: '2024-02-15' },
  { id: 'p3', brand: "Wella", name: 'Luminous Oil Reflections', category: 'Serum', stock: 4, cost: 500, retail: 800, alertThreshold: 5, lastRestocked: '2024-03-10' },
  { id: 'p4', brand: "Schwarzkopf", name: 'Bonacure Color Freeze', category: 'Haircare', stock: 15, cost: 800, retail: 1100, alertThreshold: 8, lastRestocked: '2024-03-12' },
  { id: 'p5', brand: "OPI", name: 'Nail Lacquer (Red)', category: 'Nails', stock: 2, cost: 300, retail: 500, alertThreshold: 5, lastRestocked: '2024-01-20' },
  { id: 'p6', brand: "Biotique", name: 'Bio Gold Facial Kit', category: 'Skincare', stock: 20, cost: 400, retail: 650, alertThreshold: 10, lastRestocked: '2024-03-05' },
];

// Generate 30 days of mock appointments and transactions
export const generateMockAppointments = () => {
  const appointments = [];
  const transactions = [];
  
  for (let i = 0; i < 30; i++) {
    const iterDate = subDays(today, i);
    // Generate 3-8 appointments per day
    const numApps = Math.floor(Math.random() * 6) + 3;
    
    for (let j = 0; j < numApps; j++) {
      const client = MOCK_CLIENTS[Math.floor(Math.random() * MOCK_CLIENTS.length)];
      const service = MOCK_SERVICES[Math.floor(Math.random() * MOCK_SERVICES.length)];
      const staff = MOCK_STAFF[Math.floor(Math.random() * MOCK_STAFF.length)];
      
      const statusOptions = i === 0 ? ['Confirmed', 'Checked In'] : ['Completed'];
      const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
      
      const appDate = new Date(iterDate);
      appDate.setHours(9 + Math.floor(Math.random() * 9), 0, 0, 0); // between 9 AM and 6 PM
      
      const price = service.defaultPrice;
      const methods = ['UPI', 'Cash', 'Card'];
      const method = methods[Math.floor(Math.random() * methods.length)];

      const appId = `app_${i}_${j}`;
      
      appointments.push({
        id: appId,
        clientId: client.id,
        clientName: client.name,
        clientAvatar: client.avatar,
        serviceId: service.id,
        serviceName: service.name,
        serviceCategory: service.category,
        serviceColor: service.color,
        staffId: staff.id,
        staffName: staff.name,
        price,
        date: appDate.toISOString(),
        durationMins: service.durationMins,
        status,
      });

      if (status === 'Completed') {
        transactions.push({
          id: `txn_${i}_${j}`,
          appId,
          clientId: client.id,
          clientName: client.name,
          serviceName: service.name,
          staffName: staff.name,
          amount: price,
          method,
          date: appDate.toISOString(),
          status: 'Paid'
        });
      }
    }
  }
  return { appointments, transactions };
};

const preGenerated = generateMockAppointments();
export const MOCK_APPOINTMENTS = preGenerated.appointments;
export const MOCK_TRANSACTIONS = preGenerated.transactions;
