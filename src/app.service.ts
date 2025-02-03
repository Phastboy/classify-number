import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AppService {
    constructor(private readonly httpService: HttpService) {}

    async classify(number: number) {
        return {
            number,
            message: 'this is a placeholder',
        };
    }
}
