<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
	import { propertySchema } from '$lib/schemas';
	import { successToast } from '$lib/Hooks/toasts';
    
    export let data: PageData;

    const { form, errors, enhance } = superForm(data.form, {
		customValidity: true,
		validators: propertySchema,
		onUpdated({ form }) {
			if (form.message === 'Form submitted') {
				// Display the message using a toast library
				successToast('Successfully updated user info.');
			}
		}
	});
</script>

<div>
    <form method="POST" use:enhance class="m-5">
        <strong class="h3">New Property</strong>
        <div class="grid grid-rows-1 grid-flow-col gap-4 mt-2">
            <div>
                <label class="label"
                    ><span>Title</span><input
                        name="title"
                        bind:value={$form.title}
                        class="input"
                        class:input-error={$errors.title}
                        title="Title"
                        type="text"
                    /></label
                >
            </div>
        </div>
        <button type="submit" class="btn variant-filled-secondary mt-5">Save</button>
    </form>
</div>