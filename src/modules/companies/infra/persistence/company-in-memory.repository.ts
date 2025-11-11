import { Injectable } from '@nestjs/common';
import { Company } from '../../domain/entities/company.entity';
import { ICompanyRepository } from '../../domain/repositories/company.repo.interface';

/**
 * In-memory implementation for testing or development
 * No database required!
 */
@Injectable()
export class CompanyInMemoryRepository implements ICompanyRepository {
  private companies: Map<string, Company> = new Map();

  async findAll(): Promise<Company[]> {
    return Array.from(this.companies.values());
  }

  async findById(id: string): Promise<Company | null> {
    return this.companies.get(id) || null;
  }

  async create(company: Company): Promise<Company> {
    this.companies.set(company.id, company);
    return company;
  }

  async update(id: string, updates: Partial<Company>): Promise<Company | null> {
    const existing = this.companies.get(id);
    if (!existing) {
      return null;
    }

    const updated = new Company(
      existing.id,
      updates.companyName ?? existing.companyName,
      updates.email ?? existing.email,
      updates.phone ?? existing.phone,
      updates.address ?? existing.address,
      existing.creationDate,
    );

    this.companies.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.companies.delete(id);
  }

  // Helper for testing
  clear(): void {
    this.companies.clear();
  }

  // Seed initial data
  seed(companies: Company[]): void {
    companies.forEach((company) => {
      this.companies.set(company.id, company);
    });
  }
}
