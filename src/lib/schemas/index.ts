import validator from 'validator';
import { z } from 'zod';

export const profileSchema = z.object({
	firstName: z
		.string({ required_error: 'First name is required' })
		.nonempty('First name is required')
		.max(250, 'First name cannot exceed 250 characters'),
	lastName: z
		.string({ required_error: 'Last name is required' })
		.nonempty('Last name is required')
		.max(250, 'Last name cannot exceed 250 characters'),
	email: z.string({ required_error: 'Email is required' }).email('Please enter a valid email'),
	phoneNumber: z
		.string({ required_error: 'Phone number is required' })
		.refine(validator.isMobilePhone, 'Please enter a valid phone number')
});

export const emailSchema = z.string().email();

export const propertySchema = z.object({
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
		.positive('Bedrooms must be greater than 0')
		.int('Bedrroms must be an integer'),
	bathrooms: z
		.number({
			required_error: 'Bathrooms is required',
			invalid_type_error: 'Bathrooms must be a number'
		})
		.positive('Bathrooms must be greater than 0'),
	squareFeet: z
		.number({
			required_error: 'Square feet is required',
			invalid_type_error: 'Square feet must be a number'
		})
		.positive('Square Feet must be greater than 0')
		.int('Square Feet must be an integer'),
	rent: z
		.number({ required_error: 'Rent is required', invalid_type_error: 'Rent must be a number' })
		.positive('Rent must be greater than 0'),
	streetAddress: z
		.string({ required_error: 'Street address is required' })
		.nonempty('Street address is required')
		.max(50, 'Street address cannot exceed 50 characters'),
	apartmentInfo: z.string().max(50, 'Apartment info cannot exceed 50 characters'),
	city: z.string().nonempty().max(50, 'City cannot exceed 50 characters'),
	state: z
		.string()
		.min(2, 'Please enter a valid state code')
		.max(2, 'Please enter a valid state code'),
	zip: z.string().regex(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Please enter a valid zip code')
});
export type PropertySchema = typeof propertySchema;
