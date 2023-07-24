import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
  name: 'Eduardo',
  address: {
    street: 'Street',
    number: 1,
    zipcode: 'zip',
    city: 'city'
  }
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  };
}

describe('Unit test for Create Customer UseCase', () => {

  it('should create a customer', async () => {
    const repository = MockRepository();
    const usecase = new CreateCustomerUseCase(repository);

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zipcode: input.address.zipcode,
        city: input.address.city
      }
    })
  })

  it('should throws an error when repository throws an error', async () => {
    const repository = MockRepository();
    repository.create.mockImplementationOnce(() => {
      throw new Error('Name is required');
    })
    input.name = '';
    const usecase = new CreateCustomerUseCase(repository);

    await expect(usecase.execute(input)).rejects.toThrowError('customer: Name is required');
  })
})