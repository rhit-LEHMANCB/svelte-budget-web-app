<script lang="ts">
	import { successToast } from '$lib/Hooks/toasts';
	import { profileSchema } from '$lib/schemas';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.form, {
		customValidity: true,
		validators: profileSchema,
		onUpdated({ form }) {
			if (form.message === 'Form submitted') {
				// Display the message using a toast library
				successToast('Successfully updated user info.');
			}
		}
	});
</script>

<div>
	<div class="card p-5 m-5">
		<form method="POST" use:enhance class="m-5">
			<strong class="h3">Profile</strong>
			<div class="grid grid-rows-4 grid-flow-col gap-4 mt-2">
				<div>
					<label class="label"
						><span>First Name</span><input
							name="firstName"
							bind:value={$form.firstName}
							class="input"
							class:input-error={$errors.firstName}
							title="First Name"
							type="text"
						/></label
					>
				</div>
				<div>
					<label class="label"
						><span>Last Name</span><input
							name="lastName"
							bind:value={$form.lastName}
							class="input"
							class:input-error={$errors.lastName}
							title="Last Name"
							type="text"
						/></label
					>
				</div>
				<div>
					<label class="label"
						><span>Email</span><input
							name="email"
							bind:value={$form.email}
							class="input"
							class:input-error={$errors.email}
							title="Email"
							type="text"
						/></label
					>
				</div>
				<div>
					<label class="label"
						><span>Phone Number</span><input
							name="phoneNumber"
							bind:value={$form.phoneNumber}
							class="input"
							class:input-error={$errors.phoneNumber}
							title="Phone Number"
							type="text"
						/></label
					>
				</div>
			</div>
			<button type="submit" class="btn variant-filled-secondary mt-5">Save</button>
		</form>
	</div>
</div>
