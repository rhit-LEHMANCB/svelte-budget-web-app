import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {superValidate} from 'sveltekit-superforms/server'
import validator from 'validator';
import { z } from 'zod';
import { adminDB } from '$lib/server/admin';
import { profileSchema } from '$lib/schemas';
import { invalidateAll } from '$app/navigation';

export const load = (async (event) => {
    const userData = (await adminDB.collection('users').doc(event.locals.userID!).get()).data();

    const form = await superValidate(userData, profileSchema);
    return {
        form
    };
}) satisfies PageServerLoad;

export const actions = {
    default: async (event) => {
        const form = await superValidate(event, profileSchema);
        
        if (!form.valid) {
            return fail(400, {form});
        } 

        await adminDB.collection('users').doc(event.locals.userID!).update(form.data);
        return form;
    }
}