export class User {

  private _email: String;

  constructor(email: String) {
    this._email = email;
  }

  get email(): String {
    return this._email;
  }

  set email(value: String) {
    this._email = value;
  }
}
