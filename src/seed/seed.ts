import "dotenv/config";
import {
  sequelize,
  User,
  Barangay,
  Senior,
  IdentifyingInformation,
  FamilyComposition,
  Children,
  Dependent,
  DependencyProfile,
  EducationProfile,
  EconomicProfile,
  HealthProfile,
  HelpDeskRecord,
  HelpDeskRecordCategory,
  SeniorStatusHistory,
  DeathInfo,
  AreaOfDifficulty,
  AuralConcern,
  Cohabitant,
  CommunityInvolvement,
  DentalConcern,
  HealthProblemAilment,
  HighestEducationalAttainment,
  IncomeAssistanceSource,
  LivingCondition,
  MonthlyIncome,
  PersonalMovableProperty,
  ProblemsNeedsCommonlyEncountered,
  RealImmovableProperty,
  SocialEmotionalConcern,
  SpecializationTechnicalSkill,
  VisualConcern,
  SeniorAreaOfDifficulty,
  SeniorAuralConcern,
  SeniorCohabitant,
  SeniorCommunityInvolvement,
  SeniorDentalConcern,
  SeniorHealthProblemAilment,
  SeniorHighestEducationalAttainment,
  SeniorIncomeAssistanceSource,
  SeniorLivingCondition,
  SeniorMonthlyIncome,
  SeniorPersonalMovableProperty,
  SeniorProblemsNeedsCommonlyEncountered,
  SeniorRealImmovableProperty,
  SeniorSocialEmotionalConcern,
  SeniorSpecializationTechnicalSkill,
  SeniorVisualConcern,
  Vaccine,
  SeniorVaccine,
} from "@/models";

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    console.log("Seeding Barangays...");
    await Barangay.create({ name: "Astorga" });
    await Barangay.create({ name: "Balire" });
    await Barangay.create({ name: "Banawang" });
    await Barangay.create({ name: "San Antonio" });
    await Barangay.create({ name: "San Pedro" });
    await Barangay.create({ name: "San Roque" });
    await Barangay.create({ name: "San Vicente" });
    await Barangay.create({ name: "Santo Niño" });

    console.log("Seeding users...");
    await User.create({
      username: "admin",
      password: "password123",
      name: "Administrator",
      role: "admin",
    });
    await User.create({
      username: "osca",
      password: "password123",
      name: "OSCA",
      role: "osca",
    });
    await User.create({
      username: "view_only",
      password: "password123",
      name: "View Only",
      role: "viewOnly",
    });

    await User.create({
      username: "astorga",
      password: "password123",
      name: "Astorga",
      role: "barangay",
      barangayId: 1,
    });
    await User.create({
      username: "balire",
      password: "password123",
      name: "Balire",
      role: "barangay",
      barangayId: 2,
    });
    await User.create({
      username: "banawang",
      password: "password123",
      name: "Banawang",
      role: "barangay",
      barangayId: 3,
    });
    await User.create({
      username: "san_antonio",
      password: "password123",
      name: "San Antonio",
      role: "barangay",
      barangayId: 4,
    });
    await User.create({
      username: "san_pedro",
      password: "password123",
      name: "San Pedro",
      role: "barangay",
      barangayId: 5,
    });
    await User.create({
      username: "san_roque",
      password: "password123",
      name: "San Roque",
      role: "barangay",
      barangayId: 6,
    });
    await User.create({
      username: "san_vicente",
      password: "password123",
      name: "San Vicente",
      role: "barangay",
      barangayId: 7,
    });
    await User.create({
      username: "santo_niño",
      password: "password123",
      name: "Santo Niño",
      role: "barangay",
      barangayId: 8,
    });

    console.log("Seeding options...");
    // Cohabitants
    await Cohabitant.create({ name: "Grand Children" });
    await Cohabitant.create({ name: "Common Law Spouse" });
    await Cohabitant.create({ name: "Spouse" });
    await Cohabitant.create({ name: "In-laws" });
    await Cohabitant.create({ name: "Care Institution" });
    await Cohabitant.create({ name: "Children" });
    await Cohabitant.create({ name: "Relative" });
    await Cohabitant.create({ name: "Friends" });

    // Living Conditions
    await LivingCondition.create({ name: "No privacy" });
    await LivingCondition.create({ name: "Overcrowded in home" });
    await LivingCondition.create({ name: "Informal Settler" });
    await LivingCondition.create({ name: "No permanent house" });
    await LivingCondition.create({ name: "High cost of rent" });
    await LivingCondition.create({
      name: "Longing for independent living quiet atmosphere",
    });

    // Education
    await HighestEducationalAttainment.create({ name: "Not Attended School" });
    await HighestEducationalAttainment.create({ name: "Elementary Level" });
    await HighestEducationalAttainment.create({ name: "Elementary Graduate" });
    await HighestEducationalAttainment.create({ name: "Highschool Level" });
    await HighestEducationalAttainment.create({ name: "Highschool Graduate" });
    await HighestEducationalAttainment.create({ name: "Vocational" });
    await HighestEducationalAttainment.create({ name: "College Level" });
    await HighestEducationalAttainment.create({ name: "College Graduate" });
    await HighestEducationalAttainment.create({ name: "Post Graduate" });

    // Technical Skills
    await SpecializationTechnicalSkill.create({ name: "Medical" });
    await SpecializationTechnicalSkill.create({ name: "Dental" });
    await SpecializationTechnicalSkill.create({ name: "Fishing" });
    await SpecializationTechnicalSkill.create({ name: "Engineering" });
    await SpecializationTechnicalSkill.create({ name: "Barber" });
    await SpecializationTechnicalSkill.create({ name: "Evangelization" });
    await SpecializationTechnicalSkill.create({ name: "Millwright" });
    await SpecializationTechnicalSkill.create({ name: "Teaching" });
    await SpecializationTechnicalSkill.create({ name: "Counselling" });
    await SpecializationTechnicalSkill.create({ name: "Cooking" });
    await SpecializationTechnicalSkill.create({ name: "Carpenter" });
    await SpecializationTechnicalSkill.create({ name: "Mason" });
    await SpecializationTechnicalSkill.create({ name: "Tailor" });
    await SpecializationTechnicalSkill.create({ name: "Legal Services" });
    await SpecializationTechnicalSkill.create({ name: "Farming" });
    await SpecializationTechnicalSkill.create({ name: "Arts" });
    await SpecializationTechnicalSkill.create({ name: "Plumber" });
    await SpecializationTechnicalSkill.create({ name: "Shoemaker" });
    await SpecializationTechnicalSkill.create({ name: "Chef/Cook" });
    await SpecializationTechnicalSkill.create({
      name: "Information Technology",
    });

    // Community Activities
    await CommunityInvolvement.create({ name: "Medical" });
    await CommunityInvolvement.create({ name: "Resource Volunteer" });
    await CommunityInvolvement.create({ name: "Community Beautification" });
    await CommunityInvolvement.create({
      name: "Community/Organization Leader",
    });
    await CommunityInvolvement.create({ name: "Friendly Visits" });
    await CommunityInvolvement.create({
      name: "Neighborhood Support Services",
    });
    await CommunityInvolvement.create({ name: "Legal Services" });
    await CommunityInvolvement.create({ name: "Religious" });
    await CommunityInvolvement.create({ name: "Counselling/Referral" });
    await CommunityInvolvement.create({ name: "Sponsorship" });

    // Sources of Income
    await IncomeAssistanceSource.create({
      name: "Own earnings, salary/ wages",
    });
    await IncomeAssistanceSource.create({ name: "Own Pension" });
    await IncomeAssistanceSource.create({ name: "Stocks/ Dividends" });
    await IncomeAssistanceSource.create({
      name: "Dependent on children/ relatives",
    });
    await IncomeAssistanceSource.create({ name: "Spouse's salary" });
    await IncomeAssistanceSource.create({ name: "Spouse Pension" });
    await IncomeAssistanceSource.create({ name: "Insurance" });
    await IncomeAssistanceSource.create({ name: "Rental/ Sharecorp" });
    await IncomeAssistanceSource.create({ name: "Savings" });
    await IncomeAssistanceSource.create({ name: "Livestock/ orchard/ farm" });
    await IncomeAssistanceSource.create({ name: "Fishing" });

    // Monthly Income
    await MonthlyIncome.create({ name: "60000 and above" });
    await MonthlyIncome.create({ name: "50000 to 60000" });
    await MonthlyIncome.create({ name: "40000 to 50000" });
    await MonthlyIncome.create({ name: "20000 to 30000" });
    await MonthlyIncome.create({ name: "10000 to 20000" });
    await MonthlyIncome.create({ name: "5000 to 10000" });
    await MonthlyIncome.create({ name: "below 5000" });
    await MonthlyIncome.create({ name: "None" });

    // Real Immovable Property
    await RealImmovableProperty.create({ name: "House" });
    await RealImmovableProperty.create({ name: "Lot/ Farmland" });
    await RealImmovableProperty.create({ name: "House & Lot" });
    await RealImmovableProperty.create({ name: "Commercial Building" });
    await RealImmovableProperty.create({ name: "Fishpond/ resort" });

    // Personal Movable Property
    await PersonalMovableProperty.create({ name: "Automobile" });
    await PersonalMovableProperty.create({ name: "Personal Computer" });
    await PersonalMovableProperty.create({ name: "Boats" });
    await PersonalMovableProperty.create({ name: "Heavy Equipment" });
    await PersonalMovableProperty.create({ name: "Laptops" });
    await PersonalMovableProperty.create({ name: "Motorcycle" });
    await PersonalMovableProperty.create({ name: "Mobile Phones" });

    // Problems
    await ProblemsNeedsCommonlyEncountered.create({
      name: "Lack of incomes/ resource",
    });
    await ProblemsNeedsCommonlyEncountered.create({
      name: "Lose of income/ resource",
    });
    await ProblemsNeedsCommonlyEncountered.create({
      name: "Skills/ capability training",
    });

    // Health Problems
    await HealthProblemAilment.create({ name: "Hypertension" });
    await HealthProblemAilment.create({ name: "Arthritis/ Gout" });
    await HealthProblemAilment.create({ name: "Coronary Heart Disease" });
    await HealthProblemAilment.create({ name: "Diabetes" });
    await HealthProblemAilment.create({ name: "Chronic Kidney Disease" });
    await HealthProblemAilment.create({ name: "Alzheimer's/ Dementia" });
    await HealthProblemAilment.create({
      name: "Chronic Obstructive Pulmonary Disease",
    });

    // Dental Concerns
    await DentalConcern.create({ name: "Needs Dental Care" });

    // Visual Concerns
    await VisualConcern.create({ name: "Eye impairment" });
    await VisualConcern.create({ name: "Needs eye care" });

    // Aural Concerns
    await AuralConcern.create({ name: "Aural impairment" });

    // Emotional / Social Concerns
    await SocialEmotionalConcern.create({ name: "Feeling neglect/ rejection" });
    await SocialEmotionalConcern.create({
      name: "Feeling helplessness/ worthlessness",
    });
    await SocialEmotionalConcern.create({
      name: "Feeling loneliness/ isolate",
    });
    await SocialEmotionalConcern.create({
      name: "Lack leisure/ recreational activities",
    });
    await SocialEmotionalConcern.create({
      name: "Lack SC friendly environment",
    });

    // Vaccines
    console.log("Seeding vaccines...");
    const flu = await Vaccine.create({ name: "Influenza (Flu)" });
    const pneumo = await Vaccine.create({ name: "Pneumococcal" });
    const covid = await Vaccine.create({ name: "COVID-19" });
    const shingles = await Vaccine.create({ name: "Shingles" });

    // Area of Difficulty
    await AreaOfDifficulty.create({ name: "High Cost of medicine" });
    await AreaOfDifficulty.create({ name: "Lack of medicines" });
    await AreaOfDifficulty.create({ name: "Lack of medical attention" });

    // Help Desk Record Categories
    console.log("Seeding Help Desk Record Categories...");
    await HelpDeskRecordCategory.create({ name: "Medical Assistance" });
    await HelpDeskRecordCategory.create({ name: "Financial Aid" });
    await HelpDeskRecordCategory.create({ name: "Social Services" });
    await HelpDeskRecordCategory.create({ name: "Legal Assistance" });
    await HelpDeskRecordCategory.create({ name: "Transportation" });
    await HelpDeskRecordCategory.create({ name: "Home Care" });
    await HelpDeskRecordCategory.create({ name: "Food Assistance" });
    await HelpDeskRecordCategory.create({ name: "Other" });

    console.log("Seeding comprehensive senior data...");
    
    // Create a comprehensive senior with all possible data
    const senior = await Senior.create({
      barangayId: 1, // Astorga
      createdBy: 1, // Admin user
    });

    // Identifying Information
    await IdentifyingInformation.create({
      seniorId: senior.id,
      lastname: "Santos",
      firstname: "Maria",
      middlename: "Cruz",
      extension: "Sr.",
      region: "Region IV-A (CALABARZON)",
      province: "Laguna",
      city: "San Pedro",
      barangay: "Astorga",
      residence: "123 Main Street",
      street: "Purok 1",
      birthDate: new Date("1950-03-15"),
      birthPlace: "San Pedro, Laguna",
      maritalStatus: "Widowed",
      religion: "Roman Catholic",
      sexAtBirth: "Female",
      contactNumber: "09123456789",
      emailAddress: "maria.santos@email.com",
      fbMessengerName: "Maria Santos",
      ethnicOrigin: "Filipino",
      languageSpoken: "Tagalog, English",
      oscaIdNo: "OSCA-2024-001",
      gsisSssNo: "03-1234567-8",
      tin: "123-456-789-000",
      philhealthNo: "12-345678901-2",
      scAssociationIdNo: "SC-001",
      otherGovIdNo: "Senior-001",
      employmentBusiness: "Retired Teacher",
      hasPension: true,
      pensionList: "GSIS Pension, SSS Pension",
      capabilityToTravel: true,
      createdBy: 1,
    });

    // Family Composition
    await FamilyComposition.create({
      seniorId: senior.id,
      spouseLastname: "Santos",
      spouseFirstname: "Juan",
      spouseMiddlename: "Cruz",
      spouseExtension: "Sr.",
      fatherLastname: "Cruz",
      fatherFirstname: "Pedro",
      fatherMiddlename: "Reyes",
      motherLastname: "Reyes",
      motherFirstname: "Ana",
      motherMiddlename: "Garcia",
      createdBy: 1,
    });

    // Children
    await Children.create({
      seniorId: senior.id,
      name: "Maria Santos Jr.",
      occupation: "Nurse",
      income: 25000.00,
      age: 45,
      isWorking: "Yes",
    });

    await Children.create({
      seniorId: senior.id,
      name: "Juan Santos Jr.",
      occupation: "Engineer",
      income: 35000.00,
      age: 42,
      isWorking: "Yes",
    });

    await Children.create({
      seniorId: senior.id,
      name: "Ana Santos",
      occupation: "Teacher",
      income: 20000.00,
      age: 38,
      isWorking: "Yes",
    });

    // Dependents
    await Dependent.create({
      seniorId: senior.id,
      name: "Pedro Santos",
      occupation: "Student",
      income: 0.00,
      age: 16,
      isWorking: false,
    });

    await Dependent.create({
      seniorId: senior.id,
      name: "Maria Santos",
      occupation: "Housewife",
      income: 0.00,
      age: 65,
      isWorking: false,
    });

    // Dependency Profile
    const dependencyProfile = await DependencyProfile.create({
      seniorId: senior.id,
      createdBy: 1,
    });

    // Associate with cohabitants
    await SeniorCohabitant.create({
      seniorId: senior.id,
      cohabitantId: 3, // Spouse
    });

    await SeniorCohabitant.create({
      seniorId: senior.id,
      cohabitantId: 6, // Children
    });

    await SeniorCohabitant.create({
      seniorId: senior.id,
      cohabitantId: 7, // Relative
    });

    // Associate with living conditions
    await SeniorLivingCondition.create({
      seniorId: senior.id,
      livingConditionId: 1, // No privacy
    });

    // Education Profile
    const educationProfile = await EducationProfile.create({
      seniorId: senior.id,
      sharedSkills: "Teaching, Cooking, Sewing",
      createdBy: 1,
    });

    // Associate with educational attainment
    await SeniorHighestEducationalAttainment.create({
      seniorId: senior.id,
      highestEducationalAttainmentId: 8, // College Graduate
    });

    // Associate with technical skills
    await SeniorSpecializationTechnicalSkill.create({
      seniorId: senior.id,
      specializationTechnicalSkillId: 9, // Teaching
    });

    await SeniorSpecializationTechnicalSkill.create({
      seniorId: senior.id,
      specializationTechnicalSkillId: 10, // Cooking
    });

    await SeniorSpecializationTechnicalSkill.create({
      seniorId: senior.id,
      specializationTechnicalSkillId: 13, // Tailor
    });

    // Associate with community involvement
    await SeniorCommunityInvolvement.create({
      seniorId: senior.id,
      communityInvolvementId: 1, // Medical
    });

    await SeniorCommunityInvolvement.create({
      seniorId: senior.id,
      communityInvolvementId: 8, // Religious
    });

    await SeniorCommunityInvolvement.create({
      seniorId: senior.id,
      communityInvolvementId: 9, // Counselling/Referral
    });

    // Economic Profile
    const economicProfile = await EconomicProfile.create({
      seniorId: senior.id,
      createdBy: 1,
    });

    // Associate with income sources
    await SeniorIncomeAssistanceSource.create({
      seniorId: senior.id,
      incomeAssistanceSourceId: 2, // Own Pension
    });

    await SeniorIncomeAssistanceSource.create({
      seniorId: senior.id,
      incomeAssistanceSourceId: 4, // Dependent on children/relatives
    });

    // Associate with properties
    await SeniorRealImmovableProperty.create({
      seniorId: senior.id,
      realImmovablePropertyId: 3, // House & Lot
    });

    await SeniorPersonalMovableProperty.create({
      seniorId: senior.id,
      personalMovablePropertieId: 1, // Automobile
    });

    await SeniorPersonalMovableProperty.create({
      seniorId: senior.id,
      personalMovablePropertieId: 7, // Mobile Phones
    });

    // Associate with monthly income
    await SeniorMonthlyIncome.create({
      seniorId: senior.id,
      monthlyIncomeId: 3, // 20000 to 30000
    });

    // Associate with problems
    await SeniorProblemsNeedsCommonlyEncountered.create({
      seniorId: senior.id,
      problemsNeedsCommonlyEncounteredId: 1, // Lack of incomes/resource
    });

    // Health Profile
    const healthProfile = await HealthProfile.create({
      seniorId: senior.id,
      bloodType: "A+",
      physicalDisability: "Mild arthritis in hands",
      listMedicines: "Hypertension medication, pain relievers",
      checkUp: true,
      scheduleCheckUp: "Every 3 Months",
      createdBy: 1,
    });

    // Associate with health problems
    await SeniorHealthProblemAilment.create({
      seniorId: senior.id,
      healthProblemAilmentId: 1, // Hypertension
    });

    await SeniorHealthProblemAilment.create({
      seniorId: senior.id,
      healthProblemAilmentId: 2, // Arthritis/Gout
    });

    // Associate with dental concerns
    await SeniorDentalConcern.create({
      seniorId: senior.id,
      dentalConcernId: 1, // Needs Dental Care
    });

    // Associate with visual concerns
    await SeniorVisualConcern.create({
      seniorId: senior.id,
      visualConcernId: 2, // Needs eye care
    });

    // Associate with aural concerns
    await SeniorAuralConcern.create({
      seniorId: senior.id,
      auralConcernId: 1, // Aural impairment
    });

    // Associate with social/emotional concerns
    await SeniorSocialEmotionalConcern.create({
      seniorId: senior.id,
      socialEmotionalConcernId: 1, // Feeling neglect/rejection
    });

    await SeniorSocialEmotionalConcern.create({
      seniorId: senior.id,
      socialEmotionalConcernId: 3, // Feeling loneliness/isolate
    });

    // Associate with areas of difficulty
    await SeniorAreaOfDifficulty.create({
      seniorId: senior.id,
      areaOfDifficultyId: 1, // High Cost of medicine
    });

    await SeniorAreaOfDifficulty.create({
      seniorId: senior.id,
      areaOfDifficultyId: 2, // Lack of medicines
    });

    // Senior Vaccines
    console.log("Seeding senior vaccines...");
    await SeniorVaccine.create({ seniorId: senior.id, VaccineId: flu.id, lastVaccineDate: new Date("2024-10-01") as any });
    await SeniorVaccine.create({ seniorId: senior.id, VaccineId: pneumo.id, lastVaccineDate: new Date("2023-06-15") as any });
    await SeniorVaccine.create({ seniorId: senior.id, VaccineId: covid.id, lastVaccineDate: new Date("2025-01-20") as any });

    // Help Desk Records
    await HelpDeskRecord.create({
      seniorId: senior.id,
      helpDeskRecordCategory: 1, // Medical Assistance
      details: "Request for medical check-up assistance",
      createdBy: 1,
    });

    await HelpDeskRecord.create({
      seniorId: senior.id,
      helpDeskRecordCategory: 2, // Financial Aid
      details: "Application for senior citizen discount card",
      createdBy: 1,
    });

    await HelpDeskRecord.create({
      seniorId: senior.id,
      helpDeskRecordCategory: 7, // Food Assistance
      details: "Request for food assistance program",
      createdBy: 1,
    });

    // Senior Status History
    await SeniorStatusHistory.create({
      seniorId: senior.id,
      status: "Pending",
      note: "Initial registration",
      createdBy: 1,
    });

    await SeniorStatusHistory.create({
      seniorId: senior.id,
      status: "Active",
      note: "Documents verified and approved",
      createdBy: 1,
    });

    // Create a Pending senior
    console.log("Seeding pending senior...");
    const pendingSenior = await Senior.create({
      barangayId: 2, // Balire
      createdBy: 1,
    });

    await IdentifyingInformation.create({
      seniorId: pendingSenior.id,
      lastname: "Reyes",
      firstname: "Juan",
      middlename: "Garcia",
      region: "Region IV-A (CALABARZON)",
      province: "Laguna",
      city: "San Pedro",
      barangay: "Balire",
      residence: "456 Side Street",
      street: "Purok 2",
      birthDate: new Date("1955-07-20"),
      birthPlace: "Balire, San Pedro, Laguna",
      maritalStatus: "Married",
      religion: "Roman Catholic",
      sexAtBirth: "Male",
      contactNumber: "09187654321",
      oscaIdNo: "OSCA-2024-002",
      createdBy: 1,
    });

    await SeniorStatusHistory.create({
      seniorId: pendingSenior.id,
      status: "Pending",
      note: "Awaiting document verification",
      createdBy: 1,
    });

    // Create a Declined senior
    console.log("Seeding declined senior...");
    const declinedSenior = await Senior.create({
      barangayId: 3, // Banawang
      createdBy: 1,
    });

    await IdentifyingInformation.create({
      seniorId: declinedSenior.id,
      lastname: "Dela Cruz",
      firstname: "Pedro",
      middlename: "Mendoza",
      region: "Region IV-A (CALABARZON)",
      province: "Laguna",
      city: "San Pedro",
      barangay: "Banawang",
      residence: "789 Back Road",
      street: "Purok 3",
      birthDate: new Date("1960-12-10"),
      birthPlace: "Banawang, San Pedro, Laguna",
      maritalStatus: "Single",
      religion: "Roman Catholic",
      sexAtBirth: "Male",
      contactNumber: "09191234567",
      oscaIdNo: "OSCA-2024-003",
      createdBy: 1,
    });

    await SeniorStatusHistory.create({
      seniorId: declinedSenior.id,
      status: "Pending",
      note: "Initial application submitted",
      createdBy: 1,
    });

    await SeniorStatusHistory.create({
      seniorId: declinedSenior.id,
      status: "Declined",
      note: "Incomplete documentation - missing valid ID",
      createdBy: 1,
    });

    // Create another Active senior
    console.log("Seeding another active senior...");
    const activeSenior = await Senior.create({
      barangayId: 4, // San Antonio
      createdBy: 1,
    });

    await IdentifyingInformation.create({
      seniorId: activeSenior.id,
      lastname: "Lopez",
      firstname: "Rosa",
      middlename: "Santos",
      region: "Region IV-A (CALABARZON)",
      province: "Laguna",
      city: "San Pedro",
      barangay: "San Antonio",
      residence: "321 Front Avenue",
      street: "Purok 4",
      birthDate: new Date("1952-05-25"),
      birthPlace: "San Antonio, San Pedro, Laguna",
      maritalStatus: "Widowed",
      religion: "Iglesia ni Cristo",
      sexAtBirth: "Female",
      contactNumber: "09201234567",
      oscaIdNo: "OSCA-2024-004",
      createdBy: 1,
    });

    await SeniorStatusHistory.create({
      seniorId: activeSenior.id,
      status: "Pending",
      note: "Application received",
      createdBy: 1,
    });

    await SeniorStatusHistory.create({
      seniorId: activeSenior.id,
      status: "Active",
      note: "All requirements met and verified",
      createdBy: 1,
    });

    // Create a Deceased senior
    console.log("Seeding deceased senior...");
    const deceasedSenior = await Senior.create({
      barangayId: 5, // San Pedro
      createdBy: 1,
    });

    await IdentifyingInformation.create({
      seniorId: deceasedSenior.id,
      lastname: "Aquino",
      firstname: "Carlos",
      middlename: "Villanueva",
      region: "Region IV-A (CALABARZON)",
      province: "Laguna",
      city: "San Pedro",
      barangay: "San Pedro",
      residence: "555 Memorial Drive",
      street: "Purok 5",
      birthDate: new Date("1948-11-30"),
      birthPlace: "San Pedro, Laguna",
      maritalStatus: "Married",
      religion: "Roman Catholic",
      sexAtBirth: "Male",
      contactNumber: "09171234567",
      oscaIdNo: "OSCA-2024-005",
      createdBy: 1,
    });

    await SeniorStatusHistory.create({
      seniorId: deceasedSenior.id,
      status: "Pending",
      note: "Application submitted",
      createdBy: 1,
    });

    await SeniorStatusHistory.create({
      seniorId: deceasedSenior.id,
      status: "Active",
      note: "Approved and registered",
      createdBy: 1,
    });

    // Create death information
    const deathCertificateBuffer = Buffer.from(
      "DEATH CERTIFICATE - Carlos V. Aquino - Date of Death: 2025-09-15 - This is a placeholder for the actual death certificate document.",
      "utf-8"
    );

    await DeathInfo.create({
      seniorId: deceasedSenior.id,
      dateOfDeath: new Date("2025-09-15"),
      deathCertificate: deathCertificateBuffer,
      createdBy: 1,
    });

    console.log("Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seed();
