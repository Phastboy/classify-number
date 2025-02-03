import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger, BadRequestException } from '@nestjs/common';

@Controller('api')
export class AppController {
    constructor(private readonly appService: AppService) {}
    logger = new Logger(AppController.name);

    @Get()
    async classify(@Query('number') number: string) {
        const parsedNumber = parseInt(number, 10);
        if (isNaN(parsedNumber)) {
            throw new BadRequestException('Invalid number parameter');
        }
        return await this.appService.classify(parsedNumber);
    }
}
