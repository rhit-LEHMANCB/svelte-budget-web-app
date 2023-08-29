import { adminAuth } from '$lib/server/admin';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get('__session');

	event.locals.userID = null;

	try {
		const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie ?? '');
		event.locals.userID = decodedClaims.uid;
	} catch (e) {
		if (event.url.pathname.startsWith('/manager')) {
			throw redirect(303, '/signin');
		}
	}

	return resolve(event);
}) satisfies Handle;
