import { logger } from './application/logger.js';
import { web } from './application/web.js';

web.listen(5000, () => logger.info(`Running...`));
