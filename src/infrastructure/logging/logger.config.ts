import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

export const createLogger = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  return WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        format: isProduction
          ? winston.format.combine(
              winston.format.timestamp(),
              winston.format.json(),
            )
          : winston.format.combine(
              winston.format.timestamp(),
              nestWinstonModuleUtilities.format.nestLike('OficinaMecanica', {
                prettyPrint: true,
              }),
            ),
      }),
    ],
  });
};
