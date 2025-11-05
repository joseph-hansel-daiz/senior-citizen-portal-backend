import { Assistance, SeniorAssistance } from "@/models";

export class SeniorAssistanceService {
  async listBySenior(seniorId: number) {
    return SeniorAssistance.findAll({
      where: { seniorId },
      include: [{ model: Assistance, attributes: ["id", "name"] } as any],
      order: [["assistanceId", "ASC"], ["assistanceDate", "DESC"]],
    });
  }

  async upsert({ id, seniorId, assistanceId, assistanceDate }: { id?: number; seniorId: number; assistanceId: number; assistanceDate: string | null; }) {
    if (id) {
      const record = await SeniorAssistance.findByPk(id);
      if (!record) {
        throw new Error("Record not found");
      }
      record.set({
        assistanceId: assistanceId ?? (record.get("assistanceId") as number),
        assistanceDate: assistanceDate ? new Date(assistanceDate) : null,
      });
      await record.save();
      return record;
    }
    const created = await SeniorAssistance.create({
      seniorId,
      assistanceId,
      assistanceDate: assistanceDate ? new Date(assistanceDate) : null,
    } as any);
    return created;
  }

  async delete({ id }: { id: number }) {
    await SeniorAssistance.destroy({ where: { id } });
    return { message: "Deleted" };
  }
}

export const seniorAssistanceService = new SeniorAssistanceService();


