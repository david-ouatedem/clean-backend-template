import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

/**
 * Mongoose Schema (Database Model)
 * This is the database representation, NOT the domain entity
 */
@Schema({ collection: 'companies', timestamps: true })
export class CompanyDocument extends Document {
  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ type: Date, default: Date.now })
  creationDate: Date;
}

export type CompanyDocumentType = CompanyDocument &
  Document & { _id: Types.ObjectId };

export const CompanySchema = SchemaFactory.createForClass(CompanyDocument);

// Add indexes for better query performance
CompanySchema.index({ email: 1 });
CompanySchema.index({ companyName: 1 });
