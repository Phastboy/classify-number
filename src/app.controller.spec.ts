import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
    let appController: AppController;
    let appService: AppService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        appController = app.get<AppController>(AppController);
        appService = app.get<AppService>(AppService);
    });

    describe('classify', () => {
        it('should return classification with is_prime property', async () => {
            const number = 7;
            const result = {
                number,
                is_prime: true,
                fun_fact: '7 is a prime number',
            };

            jest.spyOn(appService, 'classify').mockImplementation(async () => result);

            expect(await appController.classify(number.toString())).toBe(result);
        });

        it('should throw BadRequestException for invalid number', async () => {
            await expect(appController.classify('invalid')).rejects.toThrow('Invalid number parameter');
        });
    });
});
