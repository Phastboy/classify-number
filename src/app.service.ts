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

    isPerfect(number: number): boolean {
        if (number <= 0) return false;
        let sum = 0;
        for (let i = 1; i <= number / 2; i++) {
            if (number % i === 0) {
                sum += i;
            }
        }
        return sum === number;
    }

    digitSum(number: number): number {
        return Math.abs(number)
            .toString()
            .split('')
            .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
    }

    async fetchFunFact(number: number): Promise<string> {
        const response: AxiosResponse<string> = await firstValueFrom(
            this.httpService.get(`http://numbersapi.com/${number}`),
        );
        return response.data;
    }

    properties(number: number): string[] {
        const properties: string[] = [];
        if (number % 2 === 0) {
            properties.push('even');
        } else {
            properties.push('odd');
        }
        if (this.isPrime(number)) {
            properties.push('prime');
        }
        if (this.isPerfect(number)) {
            properties.push('perfect');
        }
        if (this.isArmstrong(number)) {
            properties.push('armstrong');
        }
        return properties;
    }

    isArmstrong(number: number): boolean {
        const digits = number.toString().split('');
        const numDigits = digits.length;
        const sum = digits.reduce(
            (acc, digit) => acc + Math.pow(parseInt(digit, 10), numDigits),
            0,
        );
        return sum === number;
    }

    async classify(
        number: number,
    ): Promise<{
        number: number;
        is_prime: boolean;
        is_perfect: boolean;
        digit_sum: number;
        fun_fact: string;
        properties: string[];
    }> {
        const funFact = await this.fetchFunFact(number);
        return {
            number,
            is_prime: this.isPrime(number),
            is_perfect: this.isPerfect(number),
            properties: this.properties(number),
            digit_sum: this.digitSum(number),
            fun_fact: funFact,
        };
    }
}
