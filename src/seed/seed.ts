import "dotenv/config";
import {
  sequelize,
  User,
  Barangay,
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

    // Area of Difficulty
    await AreaOfDifficulty.create({ name: "High Cost of medicine" });
    await AreaOfDifficulty.create({ name: "Lack of medicines" });
    await AreaOfDifficulty.create({ name: "Lack of medical attention" });

    console.log("Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seed();
