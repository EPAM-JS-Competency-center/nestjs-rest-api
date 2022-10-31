class Logger implements Partial<Console> {
  info({ message }) {
    console.info(`Info: ${new Date().toISOString()}`, message);
  }

  error({ message }) {
    console.error(`Error: ${new Date().toISOString()}`, message);
  }

  log({ message }) {
    console.log(`Log: ${new Date().toISOString()}`, message);
  }
}

export const logger = new Logger();
