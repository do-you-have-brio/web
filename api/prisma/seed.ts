import prisma from "../src/database/client";

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "user@mail.com",
      password: await Bun.password.hash("password"),
    },
  });

  const update = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      educations: {
        create: [
          {
            school: "University of California, Berkeley",
            location: "Berkeley, CA",
            degree: "Bachelor of Science in Computer Science",
            start_date: new Date("2025-05-01T18:57:00.306Z"),
            end_date: new Date("2028-05-01T18:57:00.306Z"),
          },
        ],
      },
      jobs: {
        create: [
          {
            title: "Frontend Developer",
            company: "TechCorp",
            location: "San Francisco, CA",
            description:
              "Develop and maintain frontend applications using React and TypeScript.",
            tags: ["typescript", "react", "tailwind"],
            start_date: new Date("2025-05-01T18:57:00.306Z"),
            end_date: new Date("2028-05-01T18:57:00.306Z"),
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
