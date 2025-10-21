import { SeniorVaccine, Vaccine } from "@/models";

export class SeniorVaccineService {
  async listBySenior(seniorId: number) {
    return SeniorVaccine.findAll({
      where: { seniorId },
      include: [{ model: Vaccine, attributes: ["id", "name"] } as any],
      order: [["VaccineId", "ASC"]],
    });
  }

  async upsert({ seniorId, vaccineId, lastVaccineDate }: { seniorId: number; vaccineId: number; lastVaccineDate: string | null; }) {
    const [record] = await SeniorVaccine.upsert({
      seniorId,
      VaccineId: vaccineId,
      lastVaccineDate: lastVaccineDate ? new Date(lastVaccineDate) : null,
    });
    return record;
  }

  async delete({ seniorId, vaccineId }: { seniorId: number; vaccineId: number; }) {
    await SeniorVaccine.destroy({ where: { seniorId, VaccineId: vaccineId } });
    return { message: "Deleted" };
  }
}

export const seniorVaccineService = new SeniorVaccineService();


