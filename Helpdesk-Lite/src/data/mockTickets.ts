// src/data/mockTickets.ts
export interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  createdDate: string;
  userId: number;
}

export const mockTickets: Ticket[] = [
  {
    id: 1,
    title: 'Computer not starting',
    description: 'My computer won\'t turn on after the recent update.',
    priority: 'HIGH',
    status: 'OPEN',
    createdDate: '2025-10-28',
    userId: 1
  },
  {
    id: 2,
    title: 'Printer out of toner',
    description: 'The office printer is showing low toner error and needs replacement.',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    createdDate: '2025-10-27',
    userId: 2
  },
  {
    id: 3,
    title: 'Email not syncing',
    description: 'Outlook emails are not syncing properly across devices.',
    priority: 'MEDIUM',
    status: 'RESOLVED',
    createdDate: '2025-10-26',
    userId: 1
  },
  {
    id: 4,
    title: 'Network connectivity issues',
    description: 'WiFi keeps dropping connection intermittently throughout the day.',
    priority: 'HIGH',
    status: 'OPEN',
    createdDate: '2025-10-28',
    userId: 3
  },
  {
    id: 5,
    title: 'Software installation request',
    description: 'Need Adobe Photoshop installed on my workstation for design work.',
    priority: 'LOW',
    status: 'IN_PROGRESS',
    createdDate: '2025-10-25',
    userId: 2
  },
  {
    id: 6,
    title: 'Password reset',
    description: 'Forgot my login password for the company portal.',
    priority: 'HIGH',
    status: 'RESOLVED',
    createdDate: '2025-10-24',
    userId: 1
  },
  {
    id: 7,
    title: 'Monitor flickering',
    description: 'The display monitor is flickering intermittently during use.',
    priority: 'MEDIUM',
    status: 'OPEN',
    createdDate: '2025-10-29',
    userId: 4
  },
  {
    id: 8,
    title: 'Keyboard malfunction',
    description: 'Several keys on the keyboard are not responding correctly.',
    priority: 'LOW',
    status: 'IN_PROGRESS',
    createdDate: '2025-10-23',
    userId: 3
  }
];