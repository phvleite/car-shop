// template para criação dos testes de cobertura da camada de model

import * as sinon from 'sinon';
import chai from 'chai';

import { Model } from 'mongoose';
import CarModel from '../../../models/Car';
import { carMock, carMockWithId } from '../../mocks/carMock';
import { ICar } from '../../../interfaces/ICar';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';

const { expect } = chai;
const _id = '63248515401474596857ebcc';

describe('Car Model', () => {
  const carModel = new CarModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId);

    sinon.stub(Model, 'find')
      .onCall(0).resolves([carMockWithId])
      .onCall(1).resolves([]);

    sinon.stub(Model, 'findById')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);

  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a car', () => {
    it('success', async () => {
      const newCar = await carModel.create(carMock);
 
      expect(newCar).to.be.deep.equal(carMockWithId);
    });
  })

  describe('reading all cars', () => {
    it('success', async () => {
      const newCar = await carModel.read();
 
      expect(newCar).to.be.deep.equal([carMockWithId]);
    })

    it('empty', async () => {
      const newCar = await carModel.read();
 
      expect(newCar).to.be.deep.equal([]);
    })
  })

  describe('searching a car', () => {
    it('success', async () => {
      const newCar = await carModel.readOne(_id);
 
      expect(newCar).to.be.deep.equal(carMockWithId);
    })

    it('_id not found', async () => {
      let err: any;

      try {
        await carModel.readOne('IdErrado');
      } catch (error) {
        err = error;
      }
      
      expect(err.message).to.be.eq(ErrorTypes.InvalidMongoId);
    })
  })
});
