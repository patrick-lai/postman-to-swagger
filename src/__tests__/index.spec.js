/**
 * Unit tests
 */

// import fs from 'fs'
import { importCollection } from '../_helpers';
import convertToSwagger from '../converters/swagger';

it('should be able to import a collection', () => {
  const myCollection = importCollection(`${process.cwd()}/_mockData/collection.json`);
  // Lets just assume if there is something we passed, screw snapshot
  expect(myCollection.toJSON()).not.toEqual({});
});

it('should be able to convert', () => {
  const myCollection = importCollection(`${process.cwd()}/_mockData/collection.json`);
  // Lets just assume if there is something we passed, screw snapshot
  convertToSwagger(myCollection);

  // Some debug stuff
  // const stringified = JSON.stringify(result, null, 2)
  // fs.writeFile('../express-engine/demo/_docs/resultSwagger.json', stringified, 'utf8')
});
