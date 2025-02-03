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
        return await this.appService.classify(parsedNumber);
    }
}
