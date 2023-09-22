import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { adminDB, adminStorage } from '$lib/server/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { PUBLIC_FB_STORAGE_BUCKET } from '$env/static/public';
import type { PhotoItem } from '../../../../../app';

export const POST: RequestHandler = async ({ params, locals, request }) => {
	if (!locals.userID) {
		throw error(401, 'You must be logged in to do this.');
	}

	const userData = (await adminDB.collection('users').doc(locals.userID).get()).data();

	if (!userData || !userData.permissions || userData.permissions !== 'admin') {
		throw error(401, 'You must be an admin to do this.');
	}

	const { photos } = await request.json();

	if (!(photos as PhotoItem[])) {
		throw error(400, 'Photo must be a valid type');
	}

	await adminDB
		.collection('properties')
		.doc(params.propertyId)
		.update({
			photos: photos
		})
		.then(() => {
			return json({ status: 'Photos reordered' });
		})
		.catch((err) => {
			console.log(err.message);
			throw error(500, err);
		});
	return json({ status: 'Error reordering photos' });
};

export const DELETE: RequestHandler = async ({ params, locals, request }) => {
	if (!locals.userID) {
		throw error(401, 'You must be logged in to do this.');
	}

	const userData = (await adminDB.collection('users').doc(locals.userID).get()).data();

	if (!userData || !userData.permissions || userData.permissions !== 'admin') {
		throw error(401, 'You must be an admin to do this.');
	}

	const { photo } = await request.json();

	if (!(photo as PhotoItem)) {
		throw error(400, 'Photo must be a valid type');
	}

	await adminStorage
		.bucket(`gs://${PUBLIC_FB_STORAGE_BUCKET}`)
		.file(`properties/${params.propertyId}/images/${photo.id}`)
		.delete()
		.catch((err) => {
			throw error(500, err);
		});

	await adminDB
		.collection('properties')
		.doc(params.propertyId)
		.update({
			photos: FieldValue.arrayRemove(photo)
		})
		.then(() => {
			return json({ status: 'Photo Deleted' });
		})
		.catch((err) => {
			console.log(err.message);
			throw error(500, err);
		});
	return json({ status: 'Error deleting photo' });
};
