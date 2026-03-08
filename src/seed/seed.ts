import "dotenv/config";
import {
  sequelize,
  User,
  Barangay,
  Senior,
  SeniorProfile,
  Children,
  Dependent,
  HelpDeskRecord,
  HelpDeskRecordCategory,
  HelpDeskRecordCategoryRecord,
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
  Vaccine,
  SeniorVaccine,
  Assistance,
  SeniorAssistance,
} from "@/models";

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    console.log("Seeding Barangays...");
    await Barangay.create({ name: "Guindapunan East" });
    await Barangay.create({ name: "Sawang" });
    await Barangay.create({ name: "San Mateo" });
    await Barangay.create({ name: "Sidlangan" });
    await Barangay.create({ name: "Ponong" });
    await Barangay.create({ name: "Canal" });
    await Barangay.create({ name: "Parena" });
    await Barangay.create({ name: "Baybay" });

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
      username: "guindapunan_east",
      password: "password123",
      name: "Guindapunan East",
      role: "barangay",
      barangayId: 1,
    });
    await User.create({
      username: "sawang",
      password: "password123",
      name: "Sawang",
      role: "barangay",
      barangayId: 2,
    });
    await User.create({
      username: "san_mateo",
      password: "password123",
      name: "San Mateo",
      role: "barangay",
      barangayId: 3,
    });
    await User.create({
      username: "sidlangan",
      password: "password123",
      name: "Sidlangan",
      role: "barangay",
      barangayId: 4,
    });
    await User.create({
      username: "ponong",
      password: "password123",
      name: "Ponong",
      role: "barangay",
      barangayId: 5,
    });
    await User.create({
      username: "canal",
      password: "password123",
      name: "Canal",
      role: "barangay",
      barangayId: 6,
    });
    await User.create({
      username: "parena",
      password: "password123",
      name: "Parena",
      role: "barangay",
      barangayId: 7,
    });
    await User.create({
      username: "baybay",
      password: "password123",
      name: "Baybay",
      role: "barangay",
      barangayId: 8,
    });

    console.log("Seeding options...");
    await Cohabitant.create({ name: "Grand Children" });
    await Cohabitant.create({ name: "Common Law Spouse" });
    await Cohabitant.create({ name: "Spouse" });
    await Cohabitant.create({ name: "In-laws" });
    await Cohabitant.create({ name: "Care Institution" });
    await Cohabitant.create({ name: "Children" });
    await Cohabitant.create({ name: "Relative" });
    await Cohabitant.create({ name: "Friends" });

    await LivingCondition.create({ name: "No privacy" });
    await LivingCondition.create({ name: "Overcrowded in home" });
    await LivingCondition.create({ name: "Informal Settler" });
    await LivingCondition.create({ name: "No permanent house" });
    await LivingCondition.create({ name: "High cost of rent" });
    await LivingCondition.create({
      name: "Longing for independent living quiet atmosphere",
    });

    await HighestEducationalAttainment.create({ name: "Not Attended School" });
    await HighestEducationalAttainment.create({ name: "Elementary Level" });
    await HighestEducationalAttainment.create({ name: "Elementary Graduate" });
    await HighestEducationalAttainment.create({ name: "Highschool Level" });
    await HighestEducationalAttainment.create({ name: "Highschool Graduate" });
    await HighestEducationalAttainment.create({ name: "Vocational" });
    await HighestEducationalAttainment.create({ name: "College Level" });
    await HighestEducationalAttainment.create({ name: "College Graduate" });
    await HighestEducationalAttainment.create({ name: "Post Graduate" });

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
    await SpecializationTechnicalSkill.create({ name: "Driver" });
    await SpecializationTechnicalSkill.create({ name: "Computer Literate" });

    await CommunityInvolvement.create({ name: "Medical" });
    await CommunityInvolvement.create({ name: "Dental" });
    await CommunityInvolvement.create({ name: "Legal" });
    await CommunityInvolvement.create({ name: "Financial" });
    await CommunityInvolvement.create({ name: "Education" });
    await CommunityInvolvement.create({ name: "Social" });
    await CommunityInvolvement.create({ name: "Spiritual" });
    await CommunityInvolvement.create({ name: "Religious" });
    await CommunityInvolvement.create({ name: "Counselling/Referral" });
    await CommunityInvolvement.create({ name: "Sports" });
    await CommunityInvolvement.create({ name: "Arts and Culture" });
    await CommunityInvolvement.create({ name: "Environment" });
    await CommunityInvolvement.create({ name: "Livelihood" });
    await CommunityInvolvement.create({ name: "Disaster" });
    await CommunityInvolvement.create({ name: "Others" });

    await IncomeAssistanceSource.create({ name: "Own Pension" });
    await IncomeAssistanceSource.create({ name: "Spouse Pension" });
    await IncomeAssistanceSource.create({ name: "Children Support" });
    await IncomeAssistanceSource.create({ name: "Dependent on children/relatives" });
    await IncomeAssistanceSource.create({ name: "Government Assistance" });
    await IncomeAssistanceSource.create({ name: "NGO/CSO" });
    await IncomeAssistanceSource.create({ name: "Self-employed" });
    await IncomeAssistanceSource.create({ name: "Others" });

    await RealImmovableProperty.create({ name: "None" });
    await RealImmovableProperty.create({ name: "Land Only" });
    await RealImmovableProperty.create({ name: "House & Lot" });
    await RealImmovableProperty.create({ name: "Commercial" });
    await RealImmovableProperty.create({ name: "Agricultural" });
    await RealImmovableProperty.create({ name: "Others" });

    await PersonalMovableProperty.create({ name: "Automobile" });
    await PersonalMovableProperty.create({ name: "Motorcycle" });
    await PersonalMovableProperty.create({ name: "Bicycle" });
    await PersonalMovableProperty.create({ name: "Appliances" });
    await PersonalMovableProperty.create({ name: "Jewelry" });
    await PersonalMovableProperty.create({ name: "Livestock" });
    await PersonalMovableProperty.create({ name: "Mobile Phones" });
    await PersonalMovableProperty.create({ name: "Others" });

    await MonthlyIncome.create({ name: "Below 5000" });
    await MonthlyIncome.create({ name: "5000 to 10000" });
    await MonthlyIncome.create({ name: "20000 to 30000" });
    await MonthlyIncome.create({ name: "30000 to 40000" });
    await MonthlyIncome.create({ name: "Above 40000" });

    await ProblemsNeedsCommonlyEncountered.create({ name: "Lack of incomes/resource" });
    await ProblemsNeedsCommonlyEncountered.create({ name: "Health" });
    await ProblemsNeedsCommonlyEncountered.create({ name: "Shelter" });
    await ProblemsNeedsCommonlyEncountered.create({ name: "Food" });
    await ProblemsNeedsCommonlyEncountered.create({ name: "Education" });
    await ProblemsNeedsCommonlyEncountered.create({ name: "Others" });

    await HealthProblemAilment.create({ name: "Hypertension" });
    await HealthProblemAilment.create({ name: "Arthritis/Gout" });
    await HealthProblemAilment.create({ name: "Diabetes" });
    await HealthProblemAilment.create({ name: "Heart Disease" });
    await HealthProblemAilment.create({ name: "Asthma" });
    await HealthProblemAilment.create({ name: "TB" });
    await HealthProblemAilment.create({ name: "Stroke" });
    await HealthProblemAilment.create({ name: "Cancer" });
    await HealthProblemAilment.create({ name: "Others" });

    await DentalConcern.create({ name: "Needs Dental Care" });
    await DentalConcern.create({ name: "Has Dentures" });
    await DentalConcern.create({ name: "No dental issues" });
    await DentalConcern.create({ name: "Others" });

    await VisualConcern.create({ name: "Blind" });
    await VisualConcern.create({ name: "Needs eye care" });
    await VisualConcern.create({ name: "Has eyeglasses" });
    await VisualConcern.create({ name: "No visual issues" });
    await VisualConcern.create({ name: "Others" });

    await AuralConcern.create({ name: "Aural impairment" });
    await AuralConcern.create({ name: "Has hearing aid" });
    await AuralConcern.create({ name: "No aural issues" });
    await AuralConcern.create({ name: "Others" });

    await SocialEmotionalConcern.create({ name: "Feeling neglect/rejection" });
    await SocialEmotionalConcern.create({ name: "Depression" });
    await SocialEmotionalConcern.create({ name: "Feeling loneliness/ isolate" });
    await SocialEmotionalConcern.create({
      name: "Feeling helplessness/ worthlessness",
    });
    await SocialEmotionalConcern.create({
      name: "Lack leisure/ recreational activities",
    });
    await SocialEmotionalConcern.create({
      name: "Lack SC friendly environment",
    });

    console.log("Seeding vaccines...");
    const flu = await Vaccine.create({ name: "Influenza (Flu)" });
    const pneumo = await Vaccine.create({ name: "Pneumococcal" });
    const covid = await Vaccine.create({ name: "COVID-19" });
    await Vaccine.create({ name: "Shingles" });

    console.log("Seeding assistances...");
    const medicalAssistance = await Assistance.create({ name: "Medical Assistance" });
    const financialAssistance = await Assistance.create({ name: "Financial Assistance" });
    const foodAssistance = await Assistance.create({ name: "Food Assistance" });
    await Assistance.create({ name: "Transportation Assistance" });

    await AreaOfDifficulty.create({ name: "High Cost of medicine" });
    await AreaOfDifficulty.create({ name: "Lack of medicines" });
    await AreaOfDifficulty.create({ name: "Lack of medical attention" });

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
    const senior = await Senior.create({
      barangayId: 1,
      createdBy: 1,
    });

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

    await SeniorProfile.create({
      seniorId: senior.id,
      lastname: "Santos",
      firstname: "Maria",
      middlename: "Cruz",
      extension: "Sr.",
      region: "Region IV-A (CALABARZON)",
      province: "Laguna",
      city: "San Pedro",
      barangay: "Baybay",
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
      sharedSkills: "Teaching, Cooking, Sewing",
      bloodType: "A+",
      physicalDisability: "Mild arthritis in hands",
      listMedicines: "Hypertension medication, pain relievers",
      checkUp: true,
      scheduleCheckUp: "Every 3 Months",
      cohabitantIds: [3, 6, 7],
      livingConditionIds: [1],
      highestEducationalAttainmentIds: [8],
      specializationTechnicalSkillIds: [9, 10, 13],
      communityInvolvementIds: [1, 8, 9],
      incomeAssistanceSourceIds: [2, 4],
      realImmovablePropertyIds: [3],
      personalMovablePropertyIds: [1, 7],
      monthlyIncomeIds: [3],
      problemsNeedsCommonlyEncounteredIds: [1],
      healthProblemAilmentIds: [1, 2],
      dentalConcernIds: [1],
      visualConcernIds: [2],
      auralConcernIds: [1],
      socialEmotionalConcernIds: [1, 3],
      areaOfDifficultyIds: [1, 2],
      createdBy: 1,
    });

    await Children.create({
      seniorId: senior.id,
      name: "Maria Santos Jr.",
      occupation: "Nurse",
      income: 25000.0,
      age: 45,
      isWorking: "Yes",
    });
    await Children.create({
      seniorId: senior.id,
      name: "Juan Santos Jr.",
      occupation: "Engineer",
      income: 35000.0,
      age: 42,
      isWorking: "Yes",
    });
    await Children.create({
      seniorId: senior.id,
      name: "Ana Santos",
      occupation: "Teacher",
      income: 20000.0,
      age: 38,
      isWorking: "Yes",
    });

    await Dependent.create({
      seniorId: senior.id,
      name: "Pedro Santos",
      occupation: "Student",
      income: 0.0,
      age: 16,
      isWorking: false,
    });
    await Dependent.create({
      seniorId: senior.id,
      name: "Maria Santos",
      occupation: "Housewife",
      income: 0.0,
      age: 65,
      isWorking: false,
    });

    console.log("Seeding senior vaccines...");
    await SeniorVaccine.create({ seniorId: senior.id, vaccineId: flu.id, vaccineDate: new Date("2024-10-01") });
    await SeniorVaccine.create({ seniorId: senior.id, vaccineId: pneumo.id, vaccineDate: new Date("2023-06-15") });
    await SeniorVaccine.create({ seniorId: senior.id, vaccineId: covid.id, vaccineDate: new Date("2025-01-20") });

    console.log("Seeding senior assistances...");
    await SeniorAssistance.create({ seniorId: senior.id, assistanceId: medicalAssistance.id, assistanceDate: new Date("2024-09-01") });
    await SeniorAssistance.create({ seniorId: senior.id, assistanceId: financialAssistance.id, assistanceDate: new Date("2024-11-05") });
    await SeniorAssistance.create({ seniorId: senior.id, assistanceId: foodAssistance.id, assistanceDate: new Date("2025-02-10") });

    const helpDeskRecord1 = await HelpDeskRecord.create({
      seniorId: senior.id,
      details: "Request for medical check-up assistance",
      createdBy: 1,
    });
    await HelpDeskRecordCategoryRecord.create({
      helpDeskRecordId: helpDeskRecord1.id,
      helpDeskRecordCategoryId: 1,
    });
    const helpDeskRecord2 = await HelpDeskRecord.create({
      seniorId: senior.id,
      details: "Application for senior citizen discount card",
      createdBy: 1,
    });
    await HelpDeskRecordCategoryRecord.create({
      helpDeskRecordId: helpDeskRecord2.id,
      helpDeskRecordCategoryId: 2,
    });
    const helpDeskRecord3 = await HelpDeskRecord.create({
      seniorId: senior.id,
      details: "Request for food assistance program",
      createdBy: 1,
    });
    await HelpDeskRecordCategoryRecord.create({
      helpDeskRecordId: helpDeskRecord3.id,
      helpDeskRecordCategoryId: 7,
    });
    const helpDeskRecord4 = await HelpDeskRecord.create({
      seniorId: senior.id,
      details: "Multiple assistance requests - medical and transportation",
      createdBy: 1,
    });
    await HelpDeskRecordCategoryRecord.create({
      helpDeskRecordId: helpDeskRecord4.id,
      helpDeskRecordCategoryId: 1,
    });
    await HelpDeskRecordCategoryRecord.create({
      helpDeskRecordId: helpDeskRecord4.id,
      helpDeskRecordCategoryId: 5,
    });

    // Pending senior
    console.log("Seeding pending senior...");
    const pendingSenior = await Senior.create({
      barangayId: 2,
      createdBy: 1,
    });
    await SeniorStatusHistory.create({
      seniorId: pendingSenior.id,
      status: "Pending",
      note: "Awaiting document verification",
      createdBy: 1,
    });
    await SeniorProfile.create({
      seniorId: pendingSenior.id,
      lastname: "Reyes",
      firstname: "Juan",
      middlename: "Garcia",
      region: "Region IV-A (CALABARZON)",
      province: "Laguna",
      city: "San Pedro",
      barangay: "San Mateo",
      residence: "456 Side Street",
      street: "Purok 2",
      birthDate: new Date("1955-07-20"),
      birthPlace: "Balire, San Pedro, Laguna",
      maritalStatus: "Married",
      religion: "Roman Catholic",
      sexAtBirth: "Male",
      contactNumber: "09187654321",
      oscaIdNo: "OSCA-2024-002",
      bloodType: "O+",
      checkUp: false,
      scheduleCheckUp: "Annually",
      createdBy: 1,
    });

    // Declined senior
    console.log("Seeding declined senior...");
    const declinedSenior = await Senior.create({
      barangayId: 3,
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
    await SeniorProfile.create({
      seniorId: declinedSenior.id,
      lastname: "Dela Cruz",
      firstname: "Pedro",
      middlename: "Mendoza",
      region: "Region IV-A (CALABARZON)",
      province: "Laguna",
      city: "San Pedro",
      barangay: "Ponong",
      residence: "789 Back Road",
      street: "Purok 3",
      birthDate: new Date("1960-12-10"),
      birthPlace: "Banawang, San Pedro, Laguna",
      maritalStatus: "Single",
      religion: "Roman Catholic",
      sexAtBirth: "Male",
      contactNumber: "09191234567",
      oscaIdNo: "OSCA-2024-003",
      bloodType: "O+",
      checkUp: false,
      scheduleCheckUp: "Annually",
      createdBy: 1,
    });

    // Second active senior
    console.log("Seeding another active senior...");
    const activeSenior = await Senior.create({
      barangayId: 4,
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
    await SeniorProfile.create({
      seniorId: activeSenior.id,
      lastname: "Lopez",
      firstname: "Rosa",
      middlename: "Santos",
      region: "Region IV-A (CALABARZON)",
      province: "Laguna",
      city: "San Pedro",
      barangay: "San Mateo",
      residence: "321 Front Avenue",
      street: "Purok 4",
      birthDate: new Date("1952-05-25"),
      birthPlace: "San Antonio, San Pedro, Laguna",
      maritalStatus: "Widowed",
      religion: "Iglesia ni Cristo",
      sexAtBirth: "Female",
      contactNumber: "09201234567",
      oscaIdNo: "OSCA-2024-004",
      bloodType: "O+",
      checkUp: false,
      scheduleCheckUp: "Annually",
      createdBy: 1,
    });

    // Deceased senior
    console.log("Seeding deceased senior...");
    const deceasedSenior = await Senior.create({
      barangayId: 5,
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
    await SeniorProfile.create({
      seniorId: deceasedSenior.id,
      lastname: "Aquino",
      firstname: "Carlos",
      middlename: "Villanueva",
      region: "Region IV-A (CALABARZON)",
      province: "Laguna",
      city: "San Pedro",
      barangay: "Parena",
      residence: "555 Memorial Drive",
      street: "Purok 5",
      birthDate: new Date("1948-11-30"),
      birthPlace: "San Pedro, Laguna",
      maritalStatus: "Married",
      religion: "Roman Catholic",
      sexAtBirth: "Male",
      contactNumber: "09171234567",
      oscaIdNo: "OSCA-2024-005",
      bloodType: "O+",
      checkUp: false,
      scheduleCheckUp: "Annually",
      createdBy: 1,
    });
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
