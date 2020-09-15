import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Restaurant from '@entity/Restaurant'
import { IsString } from 'class-validator'

@Entity('chef')
class Chef {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column('text')
  @IsString()
  public name: string

  @OneToMany((type) => Restaurant, (restaurant) => restaurant.chef)
  public restaurants: Restaurant[]
}

export default Chef
