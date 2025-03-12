import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { GlassesService } from './glasses.service';
import { CreateGlassesDto } from './dto/create-glasses.dto';
import { UpdateGlassesDto } from './dto/update-glasses.dto';

@Controller('glasses')
export class GlassesController {
  constructor(private readonly glassesService: GlassesService) {}

  @Post()
  create(@Body() createGlassesDto: CreateGlassesDto) {
    return this.glassesService.create(createGlassesDto);
  }

  @Get()
  findAll() {
    return this.glassesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.glassesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateGlassesDto: UpdateGlassesDto) {
    return this.glassesService.update(+id, updateGlassesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.glassesService.remove(+id);
  }
} 