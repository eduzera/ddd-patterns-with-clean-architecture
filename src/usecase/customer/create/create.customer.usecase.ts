import Address from "../../../domain/customer/entity/value-object/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";

export default class CreateCustomerUseCase {
  private repository: CustomerRepositoryInterface;

  constructor(repository: CustomerRepositoryInterface) {
    this.repository = repository;
  }

  async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const address = new Address(input.address.street, input.address.number, input.address.zipcode, input.address.city);
    const customer = CustomerFactory.createWithAddress(input.name, address);
    
    await this.repository.create(customer);
    
    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        zipcode: customer.Address.zipcode,
        city: customer.Address.city
      }
    }
  }
}