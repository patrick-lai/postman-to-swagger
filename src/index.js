/**
 * Converts postman collections to swagger (maybe more formats later)
 */

import { Collection } from 'postman-collection';
import convertToSwagger from './converters/swagger';

const postmanToSwagger = (json) => {
  /* istanbul ignore next */
  if (!json) throw new Error('Misuse, please look at docs');
  return convertToSwagger(new Collection(json));
};

export default postmanToSwagger;
