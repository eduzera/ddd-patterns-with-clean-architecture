import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/entity/value-object/address";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

const address = new Address('Street', 1, 'zip', 'city')
const customer = CustomerFactory.createWithAddress('Eduardo', address)

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  };
}

describe('Unit test for Find Customer UseCase', () => {
  
  it('should find a customer', async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    await customerRepository.create(customer);

    const input = { id: customer.id }

    const output = {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        zipcode: customer.Address.zipcode,
        city: customer.Address.city
      }
    }

    const result = await usecase.execute(input);

    expect(result).toEqual(output)
  })

  it('should not find a customer', async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw Error("Customer not found");
    });
    const usecase = new FindCustomerUseCase(customerRepository);
    
    const input = { id: customer.id }

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Customer not found");
  })
})