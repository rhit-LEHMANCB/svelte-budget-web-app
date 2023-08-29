import { adminDB } from '$lib/server/admin';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const usersRef = adminDB.collection('users');
	const userData = (await usersRef.doc(event.locals.userID!).get()).data();

	if (!userData || !userData.permissions || userData.permissions !== 'admin') {
		throw redirect(303, '/manager');
	}

	const users = await usersRef.orderBy('lastName').get();

	return {
		users: users.docs.map((user) => {
			return { id: user.id, data: user.data() };
		})
	};
}) satisfies PageServerLoad;
