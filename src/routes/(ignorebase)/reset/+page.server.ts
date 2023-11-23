import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { passwordChangeSchema } from '$lib/schemas';

export const load = (async () => {
	const form = await superValidate(passwordChangeSchema);
	return {
		form
	};
}) satisfies PageServerLoad;
