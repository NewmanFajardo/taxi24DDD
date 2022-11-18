import { Column, Model, PrimaryKey, Table, HasMany } from 'sequelize-typescript';
import { TravelEntity } from './travel.entity';

@Table({ tableName: 'drivers', timestamps: false })
export class DriverEntity extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  dni: number;

  @Column
  address: string;

  @Column
  phoneNumber: number;

  @HasMany(() => TravelEntity, 'driver_id')
  travels: TravelEntity[];
}
