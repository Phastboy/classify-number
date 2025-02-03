import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
    constructor(private readonly httpService: HttpService) {}

    isPrime(number: number): boolean {
        if (number <= 1) return false;
        if (number <= 3) return true;
        if (number % 2 === 0 || number % 3 === 0) return false;
        for (let i = 5; i * i <= number; i += 6) {
            if (number % i === 0 || number % (i + 2) === 0) return false;
        }
        return true;
    }

    async fetchFunFact(number: number): Promise<string> {
        const response: AxiosResponse<string> = await firstValueFrom(
            this.httpService.get(`http://numbersapi.com/${number}`),
        );
        return response.data;
    }

    async classify(
        number: number,
    ): Promise<{ number: number; is_prime: boolean; fun_fact: string }> {
        const funFact = await this.fetchFunFact(number);
        return {
            number,
            is_prime: this.isPrime(number),
            fun_fact: funFact,
        };
    }
}
