<script lang="ts">
	import { getAuth, inMemoryPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { IconExclamationCircle } from '@tabler/icons-svelte';
	import { auth, firebaseConfig } from '$lib/firebase';
	import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';

	export let data: PageData;
	export const prerender = false;

	let email: string;
	let password: string;
	let loginError: string;

	async function signIn() {
		const credential = await signInWithEmailAndPassword(auth, email, password);

		const idToken = await credential.user.getIdToken();

		const res = await fetch('/api/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ idToken })
		});
	}

	async function handleSignIn() {
		await signIn()
			.then(() => goto('/manager'))
			.catch((error) => (loginError = error.code));
	}

	function onKeyDown(e: KeyboardEvent) {
		 switch(e.code) {
			 case 'Enter':
				 handleSignIn();
				 break;
		 }
	}
</script>

<div
	class="h-screen flex items-center justify-center bg-gradient-to-br variant-gradient-primary-secondary"
>
	<div class="card p-8">
		<header class="pb-4">
			<strong>Lehman Properties</strong>
			<p>Please sign in to continue.</p>
		</header>
		<div class="grid grid-cols-1 gap-4">
			<label class="label"
				><span>Email</span><input
					bind:value={email}
					class="input"
					title="Email"
					type="email"
				/></label
			>
			<label class="label"
				><span>Password</span><input
					bind:value={password}
					class="input"
					title="Password"
					type="password"
				/></label
			>
			<button type="button" on:click={handleSignIn} class="btn variant-filled-primary"
				>Sign in</button
			>
			{#if loginError}
				<aside class="alert variant-ghost-error">
					<IconExclamationCircle />
					<div class="alert-message">
						<p>{'Your email or password is incorrect.'}</p>
					</div>
				</aside>
			{/if}
		</div>
	</div>
</div>

<svelte:window on:keydown={onKeyDown} />
