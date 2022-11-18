import { PassengerSaveCommand } from "../../application/passenger/save/passenger.save.command";
import { Passenger } from "../passenger.domain";

export interface PassengerRepository {
  findAll(limit: number, offset: number): Promise<Passenger[]>;
  findOne(id: number): Promise<Passenger>;
  save(passenger: PassengerSaveCommand): Promise<Passenger>;
}
