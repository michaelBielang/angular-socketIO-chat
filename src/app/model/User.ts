export class User {

  private _email: String;
  private _username: String;

  constructor(email: String, username: String) {
    this._email = email;
    this._username = username;
  }

  get email(): String {
    return this._email;
  }

  set email(value: String) {
    this._email = value;
  }

  //TODO
  get username(): String {
    return this._username;
  }

  //TODO
  set username(value: String) {
    this._username = value;
  }
}
