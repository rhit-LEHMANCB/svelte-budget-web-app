<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { errorToast } from '$lib/Hooks/toasts';
	import { auth } from '$lib/firebase';
	import { getModalStore, getToastStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { error } from '@sveltejs/kit';
	import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { passwordChangeSchema } from '$lib/schemas';

	export let data: PageData;

	const { form, errors, validate, enhance } = superForm(data.form, {
		customValidity: true,
		validators: passwordChangeSchema,
		validationMethod: 'onblur'
	});

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	const mode = $page.url.searchParams.get('mode');

	const actionCode = $page.url.searchParams.get('oobCode');

	const continueUrl = $page.url.searchParams.get('continueUrl');

	if (mode !== 'resetPassword') {
		throw error(400, 'Invalid action');
	}

	async function handleVerifyPasswordReset(event: Event) {
		event.preventDefault();

		if (!actionCode) {
			throw error(400, 'Invalid action');
		}

		const result = await validate();

		if (!result.valid) {
			return;
		}

		verifyPasswordResetCode(auth, actionCode)
			.then(() => {
				// TODO: Show the reset screen with the user's email and ask the user for
				// the new password.
				const newPassword = $form.newPassword;

				// Save the new password.
				confirmPasswordReset(auth, actionCode, newPassword)
					.then(() => {
						// Password reset has been confirmed and new password updated.
						const modal: ModalSettings = {
							type: 'alert',
							// Data
							title: 'Success!',
							body: 'Your password was reset successfully. Press continue to proceed.',
							buttonTextCancel: 'Continue',
							// TRUE if confirm pressed, FALSE if cancel pressed
							response: () => goto(continueUrl ?? 'lehmanfamilyrealty.com/manager')
						};
						modalStore.trigger(modal);
						// TODO: create a modal that confirms success and then on confirm sends user to login page
					})
					.catch(() => {
						errorToast('Error resetting password. Please try again.', toastStore);
					});
			})
			.catch(() => {
				errorToast('Error resetting password. Please try again.', toastStore);
			});
	}
</script>

<div
	class="h-screen flex items-center justify-center bg-gradient-to-br variant-gradient-primary-secondary"
>
	<div class="card p-3">
		<form use:enhance class="h-auto m-5">
			<strong class="h3">Password Reset</strong>
			<p>Please fill out the information below to change your password.</p>
			<div class="grid grid-rows-2 grid-flow-col gap-2 mt-2">
				<div>
					<label class="label"
						><span>New Password</span><input
							name="newPassword"
							bind:value={$form.newPassword}
							class="input"
							class:input-error={$errors.newPassword}
							title="New Password"
							type="password"
						/></label
					>
				</div>
				<div>
					<label class="label"
						><span>Verify Password</span><input
							name="verifyPassword"
							bind:value={$form.verifyPassword}
							class="input"
							class:input-error={$errors.verifyPassword}
							title="Verify Password"
							type="password"
						/></label
					>
				</div>
			</div>
			<button
				on:click={(event) => handleVerifyPasswordReset(event)}
				class="btn variant-filled-secondary mt-5">Change Password</button
			>
		</form>
	</div>
</div>
