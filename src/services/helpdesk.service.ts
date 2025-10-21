import { HelpDeskRecord, HelpDeskRecordCategory, Senior, IdentifyingInformation } from "@/models";

export class HelpdeskService {
  async list() {
    return HelpDeskRecord.findAll({
      include: [
        { model: HelpDeskRecordCategory, attributes: ["id", "name"] },
        {
          model: Senior,
          attributes: ["id"],
          include: [
            {
              model: IdentifyingInformation,
              attributes: ["firstname", "lastname", "middlename"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  async detail(id: string | number) {
    const record = await HelpDeskRecord.findByPk(id, {
      include: [
        { model: HelpDeskRecordCategory, attributes: ["id", "name"] },
        {
          model: Senior,
          attributes: ["id"],
          include: [
            {
              model: IdentifyingInformation,
              attributes: ["firstname", "lastname", "middlename"],
            },
          ],
        },
      ],
    });
    return record;
  }

  async create(payload: { seniorId: number; helpDeskRecordCategory: number; details: string }) {
    return HelpDeskRecord.create({
      seniorId: Number(payload.seniorId),
      helpDeskRecordCategory: Number(payload.helpDeskRecordCategory),
      details: String(payload.details).slice(0, 100),
    });
  }

  async update(id: string | number, payload: { helpDeskRecordCategory?: number; details?: string }) {
    const record = await HelpDeskRecord.findByPk(id);
    if (!record) return null;

    if (payload.helpDeskRecordCategory !== undefined) {
      (record as any).helpDeskRecordCategory = Number(payload.helpDeskRecordCategory);
    }
    if (payload.details !== undefined) {
      (record as any).details = String(payload.details).slice(0, 100);
    }
    await record.save();
    return record;
  }

  async remove(id: string | number) {
    return HelpDeskRecord.destroy({ where: { id } });
  }
}

export const helpdeskService = new HelpdeskService();


