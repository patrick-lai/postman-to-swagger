/**
 * Converts postman collections to swagger (maybe more formats later)
 */

import convertToSwagger from './converters/swagger';

/* istanbul ignore next */
const postmanToSwagger = (json) => {
  if (!json) throw new Error('Misuse, please look at docs');
  return convertToSwagger(json);
};

export default postmanToSwagger;
