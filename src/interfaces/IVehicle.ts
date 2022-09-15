import { z } from 'zod';

const VehicleZodSchema = z.object({
  _id: z.string().optional(),

  model: z.string({
    required_error: 'Model is required',
    invalid_type_error: 'Model must be a string',
  }).min(3, { message: 'Model must be 3 or more characters long' }),

  year: z.number({
    required_error: 'Year is required',
    invalid_type_error: 'year must be a number',
  }).int({
    message: 'Year must be integer',
  }).gte(1900, {
    message: 'Year must be greater than or equal to 1900',
  }).lte(2022, {
    message: 'Year must be less than or equal to 2022',
  }),

  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  }).min(3, { message: 'Color must be 3 or more characters long' }),

  status: z.boolean().optional(),

  buyValue: z.number({
    required_error: 'Buy Value is required',
    invalid_type_error: 'Buy Value must be a number',
  }).int({
    message: 'Buy Value must be integer',
  }),
});

export type IVehicle = z.infer<typeof VehicleZodSchema>;
export { VehicleZodSchema };
