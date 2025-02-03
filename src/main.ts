import { NestFactory } from '@nestjs/core';
import { ConsoleLogger } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassifyNumberResponseDto } from './dto/classify-number-response.dto';
import { BadRequestResponseDto } from './dto/bad-request-response.dto';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true,
        logger: new ConsoleLogger({
            json: true,
            colors: true,
        }),
    });

    const config = new DocumentBuilder()
        .setTitle('Classify number')
        .setDescription(
            'API that takes a number and returns an interesting mathematical properties about it, along with a fun fact.',
        )
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config, {
        extraModels: [ClassifyNumberResponseDto, BadRequestResponseDto],
    });
    SwaggerModule.setup('/api', app, document);

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
