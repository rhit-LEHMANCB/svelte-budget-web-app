<script lang="ts">
	import { Paginator } from '@skeletonlabs/skeleton';
	import { IconUserMinus, IconUserPlus } from '@tabler/icons-svelte';
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { emailSchema } from '$lib/schemas';
	import { sendPasswordResetEmail } from 'firebase/auth';
	import { auth } from '$lib/firebase';
	import { errorToast, successToast } from '$lib/Hooks/toasts';
	import type { DocumentWithId } from '../../../app';
	import { invalidateAll } from '$app/navigation';

	export let users: DocumentWithId[];

	let page = {
		offset: 0,
		limit: 5,
		size: users.length,
		amounts: [1, 2, 5, 10]
	};

	$: paginatedUsers = users.slice(
		page.offset * page.limit, // start
		page.offset * page.limit + page.limit // end
	);

	async function handleResponse(response: string) {
		try {
			emailSchema.parse(response);
			await fetch('/api/user/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email: response })
			});
			await sendPasswordResetEmail(auth, response, {
				url: 'https://lehman-realty.web.app/manager'
			});
			invalidateAll();
			successToast('User Successfully Created.');
		} catch (error) {
			errorToast('Please enter a valid email.');
		}
	}

	async function handleConfirmResponse(confirmed: boolean, userId: string) {
		if (confirmed) {
			await removeUser(userId);
		}
	}

	// Provide the modal settings
	const emailModal: ModalSettings = {
		type: 'prompt',
		// Data
		title: 'Enter User Email',
		body: 'Provide the email to be used for the new user.',
		// Populates the input value and attributes
		valueAttr: { type: 'text', minlength: 1, maxlength: 200, required: true },
		// Returns the updated response value
		response: handleResponse
	};

	function confirmModal(user: DocumentWithId) {
		const confirmModal: ModalSettings = {
			type: 'confirm',
			// Data
			title: 'Please Confirm',
			body: `Are you sure you wish to delete ${user.data.firstName} ${user.data.lastName}?`,
			// TRUE if confirm pressed, FALSE if cancel pressed
			response: (response) => handleConfirmResponse(response, user.id)
		};
		modalStore.trigger(confirmModal);
	}

	function addUserClicked() {
		modalStore.trigger(emailModal);
	}

	async function removeUser(id: string) {
		await fetch(`/api/user/${id}`, {
			method: 'DELETE'
		})
			.then(() => {
				successToast('User Successfully Removed.');
				invalidateAll();
			})
			.catch(() => errorToast('Error removing user.'));
	}
</script>

<button on:click={addUserClicked} class="btn btn-sm variant-filled-primary ml-5"
	><IconUserPlus class="mr-2" />Add User</button
>
<div class="grid grid-flow-row p-5 gap-5">
	{#each paginatedUsers as user}
		<div class="card p-5 bg-surface-200 flex flex-initial gap-2">
			<strong class="h4">{`${user.data.firstName} ${user.data.lastName}`}</strong>
			<p>{user.data.email}</p>
			<p>{user.data.phoneNumber}</p>
			<div class="flex grow justify-end">
				<button on:click={() => confirmModal(user)} class="btn-icon btn-sm variant-filled-error"
					><IconUserMinus /></button
				>
			</div>
		</div>
	{/each}
	<Paginator bind:settings={page} showFirstLastButtons={false} showPreviousNextButtons={true} />
</div>
