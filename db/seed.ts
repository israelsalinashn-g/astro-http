import { getCollection } from 'astro:content';
import { Clients, Posts, db } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// TODO
	await db.insert(Clients).values([
		{ id: 1, name: "Erick", age: 32, isActive: true },
		{ id: 2, name: "Rafael", age: 26, isActive: true },
		{ id: 3, name: "Carol", age: 28, isActive: true },
		{ id: 4, name: "Alejandra", age: 27, isActive: true },
		{ id: 5, name: "Valeria", age: 23, isActive: true },
	]);

	const posts = await getCollection('blog');

	await db.insert(Posts).values(
		posts.map((p) => ({
			id: p.id,
			title: p.data.title,
			likes: Math.round(Math.random() * 100),
		}))
	)
}
