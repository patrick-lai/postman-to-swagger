/**
 * Converts postman collections to swagger (maybe more formats later)
 */

import { importCollection } from './_helpers';
import convertToSwagger from './converters/swagger';

export default (filePath) => {
  if (!filePath) throw new Error('Misuse, please look at docs');
  // TODO: Maybe suppport url dunno
  // const isUrl = filePath.indexOf('http') === 0
  const myCollection = importCollection(filePath);
  return convertToSwagger(myCollection);
};
