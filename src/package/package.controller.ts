import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { PackageService } from './package.service';
import { GetCurrentUser } from 'src/common/decorators';

@Controller('package')
export class PackageController {
  constructor(private authService: PackageService) {}

  @Get('')
  async findAll(
    @GetCurrentUser() user: any,
    @Query() params: any,
    @Body() dto: any,
  ) {
    return await this.authService.getPackages(params);
  }

  @Get('/:id')
  async findById(
    @GetCurrentUser() user: any,
    @Query() params: any,
    @Body() dto: any,
    @Param('id') id: number,
  ) {
    return await this.authService.getById(id);
  }

  @Put('/:id')
  async updatePackage(
    @GetCurrentUser() user: any,
    @Query() params: any,
    @Body() dto: any,
    @Param('id') id: number,
  ) {
    return await this.authService.updatePackage(id, dto);
  }

  @Post('')
  async createPackage(
    @GetCurrentUser() user: any,
    @Query() params: any,
    @Body() dto: any,
  ) {
    console.log('user', user);
    return await this.authService.createPackage(dto, user);
  }

  @Delete('/:id')
  async deleteById(
    @GetCurrentUser() user: any,
    @Query() params: any,
    @Body() dto: any,
    @Param('id') id: number,
  ) {
    return await this.authService.deletePackage(id);
  }
}
