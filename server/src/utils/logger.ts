import pino from 'pino';
import pretty from 'pino-pretty';
import dayjs from 'dayjs';

// prettify
const stream = pretty({
  colorize: true
});

// format time
const pinoConfig = {
  base: {
    pid: false
  },
  timestamp: () => `,"time":"${dayjs().format('YYYY-MM-DD HH:mm:ss')}"`
};

const log = pino(pinoConfig, stream);

export default log;