import { Company } from '../../domain/entities/company.entity';
import { NotFoundException } from '@nestjs/common';
import { CompanySchema } from '../persistence/company.schema';

/**
 * Mapper converts between Domain Entity and TypeORM Entity
 */
export class CompanyMapper {
  /**
   * Convert TypeORM Entity to Domain Entity
   */
  static toDomain(entity: CompanySchema): Company {
    if (!entity) {
      throw new NotFoundException('Company not found.');
    }

    return new Company(
      entity.id,
      entity.companyName,
      entity.email,
      entity.phone,
      entity.address,
      entity.creationDate,
    );
  }

  /**
   * Convert Domain Entity to TypeORM Entity
   */
  static toPersistence(company: Company): CompanySchema {
    const entity = new CompanySchema();
    entity.companyName = company.companyName;
    entity.email = company.email;
    entity.phone = company.phone;
    entity.address = company.address;
    entity.creationDate = company.creationDate;
    return entity;
  }

  /**
   * Update TypeORM Entity with Domain values
   */
  static toUpdatePersistence(
    entity: CompanySchema,
    updates: Partial<Company>,
  ): CompanySchema {
    if (updates.companyName !== undefined)
      entity.companyName = updates.companyName;
    if (updates.email !== undefined) entity.email = updates.email;
    if (updates.phone !== undefined) entity.phone = updates.phone;
    if (updates.address !== undefined) entity.address = updates.address;
    return entity;
  }

  /**
   * Convert array of entities to domain
   */
  static toDomainArray(entities: CompanySchema[]): Company[] {
    return entities.map((entity) => this.toDomain(entity));
  }
}
