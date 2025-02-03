import { ApiProperty } from '@nestjs/swagger';

export class BadRequestResponseDto {
    @ApiProperty()
    number: string;

    @ApiProperty()
    error: boolean;
}
