// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			userID: string | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export interface DocumentWithId {
	id: string;
	data: FirebaseFirestore.DocumentData;
}

export interface PhotoItem {
	id: string;
	photoUrl: string;
}
