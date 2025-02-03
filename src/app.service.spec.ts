import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { AppService } from './app.service';
import { of } from 'rxjs';

describe('AppService', () => {
    let service: AppService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            providers: [AppService],
        }).compile();

        service = module.get<AppService>(AppService);
    });

    describe('isPrime', () => {
        it('should return true for prime numbers', () => {
            expect(service['isPrime'](7)).toBe(true);
            expect(service['isPrime'](13)).toBe(true);
        });

        it('should return false for non-prime numbers', () => {
            expect(service['isPrime'](4)).toBe(false);
            expect(service['isPrime'](9)).toBe(false);
        });
    });

    describe('isPerfect', () => {
        it('should return true for perfect numbers', () => {
            expect(service['isPerfect'](6)).toBe(true);
            expect(service['isPerfect'](28)).toBe(true);
        });

        it('should return false for non-perfect numbers', () => {
            expect(service['isPerfect'](5)).toBe(false);
            expect(service['isPerfect'](10)).toBe(false);
        });
    });

    describe('isArmstrong', () => {
        it('should return true for Armstrong numbers', () => {
            expect(service['isArmstrong'](153)).toBe(true);
            expect(service['isArmstrong'](370)).toBe(true);
        });

        it('should return false for non-Armstrong numbers', () => {
            expect(service['isArmstrong'](123)).toBe(false);
            expect(service['isArmstrong'](200)).toBe(false);
        });
    });

    describe('calculateDigitSum', () => {
        it('should return the correct digit sum', () => {
            expect(service['calculateDigitSum'](123)).toBe(6);
            expect(service['calculateDigitSum'](456)).toBe(15);
        });
    });

    describe('getProperties', () => {
        it('should return the correct properties', () => {
            expect(service['getProperties'](true, false, false, 7)).toEqual([
                'prime',
                'odd',
            ]);
            expect(service['getProperties'](false, true, false, 6)).toEqual([
                'perfect',
                'even',
            ]);
            expect(service['getProperties'](false, false, true, 153)).toEqual([
                'armstrong',
                'odd',
            ]);
        });
    });

    describe('getFunFact', () => {
        it('should return a fun fact', async () => {
            jest.spyOn(service['httpService'], 'get').mockReturnValue(
                of({ data: 'fun fact' }),
            );
            const funFact = await service['getFunFact'](7);
            expect(funFact).toBe('fun fact');
        });
    });

    describe('classify', () => {
        it('should classify a prime number', async () => {
            const result = await service.classify(7);
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
            const result = await service.classify(6);
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
            const result = await service.classify(153);
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
            const result = await service.classify(9);
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
    });
});
