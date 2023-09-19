import { adminDB } from '$lib/server/admin';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params, locals }) => {
	if (!locals.userID) {
		throw error(401, 'You must be logged in to do this.');
	}

	const userData = (await adminDB.collection('users').doc(locals.userID).get()).data();

	if (!userData || !userData.permissions || userData.permissions !== 'admin') {
		throw error(401, 'You must be an admin to do this.');
	}

	await adminDB
		.collection('properties')
		.doc(params.propertyId)
		.delete()
		.then(() => {
			return json({ status: 'Property Deleted' });
		})
		.catch((err) => {
			console.log(err.message);
			throw error(500, err);
		});
	return json({ status: 'Error deleting property' });
};
