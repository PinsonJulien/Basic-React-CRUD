import User from './User';

describe('User', () => {
  const mockUser = {
    id: 1,
    name: 'John Doe',
    phone: '1234567890',
    username: 'johndoe',
    website: 'johndoe.com',
    address: {
      city: 'New York',
      street: '123 Main St',
      suite: 'Suite 456',
      zipcode: '12345',
      geo: {
        lat: '40.712776',
        lng: '-74.005974',
      },
    },
    company: {
      bs: 'bs',
      catchPhrase: 'catchPhrase',
      name: 'companyName',
    },
  };

  it('should create a new User instance with all properties', () => {
    const user = new User(mockUser);

    expect(user.id).toBe(mockUser.id);
    expect(user.name).toBe(mockUser.name);
    expect(user.phone).toBe(mockUser.phone);
    expect(user.username).toBe(mockUser.username);
    expect(user.website).toBe(mockUser.website);
    expect(user.address).toEqual(mockUser.address);
    expect(user.company).toEqual(mockUser.company);
  });
});