import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SalesService } from './sales.service';
import { Sales } from './sales.entity';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  findAll(): Promise<Sales[]> {
    return this.salesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Sales> {
    return this.salesService.findOne(id);
  }

  @Post()
  create(@Body() sale: Partial<Sales>): Promise<Sales> {
    return this.salesService.create(sale);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateData: Partial<Sales>): Promise<Sales> {
    return this.salesService.update(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.salesService.delete(id);
  }
}