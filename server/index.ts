import config from 'config';
import connectDB from './src/db/connect';
import logger from './src/utils/logger';
import createServer from './src/utils/server';

const port = config.get<number>('port');

const app = createServer();

app.listen(port, async () => {
  logger.info(`Server is running at http://localhost:${port}`);
  await connectDB();
});