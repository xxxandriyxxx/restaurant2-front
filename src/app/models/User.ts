export class User {

  constructor(
    public id: number = null,
    public username: string = '',
    public password: string = '',
    public email: string = '',
    public avatar: string = '',
    // public role: string = '', // !!!!!!!!
    // public isAccountNonExpired: boolean = false,
    // public isAccountNonLocked: boolean = false,
    // public isCredentialsNonExpired: boolean = false,
    // public isEnabled: boolean = false
  ) {
  }
}
