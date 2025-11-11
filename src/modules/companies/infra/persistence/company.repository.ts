import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CompanyMapper from '../mappers/company.mapper';
import { Company } from '../../domain/entities/company.entity';
import { CompanyDocument } from './company.schema';
import { ICompanyRepository } from '../../domain/repositories/company.repo.interface';
import { Injectable } from '@nestjs/common';

/**
 * Concrete implementation of ICompanyRepository
 * Uses Mongoose to persist data
 */
@Injectable()
export class CompanyRepository implements ICompanyRepository {
  constructor(
    @InjectModel(CompanyDocument.name)
    private readonly companyModel: Model<CompanyDocument>,
  ) {}

  async findAll(): Promise<Company[]> {
    const documents = await this.companyModel.find().exec();
    return CompanyMapper.toDomainArray(documents);
  }

  async findById(id: string): Promise<Company | null> {
    const document = await this.companyModel.findById(id).exec();
    return document ? CompanyMapper.toDomain(document) : null;
  }

  async create(company: Company): Promise<Company> {
    const persistence = CompanyMapper.toPersistence(company);
    const created = new this.companyModel(persistence);
    const saved = await created.save();
    return CompanyMapper.toDomain(saved);
  }

  async update(id: string, company: Partial<Company>): Promise<Company | null> {
    const updated = await this.companyModel
      .findByIdAndUpdate(id, company, { new: true })
      .exec();

    return updated ? CompanyMapper.toDomain(updated) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.companyModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
