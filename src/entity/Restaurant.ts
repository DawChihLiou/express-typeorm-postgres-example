import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Chef from '@entity/Chef'
import Location from '@entity/Location'
import {
  IsInt,
  IsString,
  IsUrl,
  Matches,
  Max,
  Min,
  MinLength,
  NotContains,
  ValidateNested,
} from 'class-validator'
import { IsBadgeAlignedWith } from '@decorators/IsBadgeAlignedWith'

@Entity('restaurant')
class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column('text')
  @IsString()
  @MinLength(10)
  @NotContains('Anger')
  @NotContains('Sadness')
  public name: string

  @Column('int')
  @IsInt()
  @Min(0)
  @Max(5)
  public rating: number

  @Column({
    type: 'text',
    enum: ['fine-dinning', 'street-food', 'casual', 'ethnic', 'family-style'],
  })
  @IsString()
  @Matches(
    /\bfine-dinning\b|\bstreet-food\b|\bcasual\b|\bethnic\b|\bfamily-style\b/,
    {
      message:
        'category can be either fine-dinning, street-food, casual, ethnic, family-style',
    }
  )
  public category: string

  @Column('text')
  @IsUrl()
  public image: string

  @Column('int')
  @IsInt()
  @Min(0)
  @Max(1000)
  public popularity: number

  @Column({ type: 'text', enum: ['awesome', 'meh', 'awf'] })
  @IsString()
  @IsBadgeAlignedWith('popularity', {
    message:
      'popularity badge should be "awf" when popularity <= 300, "meh" when popularity <=700, or "awesome" otherwise.',
  })
  public badge: string

  @Column('int')
  @IsInt()
  @Min(0)
  public availability: number

  @OneToOne((type) => Location, { cascade: true })
  @JoinColumn()
  @ValidateNested()
  public location: Location

  @ManyToOne((type) => Chef, (chef) => chef.restaurants)
  public chef: Chef
}

export default Restaurant
