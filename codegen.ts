import { CodegenConfig } from '@graphql-codegen/cli';
import { loadEnv } from 'vite';

const env = loadEnv('development', process.cwd(), '');
const GITHUB_KEY = JSON.stringify(env.GITHUB_KEY).replace(/"/g, '');

const config: CodegenConfig = {
    schema: {
        'https://api.github.com/graphql': {
            headers: {
                Authorization: `Bearer ${GITHUB_KEY}`,
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
            plugins: ['typescript-operations'],
        },
    },
    ignoreNoDocuments: true,
    debug: true,
    verbose: true,
};

export default config;
