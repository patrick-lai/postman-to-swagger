/**
 * Parse json
 */

import { Collection } from 'postman-collection';
import fs from 'fs';

// TODO: support postman urls too
export const importCollection = (path) => {
  const json = JSON.parse(fs.readFileSync(path, 'utf8'));
  return new Collection(json);
};
