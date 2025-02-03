import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    async classify() {
        return {
            message: 'this is a placeholder',
        };
    }
}
