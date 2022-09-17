import { Router } from 'express';
import MotorcycleController from '../controllers/Motorcycle';
import MotorcycleService from '../services/Motorcycle';
import MotorcycleModel from '../models/Motorcycle';

const route = Router();
const motorcycleRoute = '/motorcycles';

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);

route.post(motorcycleRoute, (req, res) => motorcycleController.create(req, res));
route.get(motorcycleRoute, (req, res) => motorcycleController.read(req, res));
route.get(`${motorcycleRoute}/:id`, (req, res) => motorcycleController.readOne(req, res));
route.put(`${motorcycleRoute}/:id`, (req, res) => motorcycleController.update(req, res));
route.delete(`${motorcycleRoute}/:id`, (req, res) => motorcycleController.delete(req, res));

export default route;
