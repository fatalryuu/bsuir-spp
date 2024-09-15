import { eq } from 'drizzle-orm';
import { db } from '../drizzle';
import { User } from '../drizzle/models';
import * as models from '../drizzle/models';
import { PatchUserBody } from '../types/users';

class UsersService {
  async getUsers(admin: boolean | null): Promise<Omit<User, 'password'>[]> {
    let query = db
      .select({
        id: models.users.id,
        fullName: models.users.fullName,
        email: models.users.email,
        avatarUrl: models.users.avatarUrl,
        admin: models.users.admin,
      })
      .from(models.users)
      .$dynamic();

    if (admin !== null) {
      query = query.where(eq(models.users.admin, admin));
    }

    return await query;
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await db.select().from(models.users).where(eq(models.users.id, id));

    return user ? user[0] : null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await db.select().from(models.users).where(eq(models.users.email, email));

    return user ? user[0] : null;
  }

  async createUsers(payload: models.NewUser): Promise<Omit<User, 'password'>> {
    const usersRecords = await db.insert(models.users).values(payload).returning({
      id: models.users.id,
      fullName: models.users.fullName,
      email: models.users.email,
      avatarUrl: models.users.avatarUrl,
      admin: models.users.admin,
    });
    return usersRecords[0];
  }

  async deleteUser(id: string): Promise<void> {
    await db.delete(models.users).where(eq(models.users.id, id));
  }

  async editUser(id: string, payload: Omit<PatchUserBody, 'id'>): Promise<Omit<User, 'password'>> {
    const usersRecords = await db
      .update(models.users)
      .set(payload)
      .where(eq(models.users.id, id))
      .returning({
        id: models.users.id,
        fullName: models.users.fullName,
        email: models.users.email,
        avatarUrl: models.users.avatarUrl,
        admin: models.users.admin,
      });
    return usersRecords[0];
  }
}

export default new UsersService();
