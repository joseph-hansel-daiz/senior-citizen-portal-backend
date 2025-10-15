import { DeathInfo } from "@/models";
import type { InferCreationAttributes } from "sequelize";

export class DeathInfoService {
  async getBySeniorId(seniorId: number) {
    return DeathInfo.findByPk(seniorId);
  }

  async create(data: InferCreationAttributes<DeathInfo>) {
    if (!data.dateOfDeath || !data.deathCertificate) {
      throw new Error("Required fields: dateOfDeath, deathCertificate");
    }

    return DeathInfo.create(data);
  }

  async update(seniorId: number, data: Partial<InferCreationAttributes<DeathInfo>>) {
    const deathInfo = await DeathInfo.findByPk(seniorId);
    
    if (!deathInfo) {
      throw new Error("Death info not found");
    }

    await deathInfo.update(data);
    return deathInfo;
  }

  async delete(seniorId: number) {
    const deathInfo = await DeathInfo.findByPk(seniorId);
    
    if (!deathInfo) {
      throw new Error("Death info not found");
    }

    await deathInfo.destroy();
    return { message: "Death info deleted successfully" };
  }
}

export const deathInfoService = new DeathInfoService();
