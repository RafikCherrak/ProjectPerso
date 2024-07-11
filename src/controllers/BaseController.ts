import { Response } from "express";

export type EmptyResponse = Record<string, never>;
export type CtrlResponse<T> = void | Response<T> // void is for "return next(error)", that actually returns a Response but the compiler is not aware of it
