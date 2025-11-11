/**
 * Domain Entity - Pure business object with no framework dependencies
 * This represents the core business concept of a Company
 */
export class Company {
  constructor(
    public readonly id: string,
    public readonly companyName: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly address: string,
    public readonly creationDate: Date,
  ) {}

  /**
   * Business validation methods can go here
   */
  isValidEmail(): boolean {
    return this.email.includes('@') && this.email.includes('.');
  }

  isValidPhone(): boolean {
    return this.phone.length >= 10;
  }

  /**
   * Factory method for creating a new company
   */
  static create(
    id: string,
    companyName: string,
    email: string,
    phone: string,
    address: string,
  ): Company {
    return new Company(id, companyName, email, phone, address, new Date());
  }

  /**
   * Business logic methods
   */
  updateContactInfo(email: string, phone: string): Company {
    return new Company(
      this.id,
      this.companyName,
      email,
      phone,
      this.address,
      this.creationDate,
    );
  }
}
