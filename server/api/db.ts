import { faker } from "@faker-js/faker";

faker.seed(1);
export const mockUsers = Array.from({ length: 1000 }, (_, index) => ({
  id: index,
  name: faker.person.fullName(),
}));

export const mockjourneys = Array.from({ length: 1000 }, (_, index) => ({
  id: index,
  name: faker.lorem.sentence(),
  from: faker.location.city(),
  to: faker.location.city(),
}));
