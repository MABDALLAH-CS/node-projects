// seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const oldTasks = [
  { title: "Study Express", completed: false },
  { title: "Study Data Structure & Algorithms", completed: false },
  { title: "Study Networking",completed: true}
];

async function main() {
  const result = await prisma.task.createMany({
    data: oldTasks
  });

  console.log(`✅ Successfully added ${result.count} tasks to Aiven MySQL!`);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());