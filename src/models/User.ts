export default class User {

  public id: number;
  public name: string;
  public phone: string;
  public username: string;
  public website: string;

  public address: {
    city: string;
    street: string;
    suite: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };

  public company: {
    bs: string;
    catchPhrase: string;
    name: string;
  };

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.phone = user.phone;
    this.username = user.username;
    this.website = user.website;
    this.address = user.address;
    this.company = user.company;
  }
  
}
