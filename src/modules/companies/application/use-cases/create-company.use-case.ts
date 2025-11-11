import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  COMPANY_REPOSITORY,
  type ICompanyRepository,
} from '../../domain/repositories/company.repo.interface';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { Company } from '../../domain/entities/company.entity';

@Injectable()
export class CreateCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async execute(dto: CreateCompanyDto): Promise<Company> {
    // Business validation
    if (!dto.email.includes('@')) {
      throw new BadRequestException('Invalid email format');
    }

    if (dto.phone.length < 10) {
      throw new BadRequestException('Phone number must be at least 10 digits');
    }

    if (dto.companyName.length < 2) {
      throw new BadRequestException(
        'Company name must be at least 2 characters',
      );
    }

    // Create domain entity
    const company = Company.create(
      this.generateId(), // In real app, use UUID library
      dto.companyName,
      dto.email,
      dto.phone,
      dto.address,
    );

    // Additional domain validation
    if (!company.isValidEmail()) {
      throw new BadRequestException('Email validation failed');
    }

    if (!company.isValidPhone()) {
      throw new BadRequestException('Phone validation failed');
    }

    // Persist through repository
    return await this.companyRepository.create(company);
  }

  private generateId(): string {
    // In production, use: import { v4 as uuidv4 } from 'uuid';
    return Math.random().toString(36).substring(2, 15);
  }
}
