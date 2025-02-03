import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';
import { RequestLoggerMiddleware } from './request-logger.middleware';

describe('RequestLoggerMiddleware', () => {
    let middleware: RequestLoggerMiddleware;
    let logger: Logger;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RequestLoggerMiddleware],
        }).compile();

        middleware = module.get<RequestLoggerMiddleware>(
            RequestLoggerMiddleware,
        );
        logger = (middleware as any).logger; // Access the private logger instance
    });

    it('should log the request method and URL', () => {
        // Mock the request, response, and next function
        const req = { method: 'GET', originalUrl: '/test' } as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;

        // Spy on the logger's log method
        const logSpy = jest.spyOn(logger, 'log');

        // Call the middleware's use method
        middleware.use(req, res, next);

        // Assert that the logger's log method was called with the correct message
        expect(logSpy).toHaveBeenCalledWith('Request: GET /test');

        // Assert that the next function was called
        expect(next).toHaveBeenCalled();
    });
});
