import { DriverSaveCommand } from "../../application/driver/save/driver.save.command";
import { Driver } from "../driver.domain";

export interface DriverRepository {
  findAll(limit: number, offset: number): Promise<Driver[]>;
  findOne(id: number): Promise<Driver>;
  save(passenger: DriverSaveCommand): Promise<Driver>;
}
