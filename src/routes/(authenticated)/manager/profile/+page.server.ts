import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { adminDB } from '$lib/server/admin';
import { error } from '@sveltejs/kit';
import { profileSchema } from '$lib/schemas';

export const load = (async (event) => {
	if (!event.locals.userID) {
		throw error(401, 'You must be logged in to do this.');
	}
	const userData = (await adminDB.collection('users').doc(event.locals.userID).get()).data();

	const form = await superValidate(userData, profileSchema);
	return {
		form
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, profileSchema);

		if (!event.locals.userID) {
			throw error(401, 'You must be logged in to do this.');
		}

		if (!form.valid) {
			return message(form, 'Invalid form');
		}

		await adminDB.collection('users').doc(event.locals.userID).update(form.data);
		return message(form, 'Form submitted');
	}
};
