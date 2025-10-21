# Senior Citizen Portal Backend

TypeScript/Node.js REST API for the **Senior Citizen Portal Management System**. Handles authentication, senior citizen profiles, health records, helpdesk services, vaccines, and comprehensive data management for senior citizens. Designed for containerized deployment on **AWS EKS**, using a managed SQL database (e.g., **AWS RDS**).

> This repository is used as a Git submodule in the main infra/mono repo.

---

## ✨ Highlights

- **TypeScript + Node.js** (Express-style app entry in `src/app.ts`)
- **Modular structure**: controllers, routes, models, middleware, services
- **JWT auth** for protected endpoints (`Authorization: Bearer <token>`)
- **PostgreSQL database** via Sequelize ORM (see `src/models/*` and `src/config/db.ts`)
- **Seed script** for bootstrap data (`src/seed/seed.ts`)
- **Docker-ready** with a production `Dockerfile`
- **File upload support** with Multer for senior photos
- **Kubernetes manifests** live in the infra repo (image pulled from AWS ECR)

---

## 🗂️ Project Structure

```
senior-citizen-portal-backend/
├─ Dockerfile
├─ docker-compose.yml
├─ package.json
├─ package-lock.json
├─ tsconfig.json
├─ certs/
│  └─ ap-southeast-2-bundle.pem         # (optional) RDS SSL bundle
└─ src/
   ├─ app.ts                             # Express app bootstrap
   ├─ config/
   │  └─ db.ts                           # PostgreSQL connection
   ├─ controllers/                       # Route controllers
   │  ├─ auth.controller.ts
   │  ├─ senior.controller.ts
   │  ├─ senior-vaccine.controller.ts
   │  ├─ helpdesk.controller.ts
   │  ├─ option.controller.ts
   │  └─ user.controller.ts
   ├─ middleware/                        # Auth & file upload middleware
   ├─ models/                            # Sequelize models
   │  ├─ senior.model.ts
   │  ├─ identifying-information.model.ts
   │  ├─ family-composition.model.ts
   │  ├─ health-profile.model.ts
   │  ├─ education-profile.model.ts
   │  ├─ economic-profile.model.ts
   │  ├─ dependency-profile.model.ts
   │  ├─ help-desk-record.model.ts
   │  ├─ senior-status-history.model.ts
   │  └─ options/                        # Reference data models
   ├─ routes/                            # Route definitions
   │  ├─ auth.routes.ts
   │  ├─ seniors.routes.ts
   │  ├─ senior-vaccines.routes.ts
   │  ├─ helpdesk.routes.ts
   │  ├─ options.routes.ts
   │  └─ users.routes.ts
   ├─ services/                          # Business logic layer
   ├─ types/                             # TypeScript type definitions
   ├─ utils/                             # Utility functions
   └─ seed/
      └─ seed.ts                         # Database seeding script
```

---

## 🗄️ Model Relationships

The database schema follows these relationships:

- **User**
  - Authentication and authorization
  - `User` can have a `role` (e.g., `admin`, `staff`)
  
- **Senior**
  - Core senior citizen record
  - Has one `IdentifyingInformation`
  - Has one `FamilyComposition`
  - Has one `HealthProfile`
  - Has one `EducationProfile`
  - Has one `EconomicProfile`
  - Has one `DependencyProfile`
  - Has many `SeniorStatusHistory` (tracks status changes)
  - Has many vaccine records through `SeniorVaccine`
  
- **IdentifyingInformation**
  - Personal details, contact info, photo
  - Belongs to `Senior`
  
- **FamilyComposition**
  - Spouse info, children, dependents
  - Has many `Children`
  - Has many `Dependent`
  - Belongs to `Senior`
  
- **HealthProfile**
  - Health problems, visual/aural/dental concerns
  - Links to various health-related option models
  - Belongs to `Senior`
  
- **EducationProfile**
  - Educational attainment, technical skills
  - Belongs to `Senior`
  
- **EconomicProfile**
  - Income sources, monthly income, properties
  - Belongs to `Senior`
  
- **DependencyProfile**
  - Living conditions, area of difficulties
  - Belongs to `Senior`
  
- **HelpDeskRecord**
  - Service requests and concerns from seniors
  - References `Senior`
  - Categorized by `HelpDeskRecordCategory`
  
- **SeniorVaccine**
  - Vaccination records for seniors
  - Links `Senior` to vaccine types
  
- **Options Models**
  - Reference data tables for dropdowns and selections
  - Examples: `HealthProblemAilment`, `VisualConcern`, `Vaccine`, etc.

> Associations are defined in `src/models/index.ts`.  
> This structure supports comprehensive senior citizen data management with flexible profiles and tracking.

---

## ⚙️ Environment Variables

Create `.env` at the backend root (or inject via Kubernetes Secret):

```
# Database
DB_HOST=<rds-endpoint>
DB_PORT=5432
DB_NAME=<db-name>
DB_USERNAME=<db-user>
DB_PASSWORD=<db-password>

# App
PORT=8000
JWT_SECRET=<strong-random-secret>

# File Upload (optional)
UPLOAD_PATH=./uploads
```

> In Kubernetes, these are provided by `backend-secret` and consumed in `backend-deployment.yaml`.

---

## 🧑‍💻 Local Development

```bash
npm install
npm run dev
```

With Docker:

```bash
docker build -t senior-citizen-portal-backend .
docker run -p 8000:8000 senior-citizen-portal-backend
```

---

## 🌱 Seeding

```bash
npm run seed
```
> Populates barangays, option tables (health concerns, vaccines, income sources, etc.), sample users, and senior records. Uses `.env` for DB config.

---

## 🔗 API Overview

**Auth**
- `POST /auth/register`
- `POST /auth/login`

**Users**
- `GET /users/me`
- `GET /users/:id` _(admin)_
- `PATCH /users/:id`

**Seniors**
- `GET /seniors` - List all seniors with filters
- `GET /seniors/:id` - Get detailed senior profile
- `POST /seniors` - Create new senior (with photo upload)
- `PUT /seniors/:id` - Update senior profile
- `DELETE /seniors/:id` - Soft delete senior

**Senior Vaccines**
- `GET /senior-vaccines` - List vaccine records
- `GET /senior-vaccines/senior/:seniorId` - Get vaccines for specific senior
- `POST /senior-vaccines` - Record new vaccination
- `PUT /senior-vaccines/:id` - Update vaccine record
- `DELETE /senior-vaccines/:id` - Delete vaccine record

**Helpdesk**
- `GET /helpdesk` - List helpdesk records
- `GET /helpdesk/:id` - Get record details
- `POST /helpdesk` - Create helpdesk record
- `PUT /helpdesk/:id` - Update helpdesk record
- `DELETE /helpdesk/:id` - Delete helpdesk record

**Options (Reference Data)**
- `GET /options/area-of-difficulties`
- `GET /options/aural-concerns`
- `GET /options/cohabitants`
- `GET /options/community-involvements`
- `GET /options/dental-concerns`
- `GET /options/health-problems`
- `GET /options/educational-attainments`
- `GET /options/income-sources`
- `GET /options/living-conditions`
- `GET /options/monthly-incomes`
- `GET /options/personal-properties`
- `GET /options/problems-needs`
- `GET /options/real-properties`
- `GET /options/social-emotional-concerns`
- `GET /options/technical-skills`
- `GET /options/visual-concerns`
- `GET /options/help-desk-record-categories`
- `GET /options/vaccines`
- `POST /options/:key` - Create option
- `PUT /options/:key/:id` - Update option
- `DELETE /options/:key/:id` - Delete option

---

## 🚀 Deployment (EKS/ECR)

```bash
aws ecr get-login-password --region ap-southeast-2 \
  | docker login --username AWS --password-stdin \
    248189921368.dkr.ecr.ap-southeast-2.amazonaws.com

docker tag senior-citizen-portal-backend:latest \
  248189921368.dkr.ecr.ap-southeast-2.amazonaws.com/senior-citizen-portal-backend:latest

docker push 248189921368.dkr.ecr.ap-southeast-2.amazonaws.com/senior-citizen-portal-backend:latest
```

Kubernetes (from infra repo):

```bash
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl rollout restart deployment/backend-deployment
```

---

## 🧭 Roadmap Ideas

- Extended Admin functionalities
- Advanced search and filtering for seniors
- Pagination and filters
- Report generation and analytics
- Email notifications for helpdesk
- Tests (Jest/Supertest)
- API documentation (Swagger/OpenAPI)
- Audit logging for sensitive operations
