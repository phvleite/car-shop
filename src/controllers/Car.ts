import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarController {
  constructor(private _service: IService<ICar>) { }

  public async create(req: Request, res: Response<ICar>) {
    const created = await this._service.create(req.body);

    return res.status(201).json(created);
  }

  public async read(req: Request, res: Response<ICar[]>) {
    const result = await this._service.read();

    return res.status(200).json(result);
  }

  public async readOne(req: Request, res: Response<ICar | null>) {
    const result = await this._service.readOne(req.params._id);

    return res.status(200).json(result);
  }

  public async update(req: Request, res: Response<ICar | null>) {
    const result = await this._service.update(req.params._id, req.body);

    return res.status(200).json(result);
  }

  public async this.delete(req: Request, res: Response<ICar | null>) {
    const result = await this._service.delete(req.params._id);

    return res.status(200).json(result);
  }
}
