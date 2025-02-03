import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    async classify() {
        return await this.appService.classify(6);
    }
}
