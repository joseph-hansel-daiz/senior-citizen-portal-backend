import { IdentifyingInformation } from "@/models";
import type { CreationAttributes } from "sequelize";
import { Transaction } from "sequelize";

export class IdentifyingInformationService {
  async getBySeniorId(seniorId: number) {
    return IdentifyingInformation.findByPk(seniorId);
  }

  async create(data: CreationAttributes<IdentifyingInformation>, transaction?: Transaction) {
    // If no data provided, create with minimal required fields
    if (!data || Object.keys(data).length === 0) {
      throw new Error("IdentifyingInformation is required and cannot be empty");
    }

    if (!data.lastname || !data.firstname || !data.region || !data.province || !data.city || !data.barangay || !data.residence || !data.birthDate || !data.birthPlace || !data.maritalStatus || !data.sexAtBirth) {
      throw new Error("Required fields: lastname, firstname, region, province, city, barangay, residence, birthDate, birthPlace, maritalStatus, sexAtBirth");
    }

    return IdentifyingInformation.create(data, { transaction });
  }

  async update(seniorId: number, data: Partial<CreationAttributes<IdentifyingInformation>>, transaction?: Transaction) {
    const identifyingInfo = await IdentifyingInformation.findByPk(seniorId, { transaction });
    
    if (!identifyingInfo) {
      throw new Error("Identifying information not found");
    }

    await identifyingInfo.update(data, { transaction });
    return identifyingInfo;
  }

  async delete(seniorId: number) {
    const identifyingInfo = await IdentifyingInformation.findByPk(seniorId);
    
    if (!identifyingInfo) {
      throw new Error("Identifying information not found");
    }

    await identifyingInfo.destroy();
    return { message: "Identifying information deleted successfully" };
  }
}

export const identifyingInformationService = new IdentifyingInformationService();
