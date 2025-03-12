import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { DatabaseModule } from '../database/database.module';
import { clientProviders } from './client.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...clientProviders,
    ClientService
  ],
  controllers: [ClientController]
})
export class ClientModule {}
