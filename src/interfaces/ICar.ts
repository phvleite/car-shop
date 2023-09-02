import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const CarZodSchema = z.object({
  doorsQty: z.number({
    required_error: 'Doors quantity is required',
    invalid_type_error: 'Doors quantity must be a number',
  }).int({
    message: 'Doors quantity must be integer',
  }).gte(2, {
    message: 'Doors quantity must be greater than or equal to 2',
  }).lte(5, {
    message: 'Doors quantity must be less than or equal to 5',
  }),

  seatsQty: z.number({
    required_error: 'Seats quantity is required',
    invalid_type_error: 'Seats quantity must be a number',
  }).int({
    message: 'Seats quantity must be integer',
  }).gte(2, {
    message: 'Seats quantity must be greater than or equal to 2',
  }).lte(7, {
    message: 'Seats quantity must be less than or equal to 7',
  }),
});

export type ICar = z.infer<typeof CarZodSchema & typeof VehicleZodSchema>;
export { CarZodSchema };
