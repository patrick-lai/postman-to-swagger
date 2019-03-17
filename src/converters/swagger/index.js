/**
 * Swagger writer
 * Inspiration: https://github.com/IntegrateDev/postman2swagger2/blob/master/index.js
 */

import _ from 'lodash';
import {
  convertCommonHost,
  convertheaders,
  convertBody,
  convertResponses,
  convertSchemes,
} from './_helpers';

const template = { swagger: '2.0' };

const makeAddMember = (paths, tag) => (member) => {
  const request = member.request;
  const fullPath = `/${request.url.path.join('/')}`;
  const method = request.method;
  const parameters = convertheaders(request).concat(convertBody(request));
  const responses = convertResponses(member.responses);

  _.set(paths, `${fullPath}.${method.toLowerCase()}`, {
    description: _.get(request, 'description.content'),
    summary: _.get(member, 'name'),
    tags: [tag],
    produces: ['application/json'],
    // operationId: 'SiraEstimatesPost',
    parameters,
    responses,
  });

  return paths;
};

// Collection is postman collection
export default (collection) => {
  // eslint-disable-next-line
  const { npm_package_version } = process.env;

  // Clone
  const newSwagger = { ...template };

  // Info
  _.set(newSwagger, 'version', npm_package_version);
  _.set(newSwagger, 'schemes', convertSchemes(collection));
  _.set(newSwagger, 'info', {
    title: collection.name,
    version: npm_package_version,
    description: collection.description.content,
    host: convertCommonHost(collection),
  });

  const paths = {};

  collection.items.members.forEach((group) => {
    const tag = group.name;
    // The default root one
    if (!group.items) {
      makeAddMember(paths, 'default')(group);
      return;
    }

    // Folders
    const members = group.items.members;
    members.forEach(makeAddMember(paths, tag));
  });

  return { ...newSwagger, paths };
};
