// src/data/mockTickets.ts
export interface Comment {
  id: number;
  text: string;
  author: string;
  createdDate: string;
}

export interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  createdDate: string;
  userId: number;
  comments?: Comment[];
}

export const mockTickets: Ticket[] = [
  {
    id: 1,
    title: 'Computer not starting',
    description: 'My computer won\'t turn on after the recent update.',
    priority: 'HIGH',
    status: 'OPEN',
    createdDate: '2025-10-28',
    userId: 1,
    comments: [
      {
        id: 1,
        text: 'Please try a hard reset by holding the power button for 10 seconds.',
        author: 'IT Support',
        createdDate: '2025-10-28T10:30:00Z'
      },
      {
        id: 2,
        text: 'Tried the hard reset, still not working. Computer makes a clicking sound.',
        author: 'John Doe',
        createdDate: '2025-10-28T11:15:00Z'
      }
    ]
  },
  {
    id: 2,
    title: 'Printer out of toner',
    description: 'The office printer is showing low toner error and needs replacement.',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    createdDate: '2025-10-27',
    userId: 2,
    comments: [
      {
        id: 3,
        text: 'Ordered new toner cartridge. Should arrive tomorrow.',
        author: 'IT Support',
        createdDate: '2025-10-27T14:20:00Z'
      }
    ]
  },
  {
    id: 3,
    title: 'Email not syncing',
    description: 'Outlook emails are not syncing properly across devices.',
    priority: 'MEDIUM',
    status: 'RESOLVED',
    createdDate: '2025-10-26',
    userId: 1,
    comments: [
      {
        id: 4,
        text: 'Cleared Outlook cache and restarted the application. Issue resolved.',
        author: 'IT Support',
        createdDate: '2025-10-26T16:45:00Z'
      }
    ]
  },
  {
    id: 4,
    title: 'Network connectivity issues',
    description: 'WiFi keeps dropping connection intermittently throughout the day.',
    priority: 'HIGH',
    status: 'OPEN',
    createdDate: '2025-10-28',
    userId: 3,
    comments: [
      {
        id: 5,
        text: 'Please try connecting to a different WiFi network to isolate the issue.',
        author: 'IT Support',
        createdDate: '2025-10-28T09:00:00Z'
      },
      {
        id: 6,
        text: 'Tried different network, same issue. Seems to be a router problem.',
        author: 'Jane Smith',
        createdDate: '2025-10-28T09:30:00Z'
      }
    ]
  },
  {
    id: 5,
    title: 'Software installation request',
    description: 'Need Adobe Photoshop installed on my workstation for design work.',
    priority: 'LOW',
    status: 'IN_PROGRESS',
    createdDate: '2025-10-25',
    userId: 2,
    comments: [
      {
        id: 7,
        text: 'Installation in progress. Will notify when complete.',
        author: 'IT Support',
        createdDate: '2025-10-25T13:10:00Z'
      }
    ]
  },
  {
    id: 6,
    title: 'Password reset',
    description: 'Forgot my login password for the company portal.',
    priority: 'HIGH',
    status: 'RESOLVED',
    createdDate: '2025-10-24',
    userId: 1,
    comments: [
      {
        id: 8,
        text: 'Password has been reset. Check your email for temporary password.',
        author: 'IT Support',
        createdDate: '2025-10-24T08:15:00Z'
      }
    ]
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
    userId: 3,
    comments: [
      {
        id: 9,
        text: 'Please try an external keyboard to confirm if it\'s a hardware issue.',
        author: 'IT Support',
        createdDate: '2025-10-23T15:45:00Z'
      }
    ]
  }
];