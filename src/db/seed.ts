import { faker } from "@faker-js/faker";
import { db } from "./connection";
import { restaurants, users } from "./schema";

import chalk from "chalk";

/**
 * Reset database
 */
await db.delete(users);
await db.delete(restaurants);

console.log(chalk.yellowBright("Database reset!"));

/**
 * Create customers
 */
await db.insert(users).values([
	{
		name: faker.person.fullName(),
		email: faker.internet.email(),
		role: "customer",
	},
	{
		name: faker.person.fullName(),
		email: faker.internet.email(),
		role: "customer",
	},
]);

console.log(chalk.yellow("Created customers!"));

/**
 * Create manager
 */
const [manager] = await db
	.insert(users)
	.values([
		{
			name: faker.person.fullName(),
			email: "admin@admin.com",
			role: "manager",
		},
	])
	.returning({
		id: users.id,
	});

console.log(chalk.yellow("Created manager!"));

/**
 * Create restaurant
 */
await db.insert(restaurants).values([
	{
		name: faker.company.name(),
		description: faker.lorem.paragraph(),
		managerId: manager?.id,
	},
]);

console.log(chalk.yellow("Created manager!"));

console.log(chalk.greenBright("Database seeded successfully!"));

process.exit();
