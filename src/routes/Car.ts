import { Router } from 'express';
import CarController from '../controllers/Car';
import CarModel from '../models/Car';
import CarService from '../services/Car';

const route = Router();
const carRoute = '/cars';

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

route.post(carRoute, (req, res) => carController.create(req, res));
route.get(carRoute, (req, res) => carController.read(req, res));
route.get(`${carRoute}/:id`, (req, res) => carController.readOne(req, res));
route.put(`${carRoute}/:id`, (req, res) => carController.update(req, res));
route.delete(`${carRoute}/:id`, (req, res) => carController.delete(req, res));

export default route;
