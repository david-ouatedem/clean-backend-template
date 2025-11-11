import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  COMPANY_REPOSITORY,
  type ICompanyRepository,
} from '../../domain/repositories/company.repo.interface';

@Injectable()
export class DeleteCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async execute(id: string): Promise<boolean> {
    // Check if company exists first
    const company = await this.companyRepository.findById(id);
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    const isDeleted = await this.companyRepository.delete(id);

    if (!isDeleted) {
      throw new NotFoundException(`Failed to delete company with ID ${id}`);
    }
    return isDeleted;
  }
}
