import Address from '../../../domain/customer/entity/value-object/address';
import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';
import { app, sequelize } from '../express';
import request from 'supertest';

describe("E2E test for customers", () => {
  beforeEach(async () => {
    await sequelize.sync({force: true});
  })

  afterAll(async () => {
    await sequelize.close();
  })

  it("should create a customer", async () => {
    const response = await request(app)
    .post("/customers")
    .send({
      name: "Customer 1",
      address: {
        street: "Street 1",
        number: 1,
        zipcode: "Zipcode 1",
        city: "City 1"
      }
    })

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: "Customer 1",
      address: {
        street: "Street 1",
        number: 1,
        zipcode: "Zipcode 1",
        city: "City 1"
      }
    })
  })

  it("should not create a customer with invalid name", async () => {
    const response = await request(app)
    .post("/customers")
    .send({
      name: ""
    })

    expect(response.status).toBe(500);
  })

  it("should list all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = CustomerFactory.createWithAddress("Edu", new Address("Street 1", 1, "Zipcode 1", "City 1"));
    const customer2 = CustomerFactory.createWithAddress("Shi", new Address("Street 1", 1, "Zipcode 1", "City 1"));
    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const response = await request(app).get("/customers")
    
    expect(response.status).toBe(200);
    expect(response.body.customers.length).toBe(2);
    expect(response.body.customers[0].name).toBe(customer1.name);
    expect(response.body.customers[0].address.street).toBe(customer1.Address.street);
    expect(response.body.customers[0].address.number).toBe(customer1.Address.number);
    expect(response.body.customers[0].address.zipcode).toBe(customer1.Address.zipcode);
    expect(response.body.customers[0].address.city).toBe(customer1.Address.city);
    
    expect(response.body.customers[1].name).toBe(customer2.name);
    expect(response.body.customers[1].address.street).toBe(customer2.Address.street);
    expect(response.body.customers[1].address.number).toBe(customer2.Address.number);
    expect(response.body.customers[1].address.zipcode).toBe(customer2.Address.zipcode);
    expect(response.body.customers[1].address.city).toBe(customer2.Address.city);
  })

  it("should list all customers in XML", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = CustomerFactory.createWithAddress("Edu", new Address("Street 1", 1, "Zipcode 1", "City 1"));
    const customer2 = CustomerFactory.createWithAddress("Shi", new Address("Street 2", 2, "Zipcode 2", "City 2"));
    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const response = await request(app)
    .get("/customers")
    .set("Accept", "application/xml")
    .send()

    expect(response.status).toBe(200);
    expect(response.text).toContain("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
    expect(response.text).toContain(`<customers>`);
    expect(response.text).toContain(`<customer>`);
    expect(response.text).toContain(`<name>Edu</name>`);
    expect(response.text).toContain(`<address>`);
    expect(response.text).toContain(`<street>Street 1</street>`);
    expect(response.text).toContain(`<number>1</number>`);
    expect(response.text).toContain(`<zipcode>Zipcode 1</zipcode>`);
    expect(response.text).toContain(`<city>City 1</city>`);
    expect(response.text).toContain(`</address>`);
    expect(response.text).toContain(`</customer>`);
    expect(response.text).toContain(`<customer>`);
    expect(response.text).toContain(`<name>Shi</name>`);
    expect(response.text).toContain(`<address>`);
    expect(response.text).toContain(`<street>Street 2</street>`);
    expect(response.text).toContain(`<number>2</number>`);
    expect(response.text).toContain(`<zipcode>Zipcode 2</zipcode>`);
    expect(response.text).toContain(`<city>City 2</city>`);
    expect(response.text).toContain(`</address>`);
    expect(response.text).toContain(`</customer>`);
    expect(response.text).toContain(`</customers>`);
  })
});