import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { UserRoles } from '../entity/enum/roles.enum';
import { Length } from 'class-validator';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Length(3, 20)
  name: string;

  @Column({ unique: true })
  @Length(4, 20)
  username: string;

  @Column({ select: false })
  @Length(5, 20)
  password: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.VIEWER,
  })
  role: UserRoles;

  @CreateDateColumn({ type: 'timestamp', select: false })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedDate: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password =
          this.password.length < 60
            ? await bcrypt.hash(this.password, 10)
            : this.password;
      } catch (e) {
        throw new InternalServerErrorException(
          'There is some wrong in the hash',
          e.message,
        );
      }
    }
  }
}
