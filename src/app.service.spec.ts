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

    describe('classify', () => {
        it('should include is_perfect in the response', async () => {
            const result = await service.classify(6);
            expect(result).toHaveProperty('is_perfect', true);

            const result2 = await service.classify(10);
            expect(result2).toHaveProperty('is_perfect', false);
        });
    });
});
