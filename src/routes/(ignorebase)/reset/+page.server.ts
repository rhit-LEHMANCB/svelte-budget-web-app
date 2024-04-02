import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { passwordChangeSchema } from '$lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async () => {
	const form = await superValidate(zod(passwordChangeSchema));
	return {
		form
	};
}) satisfies PageServerLoad;
