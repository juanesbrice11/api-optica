import { Injectable, Inject, NotFoundException, ConflictException, HttpStatus } from '@nestjs/common';
import { Repository, Not } from 'typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientService {
    constructor(
        @Inject('CLIENT_REPOSITORY')
        private clientRepository: Repository<Client>
    ) {}

    async create(clientData: Client): Promise<{ statusCode: number, message: string, client: Client }> {
        
        const existingClient = await this.clientRepository.findOne({
            where: [
                { email: clientData.email },
                { phone: clientData.phone }
            ]
        });

        if (existingClient) {
            throw new ConflictException('Ya existe un cliente con ese email o teléfono');
        }

        const client = this.clientRepository.create(clientData);
        await this.clientRepository.save(client);
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Cliente creado correctamente',
            client: client
        };
    }

    async findAll(): Promise<{ statusCode: number, message: string, clients: Client[] }> {
        const clients = await this.clientRepository.find();
        return {
            statusCode: HttpStatus.OK,
            message: 'Clientes encontrados correctamente',
            clients: clients
        };
    }

    async findOne(id: string): Promise<{ statusCode: number, message: string, client: Client }> {
        const client = await this.clientRepository.findOne({
            where: { id }
        });

        if (!client) {
            throw new NotFoundException('Cliente no encontrado');
        }

        return {
            statusCode: HttpStatus.OK,
            message: 'Cliente encontrado correctamente',
            client: client
        };
    }

    // async update(id: string, updateData: Partial<Client>): Promise<{ statusCode: number, message: string, client: Client }> {
    //     const client = await this.findOne(id);

    //     if (updateData.email || updateData.phone) {
    //         const existingClient = await this.clientRepository.findOne({
    //             where: [
    //                 { email: updateData.email, id: Not(id) },
    //                 { phone: updateData.phone, id: Not(id) }
    //             ]
    //         });

    //         if (existingClient) {
    //             throw new ConflictException('Ya existe un cliente con ese email o teléfono');
    //         }
    //     }

    //     Object.assign(client, updateData);
    //     await this.clientRepository.save(client);
    //     return {
    //         statusCode: HttpStatus.OK,
    //         message: 'Cliente actualizado correctamente',
    //         client: client
    //     };
    // }

    async remove(id: string): Promise<{ statusCode: number, message: string }> {
        const clientData = await this.findOne(id);
        await this.clientRepository.remove(clientData.client);
        return {
            statusCode: HttpStatus.OK,
            message: 'Cliente eliminado correctamente'
        };
    }

}
