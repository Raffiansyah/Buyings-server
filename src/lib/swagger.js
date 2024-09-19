import swaggerJSDoc from 'swagger-jsdoc';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const openApiPath = join(__dirname, 'docs.json');
const openApiSpec = JSON.parse(readFileSync(openApiPath, 'utf8'));

const options =  {
  definition: openApiSpec,
  apis: ['../routes/*.js'],
};

export const specs = swaggerJSDoc(options);
