import { CompanyDocument, } from '../persistence/company.schema';
import { Company } from '../../domain/entities/company.entity';
import { Types } from 'mongoose';

/**
 * Mapper converts between Domain Entity and Database Document
 * This keeps domain and infrastructure independent
 */
class CompanyMapper {
  /**
   * Convert Database Document to Domain Entity
   */
  static toDomain(document: CompanyDocument): Company {
    if (!document) {
      throw new Error(
        'Cannot map null or undefined CompanyDocument to domain entity.',
      );
    }

    return new Company(
      (document._id as Types.ObjectId).toString(),
      document.companyName,
      document.email,
      document.phone,
      document.address,
      document.creationDate,
    );
  }

  /**
   * Convert Domain Entity to Database Document
   */
  static toPersistence(company: Company): Partial<CompanyDocument> {
    return {
      companyName: company.companyName,
      email: company.email,
      phone: company.phone,
      address: company.address,
      creationDate: company.creationDate,
    };
  }

  /**
   * Convert array of documents to domain entities
   */
  static toDomainArray(documents: CompanyDocument[]): Company[] {
    return documents.map((doc) => this.toDomain(doc));
  }
}

export default CompanyMapper;
