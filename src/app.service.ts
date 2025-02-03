import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class AppService {
    constructor(private readonly httpService: HttpService) {}

    async classify(number: number) {
        const isPrime = this.isPrime(number);
        const isPerfect = this.isPerfect(number);
        const isArmstrong = this.isArmstrong(number);
        const digitSum = this.calculateDigitSum(number);
        const properties = this.getProperties(
            isPrime,
            isPerfect,
            isArmstrong,
            number,
        );

        const funFact = await this.getFunFact(number);

        return {
            number,
            is_prime: isPrime,
            is_perfect: isPerfect,
            properties,
            digit_sum: digitSum,
            fun_fact: funFact,
        };
    }

    private isPrime(number: number): boolean {
        if (number <= 1) return false;
        for (let i = 2; i < number; i++) {
            if (number % i === 0) return false;
        }
        return true;
    }

    private isPerfect(number: number): boolean {
        let sum = 0;
        for (let i = 1; i < number; i++) {
            if (number % i === 0) sum += i;
        }
        return sum === number;
    }

    private isArmstrong(number: number): boolean {
        const digits = number.toString().split('');
        const sum = digits.reduce(
            (acc, digit) => acc + Math.pow(parseInt(digit), digits.length),
            0,
        );
        return sum === number;
    }

    private calculateDigitSum(number: number): number {
        return number
            .toString()
            .split('')
            .reduce((acc, digit) => acc + parseInt(digit), 0);
    }

    private getProperties(
        isPrime: boolean,
        isPerfect: boolean,
        isArmstrong: boolean,
        number: number,
    ): string[] {
        const properties: string[] = [];
        if (isPrime) properties.push('prime');
        if (isPerfect) properties.push('perfect');
        if (isArmstrong) properties.push('armstrong');
        if (number % 2 === 0) properties.push('even');
        else properties.push('odd');
        return properties;
    }

    private async getFunFact(number: number): Promise<string> {
        const response = await this.httpService
            .get(`http://numbersapi.com/${number}`)
            .toPromise();
        if (!response) {
            throw new Error('Failed to fetch fun fact');
        }
        return response.data;
    }
}
