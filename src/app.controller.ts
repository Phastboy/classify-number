import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger, BadRequestException } from '@nestjs/common';
import {
    ApiTags,
    ApiQuery,
    ApiOkResponse,
    ApiBadRequestResponse,
} from '@nestjs/swagger';
import { ClassifyNumberResponseDto } from './dto/classify-number-response.dto';
import { BadRequestResponseDto } from './dto/bad-request-response.dto';

@ApiTags('classify-number')
@Controller('api')
export class AppController {
    constructor(private readonly appService: AppService) {}
    logger = new Logger(AppController.name);

    @Get('classify-number')
    @ApiQuery({ name: 'number', required: true, type: String })
    @ApiOkResponse({
        description: 'Successful response',
        type: ClassifyNumberResponseDto,
    })
    @ApiBadRequestResponse({
        description: 'Invalid number parameter',
        type: BadRequestResponseDto,
    })
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
            properties: result.properties,
        };
    }
}
