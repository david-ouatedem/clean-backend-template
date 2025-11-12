import dataSource from '../typeorm.config';
import { CompanySchema } from '../../../../modules/companies/infra/persistence/company.schema';

async function seed() {
  const connection = await dataSource.initialize();

  const companyRepository = connection.getRepository(CompanySchema);

  const companies = [
    {
      companyName: 'Tech Corp',
      email: 'contact@techcorp.com',
      phone: '+1234567890',
      address: '123 Tech Street, Silicon Valley, CA 94000',
    },
    {
      companyName: 'Business Solutions Inc',
      email: 'info@business-solutions.com',
      phone: '+0987654321',
      address: '456 Business Ave, New York, NY 10001',
    },
    {
      companyName: 'Global Enterprises',
      email: 'hello@globalent.com',
      phone: '+1122334455',
      address: '789 Enterprise Blvd, London, UK',
    },
  ];

  for (const company of companies) {
    const exists = await companyRepository.findOne({
      where: { email: company.email },
    });

    if (!exists) {
      await companyRepository.save(company);
      console.log(`✅ Seeded: ${company.companyName}`);
    } else {
      console.log(`⏭️  Skipped: ${company.companyName} (already exists)`);
    }
  }

  console.log('🌱 Seeding completed!');
  await connection.destroy();
}

seed().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
