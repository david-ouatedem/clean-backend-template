import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  COMPANY_REPOSITORY,
  type ICompanyRepository,
} from '../../domain/repositories/company.repo.interface';
import { UpdateCompanyDto } from '../dtos/update-company.dto';
import { Company } from '../../domain/entities/company.entity';

@Injectable()
export class UpdateCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async execute(id: string, dto: UpdateCompanyDto): Promise<Company> {
    // Check if company exists
    const existingCompany = await this.companyRepository.findById(id);
    if (!existingCompany) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    // Business validation
    if (dto.email && !dto.email.includes('@')) {
      throw new BadRequestException('Invalid email format');
    }

    if (dto.phone && dto.phone.length < 10) {
      throw new BadRequestException('Phone number must be at least 10 digits');
    }

    // Update through repository
    const updatedCompany = await this.companyRepository.update(id, {
      companyName: dto.companyName,
      email: dto.email,
      phone: dto.phone,
      address: dto.address,
    });

    if (!updatedCompany) {
      throw new NotFoundException(`Failed to update company with ID ${id}`);
    }

    return updatedCompany;
  }
}
