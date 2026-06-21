import { db, pool } from "./db.js";
import { users as usersTable } from "./schema/users.schema.js";
import { like } from "drizzle-orm";

const firstNames = [
  "Aarav",
  "Ananya",
  "Vihaan",
  "Ishita",
  "Kabir",
  "Meera",
  "Reyansh",
  "Saanvi",
  "Arjun",
  "Naina"
];

const lastNames = [
  "Menon",
  "Iyer",
  "Nair",
  "Kapoor",
  "Rao",
  "Sharma",
  "Pillai",
  "Bose",
  "Mehta",
  "Verma"
];

const cities = [
  "Chennai",
  "Bengaluru",
  "Mumbai",
  "Kochi",
  "Hyderabad",
  "Pune",
  "Delhi",
  "Ahmedabad",
  "Kolkata",
  "Jaipur"
];

function pad(value: number, length: number) {
  return String(value).padStart(length, "0");
}

function buildUsers() {
  return Array.from({ length: 100 }, (_, index) => {
    const id = index + 1;
    const firstName = firstNames[index % firstNames.length];
    const lastName = lastNames[Math.floor(index / firstNames.length) % lastNames.length];
    const city = cities[index % cities.length];
    const year = 1985 + (index % 18);
    const month = (index % 12) + 1;
    const day = (index % 27) + 1;
    const sameAddress = index % 3 === 0;

    return {
      name: `${firstName} ${lastName}`,
      email: `seed.user${pad(id, 3)}@example.com`,
      primaryMobile: `9${pad(100000000 + id, 9)}`,
      secondaryMobile: index % 4 === 0 ? null : `8${pad(200000000 + id, 9)}`,
      aadhaar: `${pad(700000000000 + id, 12)}`,
      pan: `USRMG${pad(id, 4)}${String.fromCharCode(65 + (index % 26))}`,
      dateOfBirth: `${year}-${pad(month, 2)}-${pad(day, 2)}`,
      placeOfBirth: city,
      currentAddress: `${12 + id}, ${city} Main Road, ${city} - ${pad(600000 + id, 6)}`,
      permanentAddress: sameAddress
        ? `${12 + id}, ${city} Main Road, ${city} - ${pad(600000 + id, 6)}`
        : `${42 + id}, ${city} Residency Street, ${city} - ${pad(500000 + id, 6)}`,
      isPermanentAddressSameAsCurrent: sameAddress,
      deletedAt: index % 17 === 0 ? new Date() : null
    };
  });
}

async function seed() {
  const users = buildUsers();

  await db
    .delete(usersTable)
    .where(like(usersTable.email, "seed.user%@example.com"));

  await db.insert(usersTable).values(users);

  console.log(`Seeded ${users.length} users.`);
}

seed()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
