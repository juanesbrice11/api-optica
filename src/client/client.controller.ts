import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.entity';

@Controller('clients')
export class ClientController {

    constructor(private clientsService: ClientService) {}

    @Post()
    async create(@Body() client: Client) {
        return this.clientsService.create(client);
    }

    @Get()
    async findAll() {
        return this.clientsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.clientsService.findOne(id);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.clientsService.remove(id);
    }

}