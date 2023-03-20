import { ReservationDescriptionProgram } from 'src/reservation-description-program/entity/reservation-description-program.entity';
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ProgramType } from './enum/program.enum';

@Entity('program')
export class Program extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: ProgramType,
  })
  type: ProgramType;

  @CreateDateColumn({ type: 'timestamp', select: false })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedDate: Date;

  @OneToMany(
    () => ReservationDescriptionProgram,
    (programToDescription) => programToDescription.program,
  )
  programsToDescription: ReservationDescriptionProgram[];
}
