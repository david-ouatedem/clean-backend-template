import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCompanyDto } from '../../application/dtos/create-company.dto';
import { UpdateCompanyDto } from '../../application/dtos/update-company.dto';
import { GetCompaniesUseCase } from '../../application/use-cases/get-companies.use-case';
import { GetCompanyUseCase } from '../../application/use-cases/get-company.use-case';
import { CreateCompanyUseCase } from '../../application/use-cases/create-company.use-case';
import { UpdateCompanyUseCase } from '../../application/use-cases/update-company.use-case';
import { DeleteCompanyUseCase } from '../../application/use-cases/delete-company.use-case';
import { CompanyResponseDto } from '../dtos/company.response.dto';

/**
 * REST API Controller for Companies
 * Handles HTTP requests and delegates to use cases
 */
@Controller('companies')
export class CompanyController {
  constructor(
    private readonly getCompaniesUseCase: GetCompaniesUseCase,
    private readonly getCompanyUseCase: GetCompanyUseCase,
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly updateCompanyUseCase: UpdateCompanyUseCase,
    private readonly deleteCompanyUseCase: DeleteCompanyUseCase,
  ) {}

  /**
   * GET /companies
   * Get all companies
   */
  @Get()
  async findAll(): Promise<CompanyResponseDto[]> {
    const companies = await this.getCompaniesUseCase.execute();
    return CompanyResponseDto.fromDomainArray(companies);
  }

  /**
   * GET /companies/:id
   * Get a single company by ID
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CompanyResponseDto> {
    const company = await this.getCompanyUseCase.execute(id);
    return CompanyResponseDto.fromDomain(company);
  }

  /**
   * POST /companies
   * Create a new company
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<CompanyResponseDto> {
    const company = await this.createCompanyUseCase.execute(createCompanyDto);
    return CompanyResponseDto.fromDomain(company);
  }

  /**
   * PUT /companies/:id
   * Update an existing company
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<CompanyResponseDto> {
    const company = await this.updateCompanyUseCase.execute(
      id,
      updateCompanyDto,
    );
    return CompanyResponseDto.fromDomain(company);
  }

  /**
   * DELETE /companies/:id
   * Delete a company
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<{ success: boolean }> {
    const success = await this.deleteCompanyUseCase.execute(id);
    return { success };
  }
}
