interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        'Pendiente, Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description:
        'In Progress Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      description:
        'Finished Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nisl nunc eget lorem.',
      status: 'finished',
      createdAt: Date.now() - 100000,
    },
  ],
};
