import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestLoggerMiddleware } from './request-logger/request-logger.middleware';

@Module({
    imports: [HttpModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestLoggerMiddleware).forRoutes('*');
    }
}
