import {User} from './User';
import {Restaurant} from './Restaurant';

export class Owner extends User {

  constructor(
    public id: number = null,
    public username: string = '',
    public password: string = '',
    public email: string = '',
    public avatar: string = '',
    public restaurants: Restaurant [] = []
  ) {
    super(id, username, password, email, avatar);
  }


}
