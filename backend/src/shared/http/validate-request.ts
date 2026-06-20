import type { NextFunction, Request, Response } from "express";
import type { z } from "zod";

type Schemas = {
  body?: z.ZodTypeAny;
  query?: z.ZodTypeAny;
  params?: z.ZodTypeAny;
};

export function validateRequest(schemas: Schemas) {
  return (request: Request, _response: Response, next: NextFunction) => {
    if (schemas.body) {
      request.body = schemas.body.parse(request.body);
    }

    if (schemas.query) {
      request.query = schemas.query.parse(request.query);
    }

    if (schemas.params) {
      request.params = schemas.params.parse(request.params);
    }

    next();
  };
}

