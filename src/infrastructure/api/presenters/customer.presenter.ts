import { toXML } from "jstoxml";
import { OutputListCustomerDto } from "../../../usecase/customer/list/list.customer.dto";

export default class CustomerPresenter {
  static listXML(data: OutputListCustomerDto): string {
    const xmlOptions = {
      indent: " ",
      header: true,
      newLine: "\n",
      allowEmpty: true
    }

    return toXML({
      customers: data.customers.map(customer => {
        return {
            customer: {
              id: customer.id,
              name: customer.name,
              address: {
                street: customer.address.street,
                number: customer.address.number,
                zipcode: customer.address.zipcode,
                city: customer.address.city
              }
            }
          }
      })
    }, xmlOptions);
  }
}