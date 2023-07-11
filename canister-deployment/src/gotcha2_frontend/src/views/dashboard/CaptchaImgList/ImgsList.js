// third-party
import { add, sub } from "date-fns";
import { Chance } from "chance";

const chance = new Chance();

// products list
export const products = [
  {
    id: 1,
    image: "prod-1.png",
    name: chance.name(),
    date: chance.natural(),
    created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
  },
  {
    id: 2,
    image: "prod-2.png",
    name: chance.name(),
    date: chance.natural(),
    created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
  },
  {
    id: 3,
    image: "prod-3.png",
    name: chance.name(),
    date: chance.natural(),
    created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
  },
  {
    id: 4,
    image: "prod-4.png",
    name: chance.name(),
    date: chance.natural(),
    created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
  },
  {
    id: 5,
    image: "prod-5.png",
    name: chance.name(),
    date: chance.natural(),
    created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
  },
  {
    id: 6,
    image: "prod-6.png",
    name: chance.name(),
    date: chance.natural(),
    created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
  },
  {
    id: 7,
    image: "prod-7.png",
    name: chance.name(),
    date: chance.natural(),
    created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
  },
  {
    id: 8,
    image: "prod-8.png",
    name: chance.name(),
    date: chance.natural(),
    created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
  },
];
