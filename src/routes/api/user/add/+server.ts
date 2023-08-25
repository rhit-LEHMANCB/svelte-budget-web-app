import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { adminAuth, adminDB } from '$lib/server/admin';

export const POST: RequestHandler = async ({ request, locals }) => {
	const userData = (await adminDB.collection('users').doc(locals.userID!).get()).data();

	if (!userData || !userData.permissions || userData.permissions !== 'admin') {
		throw error(401, 'You must be an admin to do this.');
	}

	const { email } = await request.json();

	const newUserDoc = { email: email, firstName: 'New', lastName: 'User', phoneNumber: '', permissions: 'user' };

	await adminAuth
		.createUser({ email: email })
		.then((userRecord) => {
			adminDB.collection('users').doc(userRecord.uid).set(newUserDoc);
		})
		.catch((error) => {
			throw error(500, error);
		});

    return json({status: 'New User Created'});
};
