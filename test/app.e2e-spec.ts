import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/api/classify-number (GET)', () => {
        return request(app.getHttpServer())
            .get('/api/classify-number?number=7')
            .expect(200)
            .expect((res) => {
                expect(res.body).toEqual({
                    number: 7,
                    is_prime: true,
                    digit_sum: 7,
                    fun_fact: expect.any(String),
                });
            });
    });

    it('/api/classify-number (GET) - invalid number', () => {
        return request(app.getHttpServer())
            .get('/api/classify-number?number=invalid')
            .expect(400)
            .expect((res) => {
                expect(res.body).toEqual({
                    statusCode: 400,
                    message: 'Invalid number parameter',
                    error: 'Bad Request',
                });
            });
    });

    it('/api/classify-number (GET) - invalid number with letters', () => {
        return request(app.getHttpServer())
            .get('/api/classify-number?number=2abc')
            .expect(400)
            .expect((res) => {
                expect(res.body).toEqual({
                    statusCode: 400,
                    message: 'Invalid number parameter',
                    error: 'Bad Request',
                });
            });
    });

    it('/api/classify-number (GET) - invalid number with letters at the end', () => {
        return request(app.getHttpServer())
            .get('/api/classify-number?number=23c')
            .expect(400)
            .expect((res) => {
                expect(res.body).toEqual({
                    statusCode: 400,
                    message: 'Invalid number parameter',
                    error: 'Bad Request',
                });
            });
    });

    it('/api/classify-number (GET) - invalid number with only letters', () => {
        return request(app.getHttpServer())
            .get('/api/classify-number?number=abc')
            .expect(400)
            .expect((res) => {
                expect(res.body).toEqual({
                    statusCode: 400,
                    message: 'Invalid number parameter',
                    error: 'Bad Request',
                });
            });
    });
});
