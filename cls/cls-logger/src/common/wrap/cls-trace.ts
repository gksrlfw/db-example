import * as cls from 'cls-hooked';
import { v1 as uuidv1 } from 'uuid';

// https://blog.goncharov.page/nodejs-logging-made-right

export const clsNamespace = cls.createNamespace('expressMiddlewareCls');

export const expressMiddlewareCls = () => {
  return (req, res, next) => {
    clsNamespace.bind(req);
    clsNamespace.bind(res);

    const requestId = uuidv1();

    clsNamespace.run(() => {
      clsNamespace.set('requestId', requestId);
      next();
    });
  };
};
