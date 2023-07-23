import Address from "../../../domain/customer/entity/value-object/address";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";

export default class UpdateCustomerUseCase {
  private repository: CustomerRepositoryInterface;

  constructor(repository: CustomerRepositoryInterface) {
    this.repository = repository;
  }

  async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
    const customer = await this.repository.find(input.id);
    customer.changeName(input.name);
    customer.changeAddress(new Address(input.address.street, input.address.number, input.address.zipcode, input.address.city));

    await this.repository.update(customer);

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