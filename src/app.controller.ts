import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger, BadRequestException } from '@nestjs/common';

@Controller('api')
export class AppController {
    constructor(private readonly appService: AppService) {}
    logger = new Logger(AppController.name);

    @Get('classify-number')
    async classify(@Query('number') number: string) {
        const parsedNumber = parseInt(number, 10);
        if (isNaN(parsedNumber)) {
            throw new BadRequestException({
                number: 'alphabet',
                error: true,
            });
        }
        const result = await this.appService.classify(parsedNumber);
        return {
            number: result.number,
            is_prime: result.is_prime,
            is_perfect: result.is_perfect,
            digit_sum: result.digit_sum,
            fun_fact: result.fun_fact,
        };
    }
}
