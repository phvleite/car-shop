import { z } from 'zod';
import { IService } from '../interfaces/IService';
import { ICar, CarZodSchema } from '../interfaces/ICar';
import { VehicleZodSchema } from '../interfaces/IVehicle';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class CarService implements IService<ICar> {
  constructor(private _car: IModel<ICar>) {}

  public async create(obj: unknown): Promise<ICar> {
    const parsed = z.intersection(CarZodSchema, VehicleZodSchema).safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    const created = await this._car.create(parsed.data);

    return created;
  }

  public async read(): Promise<ICar[]> {
    const result = await this._car.read();

    return result;
  }

  public async readOne(_id: string): Promise<ICar | null> {
    const car = await this._car.readOne(_id);

    if (!car) throw new Error(ErrorTypes.ObjectNotFound);

    return car;  
  }

  public async update(_id: string, obj: unknown): Promise<ICar & { _id: string } | null> {
    const parsed = z.intersection(CarZodSchema, VehicleZodSchema).safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    const updated = await this._car.update(_id, parsed.data);

    if (!updated) throw new Error(ErrorTypes.ObjectNotFound);

    const { model, year, color, buyValue, seatsQty, doorsQty } = updated;

    return { _id, model, year, color, buyValue, seatsQty, doorsQty } as ICar & { _id: string };
  }

  public async delete(_id: string): Promise<ICar | null> {
    const deleted = await this._car.delete(_id);
    
    if (!deleted) throw new Error(ErrorTypes.ObjectNotFound);

    return deleted;
  }
}

export default CarService;
