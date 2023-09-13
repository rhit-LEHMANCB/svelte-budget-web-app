<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { propertySchema } from '$lib/schemas';
	import { successToast } from '$lib/Hooks/toasts';
	import { IconArrowLeft, IconCurrencyDollar } from '@tabler/icons-svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.form, {
		customValidity: true,
		validators: propertySchema,
		onUpdated({ form }) {
			if (form.message === 'Form submitted') {
				// Display the message using a toast library
				successToast('Successfully added info.');
			}
		}
	});
</script>

<!-- 
title: z
		.string({ required_error: 'Title is required' })
		.nonempty('Title is required')
		.max(500, 'Title cannot exceed 500 characters'),
	description: z
		.string({ required_error: 'Description is required' })
		.nonempty('Description is required')
		.max(10000, 'Description cannot exceed 10000 characters'),
	bedrooms: z
		.number({
			required_error: 'Bedrooms is required',
			invalid_type_error: 'Bedrooms must be a number'
		})
		.positive(),
	bathrooms: z
		.number({
			required_error: 'Bathrooms is required',
			invalid_type_error: 'Bathrooms must be a number'
		})
		.positive(),
	squareFeet: z
		.number({
			required_error: 'Square feet is required',
			invalid_type_error: 'Square feet must be a number'
		})
		.positive()
		.int(),
	rent: z
		.number({ required_error: 'Rent is required', invalid_type_error: 'Rent must be a number' })
		.positive(),
	address: z
		.string({ required_error: 'Address is required' })
		.nonempty('Address is required')
		.max(500, 'Address cannot exceed 500 characters') -->

<div>
	<button
		on:click={() => goto('/manager/admin/properties')}
		class="btn btn-sm variant-filled-primary ml-5"><IconArrowLeft class="mr-2" />Properties</button
	>
	<form method="POST" use:enhance class="m-5">
		<strong class="h3">New Property</strong>
		<div class="flex flex-col gap-4 mt-2">
			<div class="grid grid-cols-2 gap-4">
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
                <label class="label"
					><span>Rent</span><div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                        <div class="input-group-shim"><IconCurrencyDollar /></div>
                        <input
						name="rent"
						bind:value={$form.rent}
						class:input-error={$errors.rent}
						title="Rent"
						type="number"
					/>
                      </div></label
				>
			</div>
			<div>
				<label class="label"
					><span>Description</span><textarea
						name="description"
						bind:value={$form.description}
						rows="4"
						class="textarea"
						class:input-error={$errors.description}
						title="Description"
					/></label
				>
			</div>
            <div class="grid grid-cols-3 gap-4">
                <label class="label"
					><span>Bedrooms</span><input
						name="bedrooms"
						bind:value={$form.bedrooms}
						class="input"
						class:input-error={$errors.bedrooms}
						title="Bedrooms"
						type="number"
					/></label
				>
                <label class="label"
					><span>Bathrooms</span><input
						name="bathrooms"
						bind:value={$form.bathrooms}
						class="input"
						class:input-error={$errors.bathrooms}
						title="Bathrooms"
						type="number"
					/></label
				>
                <label class="label"
					><span>Square Feet</span><input
						name="squareFeet"
						bind:value={$form.squareFeet}
						class="input"
						class:input-error={$errors.squareFeet}
						title="Square Feet"
						type="number"
					/></label
				>
            </div>
		</div>
		<button type="submit" class="btn variant-filled-secondary my-5">Save</button>
	</form>
    <hr />
    <div class="m-5">
        <strong class="h3">Photos</strong>
    </div>
</div>
