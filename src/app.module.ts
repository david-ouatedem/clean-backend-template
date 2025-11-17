import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './shared/infra/database/database.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { HealthModule } from './shared/infra/health/health.module';

@Module({
  imports: [
    // Global configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      // validate,
    }),

    // Database connection (PostgreSQL with TypeORM)
    DatabaseModule,

    // Feature modules
    CompaniesModule,

    // Health check module
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
