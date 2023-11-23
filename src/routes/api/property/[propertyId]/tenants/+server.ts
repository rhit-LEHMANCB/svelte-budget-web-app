import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { adminDB } from '$lib/server/admin';

export const POST: RequestHandler = async ({ params, locals, request }) => {
	if (!locals.userID) {
		throw error(401, 'You must be logged in to do this.');
	}

	const userData = (await adminDB.collection('users').doc(locals.userID).get()).data();

	if (!userData || !userData.permissions || userData.permissions !== 'admin') {
		throw error(401, 'You must be an admin to do this.');
	}

	const { tenantId } = await request.json();

	if (!tenantId) {
		throw error(400, 'Please provide a Tenant Id');
	}

	return adminDB
		.collection('junction_user_property')
		.doc(`${tenantId}_${params.propertyId}`)
		.set({
			tenantId: tenantId,
			propertyId: params.propertyId
		})
		.then(() => {
			return json({ status: 'Tenant added' });
		})
		.catch((err) => {
			console.log(err.message);
			throw error(500, err);
		});
};

export const DELETE: RequestHandler = async ({ params, locals, request }) => {
	if (!locals.userID) {
		throw error(401, 'You must be logged in to do this.');
	}

	const userData = (await adminDB.collection('users').doc(locals.userID).get()).data();

	if (!userData || !userData.permissions || userData.permissions !== 'admin') {
		throw error(401, 'You must be an admin to do this.');
	}

	const { tenantId } = await request.json();

	if (!tenantId) {
		throw error(400, 'Please provide a Tenant Id');
	}

	return adminDB
		.collection('junction_user_property')
		.doc(`${tenantId}_${params.propertyId}`)
		.delete()
		.then(() => {
			return json({ status: 'Tenant removed' });
		})
		.catch((err) => {
			console.log(err.message);
			throw error(500, err);
		});
};
