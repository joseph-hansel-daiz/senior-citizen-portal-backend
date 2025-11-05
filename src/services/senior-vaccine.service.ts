import { SeniorVaccine, Vaccine } from "@/models";

export class SeniorVaccineService {
  async listBySenior(seniorId: number) {
    return SeniorVaccine.findAll({
      where: { seniorId },
      include: [{ model: Vaccine, attributes: ["id", "name"] } as any],
      order: [["vaccineId", "ASC"], ["vaccineDate", "DESC"]],
    });
  }

  async upsert({ id, seniorId, vaccineId, vaccineDate }: { id?: number; seniorId: number; vaccineId: number; vaccineDate: string | null; }) {
    if (id) {
      const record = await SeniorVaccine.findByPk(id);
      if (!record) {
        throw new Error("Record not found");
      }
      record.set({
        // vaccineId stays immutable on edit per UI, but allow update if provided
        vaccineId: vaccineId ?? record.get("vaccineId"),
        vaccineDate: vaccineDate ? new Date(vaccineDate) : null,
      });
      await record.save();
      return record;
    }
    const created = await SeniorVaccine.create({
      seniorId,
      vaccineId: vaccineId,
      vaccineDate: vaccineDate ? new Date(vaccineDate) : null,
    } as any);
    return created;
  }

  async delete({ id }: { id: number; }) {
    await SeniorVaccine.destroy({ where: { id } });
    return { message: "Deleted" };
  }
}

export const seniorVaccineService = new SeniorVaccineService();


