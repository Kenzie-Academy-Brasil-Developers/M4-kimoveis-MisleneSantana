import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Schedule from './schedules.entity';
import Category from './categories.entity';
import Address from './addresses.entity';

@Entity('real_estate')
class RealEstate {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'boolean', default: false, nullable: true })
  sold: boolean;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0, nullable: true })
  value: number | string;

  @Column({ type: 'integer' })
  size: number;

  @CreateDateColumn({ type: 'date' })
  createdAt: string;

  @UpdateDateColumn({ type: 'date' })
  updatedAt: string;

  @OneToMany(() => Schedule, (schedule) => schedule.realEstate)
  schedules: Array<Schedule>;

  @ManyToOne(() => Category, (category) => category.realEstate)
  category: Category;

  @OneToOne(() => Address, (address) => address.realEstate)
  @JoinColumn()
  address: Address;
}

export default RealEstate;
