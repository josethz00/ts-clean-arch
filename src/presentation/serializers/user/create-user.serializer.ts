import { IInputCreateUserDto } from '@/business/types';
import { IUserStatusEntity } from '@/domain/entities';
import { IsString, IsEmail, IsDDMMYYYY, Required } from '@/shared/validators';
import { AbstractSerializer } from '../abstract.serializer';

class CreateUserSerializer extends AbstractSerializer<IInputCreateUserDto> {
  // @IsMoreThan(3)
  @IsString()
  @Required()
  public username: string;

  @IsEmail()
  @Required()
  public email: string;

  @IsDDMMYYYY()
  @Required()
  public birthday: Date;

  @IsString()
  @Required()
  public password: string;

  // @IsEqualToProp('password')
  @Required()
  public passwordConfirmation: string;

  public userStatus?: IUserStatusEntity;
}

export { CreateUserSerializer };
