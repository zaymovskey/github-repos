import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: {
        'https://api.github.com/graphql': {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_KEY}`,
                'User-Agent': 'Github-Repos',
            },
        },
    },
    documents: ['src/**/*.graphql'],
    generates: {
        'src/shared/api/models.gen.ts': {
            plugins: ['typescript'],
        },
        'src/': {
            preset: 'near-operation-file',
            presetConfig: {
                extension: '.gen.ts',
                baseTypesPath: 'shared/api/models.gen.ts',
            },
            plugins: ['typescript-operations', 'typescript-react-apollo'],
        },
    },
    ignoreNoDocuments: true,
    debug: true,
    verbose: true,
};

export default config;
