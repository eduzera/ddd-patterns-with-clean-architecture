export type NotificationErrorProps = {
  message: string,
  context: string
}

export default class Notification {
  private _errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps) {
    this._errors.push(error);
  }

  messages(context?: string): string {
    if (!context) {
      return this._errors.map(error => `${error.context}: ${error.message}`).join(', ');
    }

    return this._errors
      .filter(error => error.context === context)
      .map(error => `${context}: ${error.message}`)
      .join(', ');
  }

  hasErrors(): boolean {
    return this._errors.length > 0;
  }

  listErrors(context?: string): NotificationErrorProps[] {
    if (!context) {
      return this._errors;
    }
    return this._errors.filter(error => error.context === context);
  }
}