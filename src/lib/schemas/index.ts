import validator from "validator";
import { z } from "zod";

export const profileSchema = z.object({
    firstName: z.string({required_error: 'First name is required'}).nonempty('First name is required').max(250, 'First name cannot exceed 250 characters'),
    lastName: z.string({required_error: 'Last name is required'}).nonempty('Last name is required').max(250, 'Last name cannot exceed 250 characters'),
    email: z.string({required_error: 'Email is required'}).email('Please enter a valid email'),
    phoneNumber: z.string({required_error: 'Phone number is required'}).refine(validator.isMobilePhone, 'Please enter a valid phone number')
})

export const emailSchema = z.string().email();