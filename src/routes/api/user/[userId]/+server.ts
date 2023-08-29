import { adminDB, adminAuth } from '$lib/server/admin';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params, locals }) => {
	const userData = (await adminDB.collection('users').doc(locals.userID!).get()).data();

	if (!userData || !userData.permissions || userData.permissions !== 'admin') {
		throw error(401, 'You must be an admin to do this.');
	}

	await adminAuth
		.deleteUser(params.userId)
		.then(() => {
			adminDB.collection('users').doc(params.userId).delete();
		})
		.catch((err) => {
			console.log(err.message);
			throw error(500, err);
		});
	return json({ status: 'User Deleted' });
};
