const quotes = [
  'Why did the developer go broke?',
  'Because he used up all his cache',
  'How do you comfort a JavaScript bug?',
  'You console it',
  `Did you hear about the restaurant on the moon?',
  'Great food, no atmosphere.`,
  `Want to hear a joke about paper?',
  'Nevermind it's tearable.`,
  `What do you call a man with a rubber toe?',
  'Roberto.`
];
let index = 0;
export function generateJoke() {
  return quotes[index++];
}
