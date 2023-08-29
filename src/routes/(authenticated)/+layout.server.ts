import { adminDB } from '$lib/server/admin';
import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const uid = locals.userID;

	if (!uid) {
		throw error(500, 'Failed to find user info.');
	}

	const userData = (await adminDB.collection('users').doc(uid).get()).data();

	if (!userData) {
		throw error(500, 'Failed to find user info.');
	}

	if (userData.isFirstLogin) {
		throw redirect(303, '/manager/profile');
	}

	return {
		user: userData
	};
}) satisfies LayoutServerLoad;
