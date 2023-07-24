import Address from "./value-object/address";
import Customer from "./customer";

describe('Customer', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      let customer = new Customer('', 'Edu Zaghi');
    }).toThrowError("customer: Id is required");
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      let customer = new Customer('123', '');
    }).toThrowError("customer: Name is required");
  })

  it('should throw error when name and id is empty', () => {
    expect(() => {
      let customer = new Customer('', '');
    }).toThrowError("customer: Name is required, customer: Id is required");
  })

  it('should change name', () => {
    let customer = new Customer('123', 'Edu Zaghi');
    
    customer.changeName('Edu Oliveira');
    
    expect(customer.name).toBe('Edu Oliveira');
  })

  it('should activate', () => {
    const customer = new Customer('123', 'Edu Zaghi');
    const address = new Address('Rua Visconde de Cairu', 134, '03110-040', 'São Paulo');
    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  })

  it('should deactivate', () => {
    const customer = new Customer('123', 'Edu Zaghi');

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  })

  it('should throw error when address is undefined', () => {
    expect(() => {
      const customer = new Customer('123', 'Edu Zaghi');
      customer.activate()
    }).toThrow('Address is required');
  })

  it('should add reward points', () => {
    const customer = new Customer('123', 'Edu Zaghi');
    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  })
})