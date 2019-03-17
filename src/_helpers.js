/**
 * Parse json
 */

import { Collection } from 'postman-collection';
import fs from 'fs';

// TODO: support postman urls too
export const importCollection = (path) => {
  /* istanbul ignore next */
  if (path[0] !== '/') throw new Error('Expected absolute path to working directory, ie starts with "/"');
  const json = JSON.parse(fs.readFileSync(path).toString());
  return new Collection(json);
};
