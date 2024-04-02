import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { adminDB, adminStorage } from '$lib/server/admin';
import { leaseSchema, propertySchema } from '$lib/schemas';
import { error, fail } from '@sveltejs/kit';
import { PUBLIC_FB_STORAGE_BUCKET } from '$env/static/public';
import { FieldPath, FieldValue } from 'firebase-admin/firestore';
import type { DocumentWithId, PhotoItem } from '../../../../../../../app';
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async (event) => {
	if (!event.locals.userID) {
		throw error(401, 'You must be logged in to do this.');
	}
	const userData = (await adminDB.collection('users').doc(event.locals.userID).get()).data();

	if (!userData || !userData.permissions || userData.permissions !== 'admin') {
		throw error(401, 'You must be an admin to do this.');
	}

	const propertyData = (
		await adminDB.collection('properties').doc(event.params.propertyId).get()
	).data();

	if (!propertyData) {
		throw error(500, 'Error retrieving property');
	}

	const form = await superValidate(zod(leaseSchema));
	const usersOptions = (await adminDB.collection('users').get()).docs.map((doc) => ({
		label: `${doc.data().firstName} ${doc.data().lastName}`,
		value: doc.id
	}));
	return {
		form,
		usersOptions
	};
}) satisfies PageServerLoad;

export const actions = {
	lease: async (event) => {
		const form = await superValidate(event, zod(leaseSchema));

		if (!event.locals.userID) {
			throw error(401, 'You must be logged in to do this.');
		}

		const userData = (await adminDB.collection('users').doc(event.locals.userID).get()).data();

		if (!userData || !userData.permissions || userData.permissions !== 'admin') {
			throw error(401, 'You must be an admin to do this.');
		}

		if (!form.valid) {
			return message(form, 'Invalid form');
		}

		return message(form, 'Form submitted');
	}
};
