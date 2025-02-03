import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
    constructor(private readonly httpService: HttpService) {}

    async classify(
        number: number,
    ): Promise<{ number: number; fun_fact: string }> {
        const response = await firstValueFrom(
            this.httpService.get(`http://numbersapi.com/${number}`),
        );
        return {
            number,
            fun_fact: response.data,
        };
    }
}
