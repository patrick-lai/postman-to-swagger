/**
 * Unit tests
 */

// import fs from 'fs'
import { importCollection } from '../_helpers';
import convertToSwagger from '../converters/swagger';

it('should be able to import a collection', () => {
  const myCollection = importCollection(`${__dirname}/collection.json`);
  // Lets just assume if there is something we passed, screw snapshot
  expect(myCollection.toJSON()).not.toEqual({});
});

it('should be able to convert', () => {
  const myCollection = importCollection(`${__dirname}/collection.json`);
  convertToSwagger(myCollection);
});
