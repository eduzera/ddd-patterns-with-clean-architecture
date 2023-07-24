import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.error';
import Address from './value-object/address';

export default class Customer extends Entity {
  _name: string;
  _address!: Address;
  _active: boolean = false;
  _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();
  }

  validate() {
    if(this._name.length === 0) {
      this.notification.addError({
        context: 'customer',
        message: 'Name is required'
      })
    }
    if(this.id.length === 0) {
      this.notification.addError({
        context: 'customer',
        message: 'Id is required'
      })
    }

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.listErrors("customer"));
    }
  }

  get name(): string {
    return this._name;
  }

  get Address(): Address {
    return this._address;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  set Address(address: Address) {
    this._address = address;
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  activate() {
    if(this._address === undefined) {
      throw new Error('Address is required');
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  isActive(): boolean {
    return this._active;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}