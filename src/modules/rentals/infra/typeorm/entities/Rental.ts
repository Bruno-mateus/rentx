import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { ColumnNumericTransformer } from '../../../../../utils/ColumnNumericTransformer';
import { v4 as uuid } from 'uuid'
@Entity('rentals')
export class Rental {

  @PrimaryColumn()
  id?: string;
  @Column()
  car_id: string;
  @Column()
  user_id: string;
  @Column()
  start_date: Date;
  @Column()
  end_date?: Date;
  @Column()
  expected_return_date: Date;
  @Column('numeric', {
    precision: 7,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  public total: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at?: Date;


  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

