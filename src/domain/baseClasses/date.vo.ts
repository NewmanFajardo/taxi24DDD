export class DateValueObject {
  private _value: Date;

  constructor(value: Date) {
    const date = new Date(value);
    this._value = date;
  }

  public get value(): Date {
    return this._value;
  }
}
