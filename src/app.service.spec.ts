import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';

describe('AppService', () => {
    let service: AppService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            providers: [AppService],
        }).compile();

        service = module.get<AppService>(AppService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('isPerfect', () => {
        it('should return true for perfect numbers', () => {
            expect(service.isPerfect(6)).toBe(true);
            expect(service.isPerfect(28)).toBe(true);
            expect(service.isPerfect(496)).toBe(true);
        });

        it('should return false for non-perfect numbers', () => {
            expect(service.isPerfect(5)).toBe(false);
            expect(service.isPerfect(10)).toBe(false);
            expect(service.isPerfect(100)).toBe(false);
        });

        it('should return false for negative numbers', () => {
            expect(service.isPerfect(-6)).toBe(false);
            expect(service.isPerfect(-28)).toBe(false);
        });

        it('should return false for zero', () => {
            expect(service.isPerfect(0)).toBe(false);
        });
    });

    describe('digitSum', () => {
        it('should return the sum of digits of a number', () => {
            expect(service.digitSum(123)).toBe(6);
            expect(service.digitSum(456)).toBe(15);
            expect(service.digitSum(789)).toBe(24);
        });

        it('should return 0 for 0', () => {
            expect(service.digitSum(0)).toBe(0);
        });

        it('should handle negative numbers', () => {
            expect(service.digitSum(-123)).toBe(6);
            expect(service.digitSum(-456)).toBe(15);
        });
    });

    describe('classify', () => {
        it('should include is_perfect in the response', async () => {
            const result = await service.classify(6);
            expect(result).toHaveProperty('is_perfect', true);

            const result2 = await service.classify(10);
            expect(result2).toHaveProperty('is_perfect', false);
        });

        it('should include digit_sum in the response', async () => {
            const result = await service.classify(123);
            expect(result).toHaveProperty('digit_sum', 6);

            const result2 = await service.classify(456);
            expect(result2).toHaveProperty('digit_sum', 15);
        });
    });

    describe('properties', () => {
        it('should return properties for a given number', () => {
            expect(service.properties(6)).toEqual(['even', 'perfect']);
            expect(service.properties(7)).toEqual(['odd', 'prime']);
            expect(service.properties(28)).toEqual(['even', 'perfect']);
        });

        it('should return "odd" for odd numbers', () => {
            expect(service.properties(5)).toContain('odd');
            expect(service.properties(7)).toContain('odd');
        });

        it('should return "even" for even numbers', () => {
            expect(service.properties(4)).toContain('even');
            expect(service.properties(8)).toContain('even');
        });

        it('should return "prime" for prime numbers', () => {
            expect(service.properties(5)).toContain('prime');
            expect(service.properties(7)).toContain('prime');
        });

        it('should return "perfect" for perfect numbers', () => {
            expect(service.properties(6)).toContain('perfect');
            expect(service.properties(28)).toContain('perfect');
        });
    });
});
