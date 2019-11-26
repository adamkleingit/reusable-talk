import faker from 'faker';
export const ENGLISH_MESSAGE = 'Where is the water?';
export const POLISH_MESSAGE = 'Gdzie jest Soplica';

export function generateMessage() {
  return faker.lorem.sentence();
}
