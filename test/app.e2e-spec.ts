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

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Hello World!');
    });

    it('/api/classify-number (GET) - valid prime number', () => {
        return request(app.getHttpServer())
            .get('/api/classify-number?number=7')
            .expect(200)
            .expect({
                number: 7,
                is_prime: true,
                is_perfect: false,
                properties: ['prime', 'odd'],
                digit_sum: 7,
                fun_fact: expect.any(String),
            });
    });

    it('/api/classify-number (GET) - valid perfect number', () => {
        return request(app.getHttpServer())
            .get('/api/classify-number?number=6')
            .expect(200)
            .expect({
                number: 6,
                is_prime: false,
                is_perfect: true,
                properties: ['perfect', 'even'],
                digit_sum: 6,
                fun_fact: expect.any(String),
            });
    });

    it('/api/classify-number (GET) - valid Armstrong number', () => {
        return request(app.getHttpServer())
            .get('/api/classify-number?number=153')
            .expect(200)
            .expect({
                number: 153,
                is_prime: false,
                is_perfect: false,
                properties: ['armstrong', 'odd'],
                digit_sum: 9,
                fun_fact: expect.any(String),
            });
    });

    it('/api/classify-number (GET) - valid odd number', () => {
        return request(app.getHttpServer())
            .get('/api/classify-number?number=9')
            .expect(200)
            .expect({
                number: 9,
                is_prime: false,
                is_perfect: false,
                properties: ['odd'],
                digit_sum: 9,
                fun_fact: expect.any(String),
            });
    });

    it('/api/classify-number (GET) - invalid number', () => {
        return request(app.getHttpServer())
            .get('/api/classify-number?number=invalid')
            .expect(400)
            .expect({
                number: 'invalid',
                error: true,
            });
    });
});
