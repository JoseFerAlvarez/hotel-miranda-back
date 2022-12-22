import { Send } from 'express-serve-static-core';
import { Query } from 'express-serve-static-core';

interface TypedRequest<T extends Query, U> extends Express.Request {
    body: U,
    query: T
}

interface TypedResponse<ResBody> extends Express.Response {
    json: Send<ResBody, this>;
}

export { TypedRequest, TypedResponse }
