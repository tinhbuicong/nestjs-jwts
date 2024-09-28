import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { packageQuery } from './package.query';

@Injectable()
export class PackageService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async getPackages(data: any) {
    let { take, orderBy, page } = data;
    const total = await this.prisma.package.count();
    page = parseInt(page);
    take = parseInt(take);
    const items = await this.prisma.package.findMany({
      select: packageQuery,
      skip: (page - 1) * take,
      take: take,
      orderBy: orderBy ?? {
        updatedAt: 'asc',
      },
    });

    return {
      items,
      paging: {
        total,
        page,
        take,
      },
    };
  }

  async createPackage(body: any, user: any) {
    const data = {
      title: body.title as string,
      items: body.items as string,
      userId: user.sub,
    };
    return await this.prisma.package.create({
      data: data,
    });
  }

  async getById(id: number) {
    var packageData = await this.prisma.package.findFirst({
      where: { id: +id },
      select: packageQuery,
    });
    return packageData;
  }

  async updatePackage(id: number, body: any) {
    const packageData = await this.prisma.package.findUnique({
      where: { id: +id },
    });

    if (!packageData) {
      return {
        success: false,
        message: 'package_not_found',
      };
    }

    return this.prisma.package.update({
      where: { id: +id },
      data: {
        title: body.title,
        items: body.items,
        important: body.important ? body.important : packageData.important,
        learnSchedule: body.learnSchedule
          ? body.learnSchedule
          : packageData.learnSchedule,
      },
    });
  }

  async deletePackage(id: number) {
    var packageData = await this.prisma.package.findFirst({
      where: { id: +id },
    });
    if (!packageData) {
      return {
        success: false,
        message: 'package_not_found',
      };
    }
    await this.prisma.package.delete({ where: { id } });
    return {
      success: true,
    };
  }
}
