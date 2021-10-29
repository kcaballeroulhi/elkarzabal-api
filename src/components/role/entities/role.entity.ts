import { User } from 'src/components/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Role {
  //PROPERTIES______________________________________________________________________________________
  @PrimaryColumn({ name: 'id' })
  private _id: number;

  @Column({ name: 'name', length: 15 })
  private _name: string;

  //FOREIGN KEYS____________________________________________________________________________________
  @OneToMany(() => User, (user) => user.role)
  Users: User[];

  //METHODS_________________________________________________________________________________________
  /**
   * Getter id
   * @return {number}
   */
  public get id(): number {
    return this._id;
  }

  /**
   * Getter name
   * @return {string}
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Setter name
   * @param {string} value
   */
  public set name(value: string) {
    this._name = value;
  }
}
