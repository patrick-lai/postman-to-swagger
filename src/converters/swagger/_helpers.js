/**
 * helpers
 */

import _ from 'lodash';

export function convertCommonHost(collection) {
  const hosts = collection.items.members
    .map((item) => {
      const url = item.request && item.request.url;
      if (!url) return undefined;
      return url.host.join('/');
    })
    .filter(url => !!url);

  // Find most frequent
  return _.head(
    _(hosts)
      .countBy()
      .entries()
      .maxBy('[1]'),
  );
}

export function convertSchemes(collection) {
  return _(collection.items.members)
    .map((item) => {
      const url = _.get(item, 'request.url');
      if (!url) return undefined;
      return url.protocol;
    })
    .uniq()
    .filter(protocol => !!protocol);
}

export function convertheaders(request) {
  return request.headers.members.map(header => ({
    name: header.key,
    in: 'header',
    required: true,
    type: 'string',
    example: header.value,
  }));
}

export function convertBody(request) {
  const rawBody = _.get(request, 'body.raw');

  if (!rawBody) return undefined;

  const exampleBody = {
    name: 'Body',
    in: 'body',
    required: true,
  };

  try {
    exampleBody.example = JSON.parse(rawBody);
    exampleBody.properties = _.mapValues(exampleBody.example, value => ({
      description: '',
      example: value,
      type: typeof value,
    }));
  } catch (e) {
    exampleBody.example = _.truncate(rawBody, { length: 250 });
  } finally {
    exampleBody.type = typeof exampleBody.example;
  }

  return [exampleBody];
}

export function convertResponses(_responses) {
  if (!_.get(_responses, 'members.length')) return undefined;

  const members = _responses.members;

  const responses = {};

  members.forEach((member) => {
    // Description
    _.set(responses, member.code, {
      description: `${_.get(member, '_details.standardName')} - ${_.get(
        member,
        '_details.detail',
      )}`,
    });

    // Response body
    if (member.body) {
      try {
        const json = JSON.parse(member.body);
        _.set(responses, `${member.code}.examples.application/json`, json);
      } catch (e) {
        /* istanbul ignore next */
        _.set(
          responses,
          `${member.code}.examples.application/text`,
          _.truncate(member.body, { length: 250 }),
        );
      }
    }
  });

  return responses;
}
