import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger, BadRequestException } from '@nestjs/common';

@Controller('api')
export class AppController {
    constructor(private readonly appService: AppService) {}
    logger = new Logger(AppController.name);

    @Get()
    async classify() {
        const number = 8;
        return await this.appService.classify(number);
    }
}
