import { ApiProperty } from '@nestjs/swagger';

export class ClassifyNumberResponseDto {
    @ApiProperty()
    number: number;

    @ApiProperty()
    is_prime: boolean;

    @ApiProperty()
    is_perfect: boolean;

    @ApiProperty()
    digit_sum: number;

    @ApiProperty()
    fun_fact: string;

    @ApiProperty()
    properties: string[];
}
