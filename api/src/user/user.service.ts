import { Injectable } from '@nestjs/common'

import { PrismaClient, User, Prisma } from '@prisma/client'

@Injectable()
export class UserService {
  db = new PrismaClient()

  async findAll(limit: number) {
    return this.db.user.findMany({ take: limit })
  }

  async findById(userId: number) {
    return this.db.user.findFirst({ where: { id: userId } })
  }

  async create(data: Prisma.UserCreateInput) {
    return this.db.user.create({ data })
  }
}