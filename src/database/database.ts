import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            const dataSource = new DataSource({
                type: configService.get<any>('DB_TYPE'),
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_DATABASE'),
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                synchronize: configService.get<boolean>('DB_SYNC'),
            });

            return dataSource.initialize();
        },
    },
];
