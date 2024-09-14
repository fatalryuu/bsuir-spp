import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const zodValidation =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      let errorObj = {};
      (error as ZodError).issues.forEach((issue) => {
        if (errorObj[issue.path[0]]) {
          errorObj[issue.path[0]].push({ [issue.path[1]]: issue.message });
        } else {
          errorObj[issue.path[0]] = [{ [issue.path[1]]: issue.message }];
        }
      });
      return res.status(400).json(errorObj);
    }
  };
