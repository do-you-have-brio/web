import prisma from "../src/database/client";

async function main() {
	const user = await prisma.user.create({
		data: {
			email: "user@mail.com",
			password: await Bun.password.hash("password"),
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
