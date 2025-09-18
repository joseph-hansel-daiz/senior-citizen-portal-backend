import "dotenv/config";
import { sequelize, User, Barangay } from "../models";

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    console.log("Seeding Barangays...");
    await Barangay.create({ name: "Astorga" });
    await Barangay.create({ name: "Balire" });
    await Barangay.create({ name: "Banawang" });
    await Barangay.create({ name: "San Antonio" });
    await Barangay.create({ name: "San Pedro" });
    await Barangay.create({ name: "San Roque" });
    await Barangay.create({ name: "San Vicente" });
    await Barangay.create({ name: "Santo Niño" });

    console.log("Seeding users...");
    await User.create({
      username: "admin",
      password: "password123",
      name: "Administrator",
      role: "admin",
    });
    await User.create({
      username: "osca",
      password: "password123",
      name: "OSCA",
      role: "osca",
    });
    await User.create({
      username: "view_only",
      password: "password123",
      name: "View Only",
      role: "viewOnly",
    });

    await User.create({
      username: "astorga",
      password: "password123",
      name: "Astorga",
      role: "barangay",
      barangayId: 1,
    });
    await User.create({
      username: "balire",
      password: "password123",
      name: "Balire",
      role: "barangay",
      barangayId: 2,
    });
    await User.create({
      username: "banawang",
      password: "password123",
      name: "Banawang",
      role: "barangay",
      barangayId: 3,
    });
    await User.create({
      username: "san_antonio",
      password: "password123",
      name: "San Antonio",
      role: "barangay",
      barangayId: 4,
    });
    await User.create({
      username: "san_pedro",
      password: "password123",
      name: "San Pedro",
      role: "barangay",
      barangayId: 5,
    });
    await User.create({
      username: "san_roque",
      password: "password123",
      name: "San Roque",
      role: "barangay",
      barangayId: 6,
    });
    await User.create({
      username: "san_vicente",
      password: "password123",
      name: "San Vicente",
      role: "barangay",
      barangayId: 7,
    });
    await User.create({
      username: "santo_niño",
      password: "password123",
      name: "Santo Niño",
      role: "barangay",
      barangayId: 8,
    });

    console.log("Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seed();
