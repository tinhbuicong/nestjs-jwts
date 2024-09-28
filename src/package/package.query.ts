export const packageQuery = {
  id: true,
  title: true,
  star: true,
  items: true,
  important: true,
  learnSchedule: true,
  user: {
    select: {
      name: true,
      avatar: true,
    },
  },
};
