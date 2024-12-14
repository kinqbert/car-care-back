import { Request, RequestHandler } from "express";

export interface UserRequest extends Request {
  userId: string;
}

export type UserRequestHandler = RequestHandler<UserRequest>;
