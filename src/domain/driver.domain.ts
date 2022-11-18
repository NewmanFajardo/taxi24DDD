import { Address } from './valueobjects/address.vo';
import { DNI } from './valueobjects/DNI.vo';
import { FirstName } from './valueobjects/firstName.vo';
import { ID } from './valueobjects/id.vo';
import { LastName } from './valueobjects/lastName.vo';
import { PhoneNumber } from './valueobjects/phoneNumber.vo';

export class Driver {
  private _id: ID;
  private _firstName: FirstName;
  private _lastName: LastName;
  private _dni: DNI;
  private _address: Address;
  private _phoneNumber: PhoneNumber;

  constructor(
    id: ID,
    firstName: FirstName,
    lastName: LastName,
    dni: DNI,
    address: Address,
    phoneNumber: PhoneNumber
  ) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._dni = dni;
    this._address = address;
    this._phoneNumber = phoneNumber;
  }

  public static fromPrimitives(
    id: number,
    firstName: string,
    lastName: string,
    dni: number,
    address: string,
    phoneNumber: number
  ) {
    return new Driver(
      new ID(id),
      new FirstName(firstName),
      new LastName(lastName),
      new DNI(dni),
      new Address(address),
      new PhoneNumber(phoneNumber)
    );
  }

  public get id(): ID {
    return this._id;
  }

  public set id(id: ID) {
    this._id = id;
  }

  public get firstName(): FirstName {
    return this._firstName;
  }

  public set firstName(firstName: FirstName) {
    this._firstName = firstName;
  }

  public get lastName(): LastName {
    return this._lastName;
  }

  public set lastName(lastName: LastName) {
    this._lastName = lastName;
  }

  public get dni(): DNI {
    return this._dni;
  }

  public set dni(dni: DNI) {
    this._dni = dni;
  }

  public get address(): Address {
    return this._address;
  }

  public set address(address: Address) {
    this._address = address;
  }

  public get phoneNumber(): PhoneNumber {
    return this._phoneNumber;
  }

  public set phoneNumber(phoneNumber: PhoneNumber) {
    this._phoneNumber = phoneNumber;
  }
}
