/**
 * Converts postman collections to swagger (maybe more formats later)
 */

import { importCollection } from './_helpers';
import convertToSwagger from './converters/swagger';

/* istanbul ignore next */
const postmanToSwagger = (filePath) => {
  if (!filePath) throw new Error('Misuse, please look at docs');
  return convertToSwagger(importCollection(filePath));
};

export default postmanToSwagger;
