import { Request, Response } from "express";
import {
  seniorService,
  identifyingInformationService,
  familyCompositionService,
  dependencyProfileService,
  educationProfileService,
  economicProfileService,
  healthProfileService,
} from "@/services";
import { TransactionHelper } from "@/utils/transaction";

export const list = async (_req: Request, res: Response) => {
  try {
    const seniors = await seniorService.listSeniors();
    res.json(seniors);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const detail = async (req: Request, res: Response) => {
  try {
    const senior = await seniorService.getSeniorById(req.params.id);
    res.json(senior);
  } catch (err: any) {
    if (err.message === "Senior not found") {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
};

export const create = async (req: any, res: Response) => {
  try {
    const {
      barangayId,
      photo,
      identifyingInformation,
      familyComposition,
      dependencyProfile,
      educationProfile,
      economicProfile,
      healthProfile,
    } = req.body;
    const createdBy = req.user?.id;

    // Handle photo upload - convert File to Buffer if needed
    let photoBuffer: Buffer | undefined;
    if ((req as any).file?.buffer) {
      // Photo uploaded via multipart/form-data
      photoBuffer = (req as any).file.buffer as Buffer;
    } else if (photo) {
      // Photo sent as base64 or other format
      if (typeof photo === 'string' && photo.startsWith('data:')) {
        // Base64 data URL
        photoBuffer = Buffer.from(
          photo.replace(/^data:[\w/]+;base64,/, ""),
          "base64"
        );
      } else if (photo instanceof Buffer) {
        // Already a Buffer
        photoBuffer = photo;
      }
    }

    // Execute all operations within a single transaction
    const completeSenior = await TransactionHelper.executeInTransaction(async (transaction) => {
      // Create the senior first
      const senior = await seniorService.createSenior({
        barangayId: Number(barangayId),
        photo: photoBuffer ? (photoBuffer as unknown as Blob) : undefined,
        createdBy,
      }, transaction);

      const seniorId = senior.id;

      // Create all profile associations - always create all profiles
      const profilePromises = [];

      // Always create IdentifyingInformation (required)
      profilePromises.push(
        identifyingInformationService.create({
          seniorId,
          ...identifyingInformation,
          createdBy,
        }, transaction)
      );

      // Always create FamilyComposition
      profilePromises.push(
        familyCompositionService.create({
          seniorId,
          ...familyComposition,
          createdBy,
        }, transaction)
      );

      // Always create DependencyProfile
      profilePromises.push(
        dependencyProfileService.create({
          seniorId,
          ...dependencyProfile,
          createdBy,
        }, transaction)
      );

      // Always create EducationProfile
      profilePromises.push(
        educationProfileService.create({
          seniorId,
          ...educationProfile,
          createdBy,
        }, transaction)
      );

      // Always create EconomicProfile
      profilePromises.push(
        economicProfileService.create({
          seniorId,
          ...economicProfile,
          createdBy,
        }, transaction)
      );

      // Always create HealthProfile
      profilePromises.push(
        healthProfileService.create({
          seniorId,
          ...healthProfile,
          createdBy,
        }, transaction)
      );

      // Wait for all profile creations to complete
      await Promise.all(profilePromises);

      // Return the complete senior with all associations
      return await seniorService.getSeniorById(seniorId.toString(), transaction);
    });

    res.status(201).json(completeSenior);
  } catch (err: any) {
    if (err.message.includes("required")) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
};

export const update = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const {
      barangayId,
      photo,
      identifyingInformation,
      familyComposition,
      dependencyProfile,
      educationProfile,
      economicProfile,
      healthProfile,
    } = req.body;
    const updatedBy = req.user?.id;

    // Handle photo upload - convert File to Buffer if needed
    let photoBuffer: Buffer | undefined;
    if ((req as any).file?.buffer) {
      // Photo uploaded via multipart/form-data
      photoBuffer = (req as any).file.buffer as Buffer;
    } else if (photo) {
      // Photo sent as base64 or other format
      if (typeof photo === 'string' && photo.startsWith('data:')) {
        // Base64 data URL
        photoBuffer = Buffer.from(
          photo.replace(/^data:[\w/]+;base64,/, ""),
          "base64"
        );
      } else if (photo instanceof Buffer) {
        // Already a Buffer
        photoBuffer = photo;
      }
    }

    // Execute all operations within a single transaction
    const completeSenior = await TransactionHelper.executeInTransaction(async (transaction) => {
      // Update the senior first
      const senior = await seniorService.updateSenior(id, {
        barangayId: barangayId ? Number(barangayId) : undefined,
        photo: photoBuffer ? (photoBuffer as unknown as Blob) : undefined,
        updatedBy,
      }, transaction);

      const seniorId = senior.id;

      // Update all profile associations
      const profilePromises = [];

      if (identifyingInformation) {
        profilePromises.push(
          identifyingInformationService.update(seniorId, {
            ...identifyingInformation,
            updatedBy,
          }, transaction)
        );
      }

      if (familyComposition) {
        profilePromises.push(
          familyCompositionService.update(seniorId, {
            ...familyComposition,
            updatedBy,
          }, transaction)
        );
      }

      if (dependencyProfile) {
        profilePromises.push(
          dependencyProfileService.update(seniorId, {
            ...dependencyProfile,
            updatedBy,
          }, transaction)
        );
      }

      if (educationProfile) {
        profilePromises.push(
          educationProfileService.update(seniorId, {
            ...educationProfile,
            updatedBy,
          }, transaction)
        );
      }

      if (economicProfile) {
        profilePromises.push(
          economicProfileService.update(seniorId, {
            ...economicProfile,
            updatedBy,
          }, transaction)
        );
      }

      if (healthProfile) {
        profilePromises.push(
          healthProfileService.update(seniorId, {
            ...healthProfile,
            updatedBy,
          }, transaction)
        );
      }

      // Wait for all profile updates to complete
      await Promise.all(profilePromises);

      // Return the complete senior with all associations
      return await seniorService.getSeniorById(id, transaction);
    });

    res.json(completeSenior);
  } catch (err: any) {
    if (err.message === "Senior not found") {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
};

export const remove = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const deletedBy = req.user?.id;

    const result = await seniorService.deleteSenior(id, deletedBy);
    res.json(result);
  } catch (err: any) {
    if (err.message === "Senior not found") {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
};
