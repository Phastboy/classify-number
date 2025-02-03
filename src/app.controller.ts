import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('classify-number')
    async classify(@Query('number') number: string) {
        const parsedNumber = parseInt(number, 10);
        if (isNaN(parsedNumber)) {
            throw new BadRequestException({
                number,
                error: true,
            });
        }
        return await this.appService.classify(parsedNumber);
    }
}
