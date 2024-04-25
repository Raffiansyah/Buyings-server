import { nanoid } from 'nanoid';

export const createOrderId = () => {
  return `BYG-${nanoid(4)}-${nanoid(8)}`;
};

console.log(createOrderId)