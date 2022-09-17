import { z } from 'zod';
import { IService } from '../interfaces/IService';
import { IMotorcycle, MotorcycleZodSchema } from '../interfaces/IMotorcycle';
import { VehicleZodSchema } from '../interfaces/IVehicle';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class MotorcycleService implements IService<IMotorcycle> {
  constructor(private _motorcycle: IModel<IMotorcycle>) {}

  public async create(obj: unknown): Promise<IMotorcycle> {
    const parsed = z.intersection(MotorcycleZodSchema, VehicleZodSchema).safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    const created = await this._motorcycle.create(parsed.data);

    return created;
  }

  public async read(): Promise<IMotorcycle[]> {
    const result = await this._motorcycle.read();

    return result;
  }

  public async readOne(_id: string): Promise<IMotorcycle | null> {
    const car = await this._motorcycle.readOne(_id);

    if (!car) throw new Error(ErrorTypes.ObjectNotFound);

    return car;  
  }

  public async update(_id: string, obj: unknown): Promise<IMotorcycle & { _id: string } | null> {
    // Promise<ICar & { _id: string } 
    const parsed = z.intersection(MotorcycleZodSchema, VehicleZodSchema).safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    const updated = await this._motorcycle.update(_id, parsed.data);

    if (!updated) throw new Error(ErrorTypes.ObjectNotFound);

    const { model, year, color, buyValue, category, engineCapacity } = updated;

    return { _id,
      model,
      year,
      color,
      buyValue,
      category,
      engineCapacity } as IMotorcycle & { _id: string };
  }

  public async delete(_id: string): Promise<IMotorcycle | null> {
    const deleted = await this._motorcycle.delete(_id);
    
    if (!deleted) throw new Error(ErrorTypes.ObjectNotFound);

    return deleted;
  }
}

export default MotorcycleService;
