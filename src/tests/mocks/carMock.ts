import { ICar } from "../../interfaces/ICar";

const carMock: ICar = {
  model: 'Ferrari Purosangue',
  year: 2022,
  color: 'Red',
  buyValue: 950000,
  doorsQty: 4,
  seatsQty: 4,
}

const carMockWithId: ICar  & { _id: string } = {
  _id: '63248515401474596857ebcc',
  model: 'Ferrari Purosangue',
  year: 2022,
  color: 'Red',
  buyValue: 950000,
  doorsQty: 4,
  seatsQty: 4,
}

const carMockForChange: ICar = {
  model: 'Ferrari Purosangue - SUV',
  year: 2022,
  color: 'Grey',
  buyValue: 985000,
  doorsQty: 4,
  seatsQty: 4,
}

const carMockForChangeWithId: ICar  & { _id: string } = {
  _id: '63248515401474596857ebcc',
  model: 'Ferrari Purosangue - SUV',
  year: 2022,
  color: 'Grey',
  buyValue: 985000,
  doorsQty: 4,
  seatsQty: 4,
}

export {
  carMock,
  carMockWithId,
  carMockForChange,
  carMockForChangeWithId,
};
