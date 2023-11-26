import { adminDB } from '$lib/server/admin';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { FieldValue } from 'firebase-admin/firestore';

export const POST: RequestHandler = async ({ locals, params, request }) => {
	if (!locals.userID) {
		throw error(401, 'You must be logged in to do this.');
	}

	const userData = (await adminDB.collection('users').doc(locals.userID).get()).data();

	if (!userData || !userData.permissions || userData.permissions !== 'admin') {
		throw error(401, 'You must be an admin to do this.');
	}

	const { workDone } = await request.json();

	if (!workDone) {
		throw error(400, 'Please provide work done.');
	}

	return adminDB
		.collection('maintenance')
		.doc(params.requestId)
		.update({ status: 'Closed', dateClosed: FieldValue.serverTimestamp(), workDone })
		.then(() => {
			return json({ status: 'Request Closed' });
		})
		.catch((err) => {
			console.log(err.message);
			throw error(500, err);
		});
};
