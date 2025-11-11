import { Company } from '../../domain/entities/company.entity';

/**
 * Response DTO - Controls what gets sent to the client
 * Can be different from domain entity
 */
export class CompanyResponseDto {
  id: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  creationDate: string;

  static fromDomain(company: Company): CompanyResponseDto {
    const dto = new CompanyResponseDto();
    dto.id = company.id;
    dto.companyName = company.companyName;
    dto.email = company.email;
    dto.phone = company.phone;
    dto.address = company.address;
    dto.creationDate = company.creationDate.toISOString();
    return dto;
  }

  static fromDomainArray(companies: Company[]): CompanyResponseDto[] {
    return companies.map((company) => this.fromDomain(company));
  }
}
