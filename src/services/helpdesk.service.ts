import { HelpDeskRecord, HelpDeskRecordCategory, Senior, IdentifyingInformation, HelpDeskRecordCategoryRecord } from "@/models";

export class HelpdeskService {
  async list(filter?: { barangayId?: number }) {
    return HelpDeskRecord.findAll({
      include: [
        { model: HelpDeskRecordCategory, attributes: ["id", "name"] },
        {
          model: Senior,
          attributes: ["id"],
          where: filter?.barangayId ? { barangayId: filter.barangayId } : undefined,
          required: !!filter?.barangayId,
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

  async create(payload: { seniorId: number; helpDeskRecordCategoryIds: number[]; details: string }) {
    const record = await HelpDeskRecord.create({
      seniorId: Number(payload.seniorId),
      details: String(payload.details).slice(0, 100),
    });

    // Create category associations
    if (payload.helpDeskRecordCategoryIds && payload.helpDeskRecordCategoryIds.length > 0) {
      await HelpDeskRecordCategoryRecord.bulkCreate(
        payload.helpDeskRecordCategoryIds.map(categoryId => ({
          helpDeskRecordId: record.id,
          helpDeskRecordCategoryId: Number(categoryId),
        }))
      );
    }

    // Reload with associations
    return this.detail(record.id);
  }

  async update(id: string | number, payload: { helpDeskRecordCategoryIds?: number[]; details?: string }) {
    const record = await HelpDeskRecord.findByPk(id);
    if (!record) return null;

    if (payload.details !== undefined) {
      (record as any).details = String(payload.details).slice(0, 100);
      await record.save();
    }

    // Update category associations if provided
    if (payload.helpDeskRecordCategoryIds !== undefined) {
      // Remove existing associations
      await HelpDeskRecordCategoryRecord.destroy({
        where: { helpDeskRecordId: record.id },
      });

      // Add new associations
      if (payload.helpDeskRecordCategoryIds.length > 0) {
        await HelpDeskRecordCategoryRecord.bulkCreate(
          payload.helpDeskRecordCategoryIds.map(categoryId => ({
            helpDeskRecordId: record.id,
            helpDeskRecordCategoryId: Number(categoryId),
          }))
        );
      }
    }

    // Reload with associations
    return this.detail(record.id);
  }

  async remove(id: string | number) {
    return HelpDeskRecord.destroy({ where: { id } });
  }
}

export const helpdeskService = new HelpdeskService();


