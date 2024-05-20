import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: `http://localhost:4000/graphql`,
  documents: ['src/**/*.graphql'],
  generates: {
    'src/graphql/__generated__/operation-types.ts': {
      plugins: [
        {
          add: {
            content: [
              '// THIS FILE IS GENERATED BY GRAPHQL-CODEGEN (see codegen.yml) -- DO NOT EDIT!',
            ],
          },
        },
        {
          typescript: {
            useTypeImports: true,
            defaultScalarType: 'unknown',
            useImplementingTypes: true,
          },
        },
        'typescript-operations',
        'named-operations-object',
      ],
      config: {
        namingConvention: { enumValues: 'keep' },
        arrayInputCoercion: false,
        dedupeFragments: true,
        strictScalars: true,
      },
    },
    'src/graphql/__generated__/react-apollo-hooks.ts': {
      plugins: [
        {
          add: {
            content: [
              '// THIS FILE IS GENERATED BY GRAPHQL-CODEGEN (see codegen.yml) -- DO NOT EDIT!',
              '/* eslint-disable */',
              "import * as Types from './operation-types';",
            ],
          },
        },
        'typescript-react-apollo',
      ],
      config: {
        importOperationTypesFrom: 'Types',
        withHooks: true,
        useIndexSignature: true,
        documentMode: 'graphQLTag',
      },
    },
    'src/graphql/__generated__/apollo-client-type-policies.ts': {
      plugins: [
        {
          add: {
            content: '/* eslint-disable @typescript-eslint/no-explicit-any */',
          },
        },
        {
          add: {
            content:
              '// THIS FILE IS GENERATED BY GRAPHQL-CODEGEN (see codegen.yml) -- DO NOT EDIT!',
          },
        },
        'typescript-apollo-client-helpers',
      ],
    },
    'src/graphql/__generated__/fragment-matcher.ts': {
      plugins: ['fragment-matcher'],
      hooks: {
        afterAllFileWrite: ['prettier --write'],
      },
    },
    'src/graphql/__generated__/validation-schemas.ts': {
      plugins: [
        {
          add: {
            content:
              '// THIS FILE IS GENERATED BY GRAPHQL-CODEGEN (see codegen.yml) -- DO NOT EDIT!',
          },
        },
        {
          add: {
            content: '/* eslint-disable */',
          },
        },
        'typescript-validation-schema',
      ],
      config: {
        importFrom: './operation-types',
        strictScalars: true,
        schema: 'zod',
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};
export default config;