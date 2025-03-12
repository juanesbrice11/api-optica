import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GlassesModule } from './glasses/glasses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Glasses } from './glasses/entities/glasses.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [Glasses],
        synchronize: configService.get('DB_SYNC') === 'true',
      }),
      inject: [ConfigService],
    }),
    ClientModule,
    AuthModule,
    UsersModule,
    GlassesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
