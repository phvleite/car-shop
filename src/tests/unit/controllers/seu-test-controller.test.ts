// template para criação dos testes de cobertura da camada de controller


import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
import CarController from '../../../controllers/Car';
import CarService from '../../../services/Car';
import CarModel from '../../../models/Car';
import { carMock, carMockWithId, carMockForChange, carMockForChangeWithId } from '../../mocks/carMock';

const { expect } = chai;

describe('Car Controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon.stub(carService, 'create').resolves(carMockWithId);
    sinon.stub(carService, 'read').resolves([carMockWithId]);
    sinon.stub(carService, 'readOne').resolves(carMock);
    sinon.stub(carService, 'update').resolves(carMockForChangeWithId);
    sinon.stub(carService, 'delete').resolves(carMockWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  })

  describe('Create Car', () => {
    it('Success', async () => {
      req.body = carMock;
      await carController.create(req, res);

      const statusStub = res.status as sinon.SinonStub;
      const jsonStub = res.json as sinon.SinonStub;

      expect(statusStub.calledWith(201)).to.be.true;
      expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('List All Cars', () => {
    it('Success', async () => {
      await carController.read(req, res);

      const statusStub = res.status as sinon.SinonStub;
      const jsonStub = res.json as sinon.SinonStub;

      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith([carMockWithId])).to.be.true;
    });
  });

  describe('List Car by Id', () => {
    it('Success', async () => {
      req.params = { id: carMockWithId._id };
      await carController.readOne(req, res);

      const statusStub = res.status as sinon.SinonStub;
      const jsonStub = res.json as sinon.SinonStub;

      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith(carMock)).to.be.true;
    });
  });

  describe('Update Car by Id', () => {
    it('Success', async () => {
      req.params = { id: carMockForChangeWithId._id };
      req.body = carMockForChange;
      await carController.update(req, res);

      const statusStub = res.status as sinon.SinonStub;
      const jsonStub = res.json as sinon.SinonStub;

      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith(carMockForChangeWithId)).to.be.true;
    });
  });

  describe('Delete Car by Id', () => {
    it('Success', async () => {
      req.params = { id: carMockForChangeWithId._id };
      await carController.delete(req, res);

      const statusStub = res.status as sinon.SinonStub;
      const jsonStub = res.json as sinon.SinonStub;

      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    });
  });
});
