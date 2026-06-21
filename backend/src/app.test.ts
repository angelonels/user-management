import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import { createApp } from "./app.js";
import type { UsersRepository } from "./modules/users/users.repository.js";
import type { NewUser, User } from "./modules/users/users.types.js";

const sampleUser: User = {
  id: 1,
  name: "Ananya Menon",
  email: "ananya.menon@example.com",
  primaryMobile: "9876543210",
  secondaryMobile: "8765432109",
  aadhaar: "123456789012",
  pan: "ABCDE1234F",
  dateOfBirth: "1992-04-12",
  placeOfBirth: "Kochi",
  currentAddress: "18 Marine Drive, Kochi 682031",
  permanentAddress: "18 Marine Drive, Kochi 682031",
  isPermanentAddressSameAsCurrent: true,
  createdAt: new Date("2026-01-02T10:00:00.000Z"),
  updatedAt: new Date("2026-01-03T10:00:00.000Z"),
  deletedAt: null
};

function createRepository(overrides: Partial<UsersRepository> = {}): UsersRepository {
  return {
    create: vi.fn(async (data: NewUser) => ({
      ...sampleUser,
      ...data,
      id: 2,
      createdAt: new Date("2026-01-04T10:00:00.000Z"),
      updatedAt: new Date("2026-01-04T10:00:00.000Z"),
      deletedAt: null
    })),
    findById: vi.fn(async (id: number) => (id === sampleUser.id ? sampleUser : null)),
    findByUniqueField: vi.fn(async () => null),
    list: vi.fn(async () => ({ users: [sampleUser], total: 1 })),
    update: vi.fn(async (id: number, data: Partial<NewUser>) =>
      id === sampleUser.id ? { ...sampleUser, ...data } : null
    ),
    setDeletedAt: vi.fn(async (id: number, deletedAt: Date | null) =>
      id === sampleUser.id ? { ...sampleUser, deletedAt } : null
    ),
    ...overrides
  };
}

describe("app", () => {
  it("returns health status", async () => {
    const app = createApp(createRepository());

    const response = await request(app).get("/api/v1/health").expect(200);

    expect(response.body).toEqual({
      data: {
        status: "ok",
        service: "user-registry-backend"
      }
    });
  });

  it("lists users with masked identity fields and pagination", async () => {
    const repository = createRepository();
    const app = createApp(repository);

    const response = await request(app)
      .get("/api/v1/users")
      .query({ page: 1, pageSize: 10, status: "active" })
      .expect(200);

    expect(response.body.data).toEqual([
      expect.objectContaining({
        id: sampleUser.id,
        name: sampleUser.name,
        email: sampleUser.email,
        aadhaarMasked: "XXXX XXXX 9012",
        panMasked: "ABCDE****F"
      })
    ]);
    expect(response.body.meta).toEqual(
      expect.objectContaining({
        page: 1,
        pageSize: 10,
        total: 1,
        totalPages: 1
      })
    );
    expect(repository.list).toHaveBeenCalledWith(
      expect.objectContaining({ page: 1, pageSize: 10, status: "active" })
    );
  });
});
