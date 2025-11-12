import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../../domain/entities/company.entity';
import { CompanyMapper } from '../mappers/company.mapper';
import { ICompanyRepository } from '../../domain/repositories/company.repo.interface';
import { CompanySchema } from './company.schema';

/**
 * PostgreSQL implementation of ICompanyRepository using TypeORM
 */
@Injectable()
export class CompanyRepository implements ICompanyRepository {
  constructor(
    @InjectRepository(CompanySchema)
    private readonly repository: Repository<CompanySchema>,
  ) {}

  async findAll(): Promise<Company[]> {
    const entities = await this.repository.find({
      order: { creationDate: 'DESC' },
    });
    return CompanyMapper.toDomainArray(entities);
  }

  async findById(id: string): Promise<Company | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? CompanyMapper.toDomain(entity) : null;
  }

  async create(company: Company): Promise<Company> {
    const entity = CompanyMapper.toPersistence(company);
    const saved = await this.repository.save(entity);
    return CompanyMapper.toDomain(saved);
  }

  async update(id: string, updates: Partial<Company>): Promise<Company | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      return null;
    }

    const updated = CompanyMapper.toUpdatePersistence(entity, updates);
    const saved = await this.repository.save(updated);
    return CompanyMapper.toDomain(saved);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
