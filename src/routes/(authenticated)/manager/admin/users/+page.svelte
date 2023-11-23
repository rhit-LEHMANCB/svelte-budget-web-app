<script lang="ts">
	import type { PageData } from './$types';
	import { Avatar, Paginator, getToastStore } from '@skeletonlabs/skeleton';
	import { IconUserMinus, IconUserPlus } from '@tabler/icons-svelte';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { emailSchema } from '$lib/schemas';
	import { errorToast, successToast } from '$lib/Hooks/toasts';
	import { invalidateAll } from '$app/navigation';
	import type { DocumentWithId } from '../../../../../app';

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	export let data: PageData;

	let page = {
		page: 0,
		limit: 5,
		size: data.users.length,
		amounts: [1, 2, 5, 10]
	};

	$: paginatedUsers = data.users.slice(
		page.page * page.limit, // start
		page.page * page.limit + page.limit // end
	);

	async function handleResponse(response: string) {
		if (!response) {
			return;
		}
		try {
			emailSchema.parse(response);
		} catch (error) {
			errorToast('Please enter a valid email.', toastStore);
			return;
		}
		const fetchResponse = await fetch('/api/user/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: response })
		});
		if (fetchResponse.ok) {
			invalidateAll();
			successToast('User Successfully Created.', toastStore);
		} else {
			errorToast('Error creating user.', toastStore);
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
		const response = await fetch(`/api/user/${id}`, {
			method: 'DELETE'
		});
		if (response.ok) {
			successToast('User Successfully Removed.', toastStore);
			invalidateAll();
		} else {
			errorToast('Error removing user.', toastStore);
		}
	}
</script>

<div class="grid grid-flow-row p-5 gap-5">
	<button on:click={addUserClicked} class="btn btn-sm variant-filled-primary justify-self-start"
		><IconUserPlus class="mr-2" />Add User</button
	>
	<ul class="list">
		{#each paginatedUsers as user}
			<li>
				<Avatar
					src={user.data.photoUrl}
					initials={`${user.data.firstName[0]}${user.data.lastName[0]}`}
				/>
				<strong>{`${user.data.firstName} ${user.data.lastName}`}</strong>
				<p>{user.data.email}</p>
				<p>{user.data.phoneNumber}</p>
				<div class="flex grow justify-end">
					<button on:click={() => confirmModal(user)} class="btn-icon btn-sm variant-filled-error"
						><IconUserMinus /></button
					>
				</div>
			</li>
		{/each}
	</ul>
	<Paginator bind:settings={page} showFirstLastButtons={false} showPreviousNextButtons={true} />
</div>
