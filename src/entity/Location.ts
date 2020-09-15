import { IsString, Length } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('location')
class Location {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column('text')
  @IsString()
  public city: string

  @Column('text')
  @IsString()
  public state: string

  @Column('text')
  @IsString()
  public country: string

  @Column('text')
  @IsString()
  @Length(5, 5, {
    message: 'zipCode must have a length of 5',
  })
  public zipCode: string

  @Column('text')
  @IsString()
  public address: string
}

export default Location
