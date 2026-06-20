import {
  and,
  asc,
  count,
  desc,
  eq,
  isNotNull,
  isNull,
  like,
  ne,
  or
} from "drizzle-orm";
import { db } from "../../shared/database/db.js";
import { users } from "../../shared/database/schema/users.schema.js";
import type { ListUsersFilters, NewUser, User, UserListResult } from "./users.types.js";

export type UniqueUserField = "email" | "primaryMobile" | "aadhaar" | "pan";

export type UsersRepository = {
  create(data: NewUser): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByUniqueField(
    field: UniqueUserField,
    value: string,
    excludeId?: number
  ): Promise<User | null>;
  list(filters: ListUsersFilters): Promise<UserListResult>;
  update(id: number, data: Partial<NewUser>): Promise<User | null>;
  setDeletedAt(id: number, deletedAt: Date | null): Promise<User | null>;
};

const fieldColumns = {
  email: users.email,
  primaryMobile: users.primaryMobile,
  aadhaar: users.aadhaar,
  pan: users.pan
};

const sortColumns = {
  createdAt: users.createdAt,
  name: users.name,
  email: users.email,
  dateOfBirth: users.dateOfBirth
};

export const mysqlUsersRepository: UsersRepository = {
  async create(data) {
    const insertedRows = await db.insert(users).values(data).$returningId();
    const insertId = insertedRows[0]?.id;

    const user = await this.findById(insertId);

    if (!user) {
      throw new Error("Created user could not be loaded.");
    }

    return user;
  },

  async findById(id) {
    const rows = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return rows[0] ?? null;
  },

  async findByUniqueField(field, value, excludeId) {
    const column = fieldColumns[field];
    const where = excludeId
      ? and(eq(column, value), ne(users.id, excludeId))
      : eq(column, value);

    const rows = await db.select().from(users).where(where).limit(1);
    return rows[0] ?? null;
  },

  async list(filters) {
    const where = [];

    if (filters.status === "active") {
      where.push(isNull(users.deletedAt));
    }

    if (filters.status === "deleted") {
      where.push(isNotNull(users.deletedAt));
    }

    if (filters.search) {
      const search = `%${filters.search}%`;
      where.push(
        or(
          like(users.name, search),
          like(users.email, search),
          like(users.primaryMobile, search)
        )
      );
    }

    const whereClause = where.length ? and(...where) : undefined;
    const sortColumn = sortColumns[filters.sortBy];
    const sortOrder = filters.sortOrder === "asc" ? asc(sortColumn) : desc(sortColumn);
    const offset = (filters.page - 1) * filters.pageSize;

    const countRows = await db
      .select({ total: count() })
      .from(users)
      .where(whereClause);

    const rows = await db
      .select()
      .from(users)
      .where(whereClause)
      .orderBy(sortOrder)
      .limit(filters.pageSize)
      .offset(offset);

    return {
      users: rows,
      total: Number(countRows[0]?.total ?? 0)
    };
  },

  async update(id, data) {
    if (Object.keys(data).length === 0) {
      return this.findById(id);
    }

    await db.update(users).set(data).where(eq(users.id, id));
    return this.findById(id);
  },

  async setDeletedAt(id, deletedAt) {
    await db.update(users).set({ deletedAt }).where(eq(users.id, id));
    return this.findById(id);
  }
};
