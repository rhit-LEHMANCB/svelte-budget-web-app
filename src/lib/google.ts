import { Loader, type LoaderOptions, type google } from 'google-maps';
import { PUBLIC_FB_API_KEY } from '$env/static/public';
import { writable } from 'svelte/store';

export async function loadGoogle() {
	const options: LoaderOptions = { libraries: ['places'] };
	const loader = new Loader(PUBLIC_FB_API_KEY, options);
	const google = await loader.load();
	return google;
}

async function googleStore() {
  
	if (!globalThis.window) {
	  console.warn('Google api is not initialized or not in browser');
	  const { subscribe } = writable<google | null>(null);
	  return {
		subscribe,
	  }
	}
  
	const { subscribe } = writable<google | null>(await loadGoogle() ?? null);
  
	return {
	  subscribe,
	};
  }
  
  export const googleApi = await googleStore();
