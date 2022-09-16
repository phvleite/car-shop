// template para criação dos testes de cobertura da camada de service

import * as sinon from 'sinon';
import chai from 'chai';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { carMock, carMockWithId, carMockForChange, carMockForChangeWithId } from '../../mocks/carMock';

const { expect } = chai;
const _id = '63248515401474596857ebcc';

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read')
      .onCall(0).resolves([carMockWithId])
      .onCall(1).resolves([]);

    sinon.stub(carModel, 'readOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
  
    sinon.stub(carModel, 'update')
      .onCall(0).resolves(carMockForChange)
      .onCall(1).resolves(null);

    sinon.stub(carModel, 'delete')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
  });

  after(()=>{
    sinon.restore();
  });

  describe('Create Car', () => {
    it('Success', async () => {
      const newCar = await carService.create(carMock);

      expect(newCar).to.be.deep.equal(carMockWithId);
    });

    it('Failure', async () => {
      let errCar: any;

      try {
        await carService.create({});
      } catch (error: any) {
        errCar = error;
      };

      expect(errCar).to.be.instanceOf(ZodError);
    });

    it('Invalid model', async () => {
      let errCar: any;
      const carMockInvalid = {
        year: 2022,
        color: 'Red',
        buyValue: 950000,
        doorsQty: 4,
        seatsQty: 4,
      }
      
      try {
        await carService.create(carMockInvalid);
      } catch (error: any) {
        errCar = error;
      };

      expect(errCar).to.be.instanceOf(ZodError);
      expect(errCar.issues[0].message).to.be.equal("Model is required");
    });

    it('Invalid model len', async () => {
      let errCar: any;
      const carMockInvalid = {
        model: 'uu',
        year: 2022,
        color: 'Red',
        buyValue: 950000,
        doorsQty: 4,
        seatsQty: 4,
      }
      
      try {
        await carService.create(carMockInvalid);
      } catch (error: any) {
        errCar = error;
      };

      expect(errCar).to.be.instanceOf(ZodError);
      expect(errCar.issues[0].message).to.be.equal("Model must be 3 or more characters long");
    });

    it('Invalid model typeof', async () => {
      let errCar: any;
      const carMockInvalid = {
        model: 2020,
        year: 2022,
        color: 'Red',
        buyValue: 950000,
        doorsQty: 4,
        seatsQty: 4,
      }
      
      try {
        await carService.create(carMockInvalid);
      } catch (error: any) {
        errCar = error;
      };
  
      expect(errCar).to.be.instanceOf(ZodError);
      expect(errCar.issues[0].message).to.be.equal("Model must be a string");
    });

    it('Year is required', async () => {
      let errCar: any;
      const carMockInvalid = {
        model: 'Ferrari Purosangue',
        color: 'Red',
        buyValue: 950000,
        doorsQty: 4,
        seatsQty: 4,
      }
      
      try {
        await carService.create(carMockInvalid);
      } catch (error: any) {
        errCar = error;
      };
  
      expect(errCar).to.be.instanceOf(ZodError);
      expect(errCar.issues[0].message).to.be.equal("Year is required");
    });

    it('Invalid year typeof', async () => {
      let errCar: any;
      const carMockInvalid = {
        model: 'Ferrari Purosangue',
        year: 'ano de fabricação',
        color: 'Red',
        buyValue: 950000,
        doorsQty: 4,
        seatsQty: 4,
      }
      
      try {
        await carService.create(carMockInvalid);
      } catch (error: any) {
        errCar = error;
      };
  
      expect(errCar).to.be.instanceOf(ZodError);
      expect(errCar.issues[0].message).to.be.equal("year must be a number");
    });

    it('Year must be an integer value', async () => {
      let errCar: any;
      const carMockInvalid = {
        model: 'Ferrari Purosangue',
        year: 2021.25,
        color: 'Red',
        buyValue: 950000,
        doorsQty: 4,
        seatsQty: 4,
      }
      
      try {
        await carService.create(carMockInvalid);
      } catch (error: any) {
        errCar = error;
      };
  
      expect(errCar).to.be.instanceOf(ZodError);
      expect(errCar.issues[0].message).to.be.equal("Year must be integer");
    });

    it('Invalid year less than 1900', async () => {
      let errCar: any;
      const carMockInvalid = {
        model: 'Ferrari Purosangue',
        year: 1899,
        color: 'Red',
        buyValue: 950000,
        doorsQty: 4,
        seatsQty: 4,
      }
      
      try {
        await carService.create(carMockInvalid);
      } catch (error: any) {
        errCar = error;
      };
  
      expect(errCar).to.be.instanceOf(ZodError);
      expect(errCar.issues[0].message).to.be.equal("Year must be greater than or equal to 1900");
    });

    it('Invalid year greater than 2022', async () => {
      let errCar: any;
      const carMockInvalid = {
        model: 'Ferrari Purosangue',
        year: 2030,
        color: 'Red',
        buyValue: 950000,
        doorsQty: 4,
        seatsQty: 4,
      }
      
      try {
        await carService.create(carMockInvalid);
      } catch (error: any) {
        errCar = error;
      };
  
      expect(errCar).to.be.instanceOf(ZodError);
      expect(errCar.issues[0].message).to.be.equal("Year must be less than or equal to 2022");
    });
  });

  describe('List All Cars', () => {
    it('success', async () => {
      const newCar = await carService.read();
 
      expect(newCar).to.be.deep.equal([carMockWithId]);
    })

    it('empty', async () => {
      const newCar = await carService.read();
 
      expect(newCar).to.be.deep.equal([]);
    })
  });

  describe('searching a car by id', () => {
    it('success', async () => {
      const newCar = await carService.readOne(_id);
 
      expect(newCar).to.be.deep.equal(carMockWithId);
    })

    it('_id not found', async () => {
      let err: any;

      try {
        await carService.readOne('IdErrado');
      } catch (error) {
        err = error;
      }
      
      expect(err.message).to.be.eq(ErrorTypes.ObjectNotFound);
    })
  })

  describe('changing a car', () => {
    it('success', async () => {
      const newCar = await carService.update(_id, carMockForChange);
 
      expect(newCar).to.be.deep.equal(carMockForChangeWithId);
    })

    it('_id not found', async () => {
      let err: any;

      try {
        await carService.update('IdErrado', carMockForChange);
      } catch (error) {
        err = error;
      }
      
      expect(err.message).to.be.eq(ErrorTypes.ObjectNotFound);
    })

    it('number of ports cannot be greater than 4', async () => {
      let errCar: any;
      const carMockInvalid = {
        model: 'Ferrari Purosangue',
        year: 2030,
        color: 'Red',
        buyValue: 950000,
        doorsQty: 8,
        seatsQty: 4,
      }
      
      try {
        await carService.update(_id, carMockInvalid);
      } catch (error: any) {
        errCar = error;
      };
  
      expect(errCar).to.be.instanceOf(ZodError);
      expect(errCar.issues[0].message).to.be.equal("Doors quantity must be less than or equal to 4");
    });
  })

  describe('excluding a car', () => {
    it('success', async () => {
      const newCar = await carService.delete(_id);
 
      expect(newCar).to.be.deep.equal(carMockWithId);
    })

    it('_id not found', async () => {
      let err: any;

      try {
        await carService.delete('IdErrado');
      } catch (error) {
        err = error;
      }
      
      expect(err.message).to.be.eq(ErrorTypes.ObjectNotFound);
    })
  })
});
