import { Column, Entity, Generated } from 'typeorm';

@Entity('warehouse')
export class Warehouse {
  @Generated()
  id: number;

  @Column()
  ce: number;

  @Column()
  category: string;

  @Column()
  warehouse: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
