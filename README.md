# Postman to swagger

![coverage](./shields/coverage.svg) [![code style: prettier](https://img.shields.io/badge/code--style-IAG-purple.svg?longCache=true&style=flat-square)](https://chuck.auiag.corp/projects/DIGI/repos/eslint-config-iag/browse)

We like to use postman, but often we get asked for swagger docs. There doesn't seem to be any open source postman v2.0.0 => swagger/openApi tools. Maybe a commercial reason, here is one for you.

## Usage

```js
import postmanToSwagger from '@iag-packages/postman-to-swagger'

const convertAndSave = postmanPath => {
  // This returns the actual swagger v2.0 spec
  const swaggerJson = postmanToSwagger(postmanPath)

  // Example if you want to save it somewhere
  fs.writeFile('../_docs/swagger.json', JSON.stringify(swaggerJson, null, 2), 'utf8')
}
```

## What it converts

- name, description, version
- routes, folders
- examples, status codes

## Future improvement

- Apimatic has this `models` thing that is kind of useful, maybe we can also do that.

## Repos to watch

- [api-flow](https://github.com/luckymarmot/API-Flow) - broken, but maybe inspiring.
- [postman2swagger2](https://github.com/IntegrateDev/postman2swagger2/blob/master/index.js) - Doesn't support postman v2
