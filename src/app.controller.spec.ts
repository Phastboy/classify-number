import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';

describe('AppController', () => {
    let appController: AppController;
    let appService: AppService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        appController = app.get<AppController>(AppController);
        appService = app.get<AppService>(AppService);
    });

    describe('classify', () => {
        it('should classify a prime number', async () => {
            const result = await appController.classify('7');
            expect(result).toEqual({
                number: 7,
                is_prime: true,
                is_perfect: false,
                is_armstrong: false,
                properties: ['prime', 'odd'],
                digit_sum: 7,
                fun_fact: expect.any(String),
            });
        });

        it('should classify a perfect number', async () => {
            const result = await appController.classify('6');
            expect(result).toEqual({
                number: 6,
                is_prime: false,
                is_perfect: true,
                is_armstrong: false,
                properties: ['perfect', 'even'],
                digit_sum: 6,
                fun_fact: expect.any(String),
            });
        });

        it('should classify an Armstrong number', async () => {
            const result = await appController.classify('153');
            expect(result).toEqual({
                number: 153,
                is_prime: false,
                is_perfect: false,
                is_armstrong: true,
                properties: ['armstrong', 'odd'],
                digit_sum: 9,
                fun_fact: expect.any(String),
            });
        });

        it('should classify an odd number', async () => {
            const result = await appController.classify('9');
            expect(result).toEqual({
                number: 9,
                is_prime: false,
                is_perfect: false,
                is_armstrong: false,
                properties: ['odd'],
                digit_sum: 9,
                fun_fact: expect.any(String),
            });
        });

        it('should return a bad request for invalid number', async () => {
            try {
                await appController.classify('invalid');
            } catch (error) {
                expect(error.response).toEqual({
                    number: 'invalid',
                    error: true,
                });
            }
        });
    });
});
