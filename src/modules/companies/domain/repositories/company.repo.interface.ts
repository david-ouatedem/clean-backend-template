import { Company } from '../entities/company.entity';

/**
 * Repository Interface (Port) - Defines what we need from persistence
 * The actual implementation is in the infrastructure layer
 */
export interface ICompanyRepository {
  findAll(): Promise<Company[]>;
  findById(id: string): Promise<Company | null>;
  create(company: Company): Promise<Company>;
  update(id: string, company: Partial<Company>): Promise<Company | null>;
  delete(id: string): Promise<boolean>;
}

export const COMPANY_REPOSITORY = Symbol('COMPANY_REPOSITORY');
