import { AuditLog, User, Senior } from "@/models";
import type { Transaction, WhereOptions } from "sequelize";
import { Op } from "sequelize";

type AuditLogParams = {
  actorId?: number | null;
  action: string;
  entityType: string;
  entityId?: number | null;
  seniorId?: number | null;
  metadata?: Record<string, any> | null;
  transaction?: Transaction;
};

type AuditLogListParams = {
  actorId?: number;
  seniorId?: number;
  entityType?: string;
  action?: string;
  from?: Date;
  to?: Date;
  limit?: number;
  offset?: number;
};

export class AuditLogService {
  async log(params: AuditLogParams): Promise<void> {
    const {
      actorId = null,
      action,
      entityType,
      entityId = null,
      seniorId = null,
      metadata = null,
      transaction,
    } = params;

    try {
      await AuditLog.create(
        {
          actorId,
          action,
          entityType,
          entityId,
          seniorId,
          metadata,
        },
        transaction ? { transaction } : undefined
      );
    } catch (err) {
      // Do not block main request flow if audit logging fails
      // eslint-disable-next-line no-console
      console.error("Failed to write audit log:", err);
    }
  }

  async list(params: AuditLogListParams = {}) {
    const {
      actorId,
      seniorId,
      entityType,
      action,
      from,
      to,
      limit = 50,
      offset = 0,
    } = params;

    const where: WhereOptions = {};

    if (actorId != null) {
      (where as any).actorId = actorId;
    }
    if (seniorId != null) {
      (where as any).seniorId = seniorId;
    }
    if (entityType) {
      (where as any).entityType = entityType;
    }
    if (action) {
      (where as any).action = action;
    }
    if (from || to) {
      (where as any).createdAt = {};
      if (from) {
        (where as any).createdAt[Op.gte] = from;
      }
      if (to) {
        (where as any).createdAt[Op.lte] = to;
      }
    }

    const safeLimit = Math.min(Math.max(limit, 1), 200);
    const safeOffset = Math.max(offset, 0);

    const { rows, count } = await AuditLog.findAndCountAll({
      where,
      order: [["createdAt", "DESC"]],
      limit: safeLimit,
      offset: safeOffset,
      include: [
        {
          model: User,
          attributes: ["id", "username", "name", "role"],
        },
        {
          model: Senior,
          attributes: ["id", "barangayId"],
        },
      ],
    });

    const items = rows.map((row) => {
      const plain = row.get({ plain: true }) as any;
      return {
        id: plain.id,
        actorId: plain.actorId,
        action: plain.action,
        entityType: plain.entityType,
        entityId: plain.entityId,
        seniorId: plain.seniorId,
        metadata: plain.metadata,
        createdAt: plain.createdAt,
        updatedAt: plain.updatedAt,
        actor: plain.User
          ? {
              id: plain.User.id,
              username: plain.User.username,
              name: plain.User.name,
              role: plain.User.role,
            }
          : null,
        senior: plain.Senior
          ? {
              id: plain.Senior.id,
              barangayId: plain.Senior.barangayId,
            }
          : null,
      };
    });

    return {
      total: count,
      limit: safeLimit,
      offset: safeOffset,
      items,
    };
  }
}

export const auditLogService = new AuditLogService();

