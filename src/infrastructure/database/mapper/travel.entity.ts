import { Column, Model, PrimaryKey, Table, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { DriverEntity } from './driver.entity';
import { PassengerEntity } from './passenger.entity';

@Table({ tableName: 'travels', timestamps: false })
export class TravelEntity extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  status: string;

  @BelongsTo(() => PassengerEntity, {
    foreignKey: 'passenger_id',
    targetKey: 'id'
  })
  passenger: PassengerEntity;

  @BelongsTo(() => DriverEntity, {
    foreignKey: 'driver_id',
    targetKey: 'id'
  })
  driver: DriverEntity;
}
