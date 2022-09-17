import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const Category = ['Street', 'Custom', 'Trail'] as const;

const MotorcycleZodSchema = z.object({
  category: z.enum(Category),

  engineCapacity: z.number({
    required_error: 'Engine Capacity quantity is required',
    invalid_type_error: 'Engine Capacity quantity must be a number',
  }).int({
    message: 'Engine Capacity quantity must be integer',
  }).gte(1, {
    message: 'Engine Capacity quantity must be greater than or equal to 1',
  }).lte(2500, {
    message: 'Engine Capacity quantity must be less than or equal to 2500',
  }),
});

export type IMotorcycle = z.infer<typeof MotorcycleZodSchema & typeof VehicleZodSchema>;
export { MotorcycleZodSchema };
