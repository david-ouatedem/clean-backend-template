import { Module } from '@nestjs/common';
import { CompanyController } from './presentation/controllers/company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanySchema } from './infra/persistence/company.schema';
import { COMPANY_REPOSITORY } from './domain/repositories/company.repo.interface';
import { CompanyRepository } from './infra/persistence/company.repository';
import { GetCompaniesUseCase } from './application/use-cases/get-companies.use-case';
import { GetCompanyUseCase } from './application/use-cases/get-company.use-case';
import { CreateCompanyUseCase } from './application/use-cases/create-company.use-case';
import { UpdateCompanyUseCase } from './application/use-cases/update-company.use-case';
import { DeleteCompanyUseCase } from './application/use-cases/delete-company.use-case';

@Module({
  imports: [
    // Register TypeORM entity
    TypeOrmModule.forFeature([CompanySchema]),
  ],
  controllers: [
    CompanyController, // This exposes /api/companies routes
  ],
  providers: [
    // Repository
    {
      provide: COMPANY_REPOSITORY,
      useClass: CompanyRepository,
    },

    // Use Cases
    GetCompaniesUseCase,
    GetCompanyUseCase,
    CreateCompanyUseCase,
    UpdateCompanyUseCase,
    DeleteCompanyUseCase,
  ],
  exports: [
    // Export if other modules need to use companies
    COMPANY_REPOSITORY,
  ],
})
export class CompaniesModule {}
