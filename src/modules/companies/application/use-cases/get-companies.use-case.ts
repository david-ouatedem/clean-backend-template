import { Inject, Injectable } from '@nestjs/common';
import {
  COMPANY_REPOSITORY,
  type ICompanyRepository,
} from '../../domain/repositories/company.repo.interface';
import { Company } from '../../domain/entities/company.entity';

@Injectable()
export class GetCompaniesUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async execute(): Promise<Company[]> {
    return await this.companyRepository.findAll();
  }
}
