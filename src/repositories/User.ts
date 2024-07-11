import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class UserRepository {
  async getUserById(id: string) {
    const numericId = parseInt(id, 10); // Convertir en nombre
    if (isNaN(numericId)) {
      throw new Error('Invalid ID');
    }

    return await prisma.usertab.findUniqueOrThrow({ where: { id: numericId } });
  }

  async updateUser(id: string, props: any) {
    const numericId = parseInt(id, 10); // Convertir en nombre
    if (isNaN(numericId)) {
      throw new Error('Invalid ID');
    }

    return await prisma.usertab.update({ where: { id: numericId }, data: props });
  }

  async deleteUser(id: string) {
    const numericId = parseInt(id, 10); // Convertir en nombre
    if (isNaN(numericId)) {
      throw new Error('Invalid ID');
    }

    return await prisma.usertab.delete({ where: { id: numericId } });
  }

  async findByEmail(email: string) {
    return await prisma.usertab.findUnique({
      where: { email: email }
    });
  }
}

export default new UserRepository();
