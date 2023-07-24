import Notification from "./notification";

describe("Notification", () => {
  it("should create errors", async () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer"
    }

    notification.addError(error);

    expect(notification.messages("customer")).toBe("customer: error message");

    const error2 = {
      message: "error message2",
      context: "customer"
    }

    notification.addError(error2);

    expect(notification.messages("customer")).toBe("customer: error message, customer: error message2");

    const error3 = {
      message: "error message3",
      context: "order"
    }

    notification.addError(error3);

    expect(notification.messages("customer")).toBe("customer: error message, customer: error message2");

    expect(notification.messages()).toBe("customer: error message, customer: error message2, order: error message3");
  })

  it("should check if notification has at least one error", async () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer"
    }

    notification.addError(error);

    expect(notification.hasErrors()).toBe(true);
  })

  it("should get all errors from context customer", async () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer"
    }
    notification.addError(error);

    const error2 = {
      message: "error message",
      context: "order"
    }
    notification.addError(error2);

    const errors = notification.listErrors("customer")

    expect(errors.length).toBe(1);
    expect(errors[0].message).toBe('error message');
    expect(errors[0].context).toBe('customer');
  })

  it("should get all errors", async () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer"
    }
    notification.addError(error);

    const error2 = {
      message: "error message",
      context: "order"
    }
    notification.addError(error2);

    const errors = notification.listErrors()

    expect(errors.length).toBe(2);
    expect(errors[0].message).toBe('error message');
    expect(errors[0].context).toBe('customer');
    
    expect(errors[1].message).toBe('error message');
    expect(errors[1].context).toBe('order');
  })
});