/**
 * Unit tests
 */

import postmanToSwagger from '../index';
import collection from './collection';

it('should be able to convert', () => {
  postmanToSwagger(collection);
});
