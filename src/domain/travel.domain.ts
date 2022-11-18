import { Driver } from './driver.domain';
import { Passenger } from './passenger.domain';
import { ID } from './valueobjects/id.vo';
import { Status } from './valueobjects/status.vo';

export class Travel {
  private _id: ID;
  private _status: Status;
  private _passenger: Passenger;
  private _driver: Driver;

  constructor(
    id: ID,
    status: Status,
    passenger: Passenger,
    driver: Driver,
  ) {
    this._id = id;
    this._status = status;
    this._passenger = passenger;
    this._driver = driver;
  }

  public static fromPrimitives(
    id: number,
    status: string,
    passenger: Passenger,
    driver: Driver,
  ) {
    return new Travel(
      new ID(id),
      new Status(status),
      new Passenger(
        passenger.id,
        passenger.firstName,
        passenger.lastName,
        passenger.dni,
        passenger.address,
        passenger.phoneNumber
      ),
      new Driver(
        driver.id,
        driver.firstName,
        driver.lastName,
        driver.dni,
        driver.address,
        driver.phoneNumber
      ),
    );
  }

  public get id(): ID {
    return this._id;
  }

  public set id(id: ID) {
    this._id = id;
  }
  
  public get status(): Status {
    return this._status;
  }

  public set status(status: Status) {
    this._status = status;
  }
  
  public get passenger(): Passenger {
    return this._passenger;
  }

  public set passenger(passenger: Passenger) {
    this._passenger = passenger;
  }
  
  public get driver(): Driver {
    return this._driver;
  }

  public set driver(driver: Driver) {
    this._driver = driver;
  }

}
