import {
  bigint,
  boolean,
  date,
  index,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar
} from "drizzle-orm/mysql-core";

export const users = mysqlTable(
  "users",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    primaryMobile: varchar("primary_mobile", { length: 15 }).notNull(),
    secondaryMobile: varchar("secondary_mobile", { length: 15 }),
    aadhaar: varchar("aadhaar", { length: 12 }).notNull(),
    pan: varchar("pan", { length: 10 }).notNull(),
    dateOfBirth: date("date_of_birth", { mode: "string" }).notNull(),
    placeOfBirth: varchar("place_of_birth", { length: 100 }).notNull(),
    currentAddress: text("current_address").notNull(),
    permanentAddress: text("permanent_address").notNull(),
    isPermanentAddressSameAsCurrent: boolean(
      "is_permanent_address_same_as_current"
    )
      .notNull()
      .default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
    deletedAt: timestamp("deleted_at")
  },
  (table) => [
    uniqueIndex("users_email_unique").on(table.email),
    uniqueIndex("users_primary_mobile_unique").on(table.primaryMobile),
    uniqueIndex("users_aadhaar_unique").on(table.aadhaar),
    uniqueIndex("users_pan_unique").on(table.pan),
    index("users_deleted_at_idx").on(table.deletedAt),
    index("users_created_at_idx").on(table.createdAt),
    index("users_name_idx").on(table.name)
  ]
);

export type UserRow = typeof users.$inferSelect;
export type NewUserRow = typeof users.$inferInsert;

