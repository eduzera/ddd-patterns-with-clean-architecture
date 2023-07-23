import Address from "../../../domain/customer/entity/value-object/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress("Eduardo", new Address("Street", 1, "zip", "city"));

const input = { id: customer.id, name: customer.name, address: { street: customer.Address.street, number: customer.Address.number, zipcode: customer.Address.zipcode, city: customer.Address.city } };

const MockRepository = {
  create: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(customer)),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}

describe("Unit test for update customer use case", () => {
  it("should update a customer", async () => {
    const usecase = new UpdateCustomerUseCase(MockRepository);
    
    const output = await usecase.execute(input);

    expect(output).toEqual(input);
  })

  it( "should throw an error when id does not exist", async () => {
    const repository = MockRepository;
    repository.update.mockImplementationOnce(() => {
      throw new Error("Customer not found");
    })
    const usecase = new UpdateCustomerUseCase(MockRepository);

    expect(async () => {
      await usecase.execute(input);
    }).rejects.toThrow("Customer not found");
  })
});