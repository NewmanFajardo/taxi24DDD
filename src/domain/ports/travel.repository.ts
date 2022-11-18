import { TravelSaveCommand } from "../../application/travel/save/travel.save.command";
import { Travel } from "../travel.domain";

export interface TravelRepository {
  findOne(id: number): Promise<Travel>;
  findActives(): Promise<Travel[]>;
  findCompleted(): Promise<Travel[]>;
  save(passenger: TravelSaveCommand): Promise<Travel>;
  completed(id: number): Promise<Travel>;
}
