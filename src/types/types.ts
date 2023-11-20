import { Request } from 'express';

export type RequestWithUser = {
  user: any;
} & Request;
