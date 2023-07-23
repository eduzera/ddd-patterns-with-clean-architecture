import Address from "../../../domain/customer/entity/value-object/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress("Eduardo", new Address("Street", 1, "zip", "city"));
const customer2 = CustomerFactory.createWithAddress("Shirley", new Address("Street", 1, "zip", "city"));
const customer3 = CustomerFactory.createWithAddress("Maria ALice", new Address("Street", 1, "zip", "city"));

const MockRepository = {
  create: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2, customer3])),
  update: jest.fn(),
  delete: jest.fn()
}

describe("Unit test for list customer use case", () => {
  it("should list all customers", async () => {
    const usecase = new ListCustomerUseCase(MockRepository);

    const output = await usecase.execute({});

    expect(output.customers.length).toBe(3);
    
    expect(output.customers[0].id).toEqual(customer1.id);
    expect(output.customers[0].name).toEqual(customer1.name);
    expect(output.customers[0].address.street).toEqual(customer1.Address.street);
    expect(output.customers[0].address.number).toEqual(customer1.Address.number);
    expect(output.customers[0].address.zipcode).toEqual(customer1.Address.zipcode);
    expect(output.customers[0].address.city).toEqual(customer1.Address.city);

    expect(output.customers[1].id).toEqual(customer2.id);
    expect(output.customers[1].name).toEqual(customer2.name);
    expect(output.customers[1].address.street).toEqual(customer2.Address.street);
    expect(output.customers[1].address.number).toEqual(customer2.Address.number);
    expect(output.customers[1].address.zipcode).toEqual(customer2.Address.zipcode);
    expect(output.customers[1].address.city).toEqual(customer2.Address.city);

    expect(output.customers[2].id).toEqual(customer3.id);
    expect(output.customers[2].name).toEqual(customer3.name);
    expect(output.customers[2].address.street).toEqual(customer3.Address.street);
    expect(output.customers[2].address.number).toEqual(customer3.Address.number);
    expect(output.customers[2].address.zipcode).toEqual(customer3.Address.zipcode);
    expect(output.customers[2].address.city).toEqual(customer3.Address.city);
  })
})