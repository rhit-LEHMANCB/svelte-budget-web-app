import { Loader, type LoaderOptions } from 'google-maps';
import { PUBLIC_FB_API_KEY } from '$env/static/public';

export async function loadGoogle() {
	const options: LoaderOptions = { libraries: ['places'] };
	const loader = new Loader(PUBLIC_FB_API_KEY, options);
	const google = await loader.load();
	return google;
}
