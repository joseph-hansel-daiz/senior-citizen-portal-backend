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
      identifyingInformation,
      familyComposition,
      dependencyProfile,
      educationProfile,
      economicProfile,
      healthProfile,
    } = req.body;
    const createdBy = req.user?.id;

    // Create the senior first
    const senior = await seniorService.createSenior({
      barangayId: Number(barangayId),
      createdBy,
    });

    const seniorId = senior.id;

    // Create all profile associations - always create all profiles
    const profilePromises = [];

    // Always create IdentifyingInformation (required)
    profilePromises.push(
      identifyingInformationService.create({
        seniorId,
        ...identifyingInformation,
        createdBy,
      })
    );

    // Always create FamilyComposition
    profilePromises.push(
      familyCompositionService.create({
        seniorId,
        ...familyComposition,
        createdBy,
      })
    );

    // Always create DependencyProfile
    profilePromises.push(
      dependencyProfileService.create({
        seniorId,
        ...dependencyProfile,
        createdBy,
      })
    );

    // Always create EducationProfile
    profilePromises.push(
      educationProfileService.create({
        seniorId,
        ...educationProfile,
        createdBy,
      })
    );

    // Always create EconomicProfile
    profilePromises.push(
      economicProfileService.create({
        seniorId,
        ...economicProfile,
        createdBy,
      })
    );

    // Always create HealthProfile
    profilePromises.push(
      healthProfileService.create({
        seniorId,
        ...healthProfile,
        createdBy,
      })
    );


    // Wait for all profile creations to complete
    await Promise.all(profilePromises);

    // Return the complete senior with all associations
    const completeSenior = await seniorService.getSeniorById(
      seniorId.toString()
    );
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
      identifyingInformation,
      familyComposition,
      dependencyProfile,
      educationProfile,
      economicProfile,
      healthProfile,
    } = req.body;
    const updatedBy = req.user?.id;

    // Update the senior first
    const senior = await seniorService.updateSenior(id, {
      barangayId: barangayId ? Number(barangayId) : undefined,
      updatedBy,
    });

    const seniorId = senior.id;

    // Update all profile associations
    const profilePromises = [];

    if (identifyingInformation) {
      profilePromises.push(
        identifyingInformationService.update(seniorId, {
          ...identifyingInformation,
          updatedBy,
        })
      );
    }

    if (familyComposition) {
      profilePromises.push(
        familyCompositionService.update(seniorId, {
          ...familyComposition,
          updatedBy,
        })
      );
    }

    if (dependencyProfile) {
      profilePromises.push(
        dependencyProfileService.update(seniorId, {
          ...dependencyProfile,
          updatedBy,
        })
      );
    }

    if (educationProfile) {
      profilePromises.push(
        educationProfileService.update(seniorId, {
          ...educationProfile,
          updatedBy,
        })
      );
    }

    if (economicProfile) {
      profilePromises.push(
        economicProfileService.update(seniorId, {
          ...economicProfile,
          updatedBy,
        })
      );
    }

    if (healthProfile) {
      profilePromises.push(
        healthProfileService.update(seniorId, {
          ...healthProfile,
          updatedBy,
        })
      );
    }


    // Wait for all profile updates to complete
    await Promise.all(profilePromises);

    // Return the complete senior with all associations
    const completeSenior = await seniorService.getSeniorById(id);
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
