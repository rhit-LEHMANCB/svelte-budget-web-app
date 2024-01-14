import { stripe } from '$lib/server/stripe';
import { error, json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { lookupKey } = await request.json();

	const prices = await stripe.prices.list({
		lookup_keys: [lookupKey],
		expand: ['data.product']
	});
	const session = await stripe.checkout.sessions.create({
		billing_address_collection: 'auto',
		line_items: [
			{
				price: prices.data[0].id,
				// For metered billing, do not pass quantity
				quantity: 1
			}
		],
		mode: 'subscription',
		// TODO: please change these later
		success_url: `https://lehmanfamilyrealty.com/`,
		cancel_url: `https://lehmanfamilyrealty.com/payment`
	});

	if (session.url) {
		return json({url: session.url});
	} else {
		throw error(500, 'Failed to create checkout session');
	}
};
