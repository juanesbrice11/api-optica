import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GlassesModule } from './glasses/glasses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesModule } from './sales/sales.module';
import { ClinicalHistoryModule } from './clinical-history/clinical-history.module';
import * as crypto from 'crypto';

(global as any).crypto = crypto;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');

        if (databaseUrl) {
          return {
            type: 'mysql',
            url: databaseUrl,
            autoLoadEntities: true,
            synchronize: true, // ⚠️ Cambiar a false en producción
          };
        }

        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST', 'localhost'),
          port: parseInt(configService.get<string>('DB_PORT', '3306')),
          username: configService.get<string>('DB_USERNAME', 'root'),
          password: configService.get<string>('DB_PASSWORD', ''),
          database: configService.get<string>('DB_DATABASE', 'test'),
          autoLoadEntities: true,
          synchronize: true, // ⚠️ Cambiar a false en producción
        };
      },
      inject: [ConfigService],
    }),
    ClientModule,
    AuthModule,
    UsersModule,
    GlassesModule,
    SalesModule,
    ClinicalHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
