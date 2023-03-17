import Post from "./Post";

describe('Post', () => {
  const mockPost = {
    id: 1,
    title: 'Test post',
    body: 'This is a test post',
    userId: 2,
  };

  const mockUser = {
    id: 2,
    name: 'Test user',
    phone: '123-456-7890',
    username: 'testuser',
    website: 'https://www.testuser.com',
    address: {
      city: 'Test City',
      street: 'Test Street',
      suite: 'Test Suite',
      zipcode: '12345',
      geo: {
        lat: '0',
        lng: '0',
      },
    },
    company: {
      bs: 'Test BS',
      catchPhrase: 'Test Catchphrase',
      name: 'Test Company',
    },
  };

  it('should create a new post object with the correct properties', () => {
    const post = new Post(mockPost);
    expect(post.id).toEqual(1);
    expect(post.title).toEqual('Test post');
    expect(post.body).toEqual('This is a test post');
    expect(post.userId).toEqual(2);
  });

  it('should create a new post object with user property', () => {
    const post = new Post({ ...mockPost, user: mockUser });
    expect(post.user?.id).toEqual(2);
    expect(post.user?.name).toEqual('Test user');
  });

  it('should not have user property when user id is not present', () => {
    const post = new Post({ ...mockPost, userId: undefined });
    expect(post.userId).toBeUndefined();
  });

  it('should not have user property when user is not present', () => {
    const post = new Post({ ...mockPost, user: undefined });
    expect(post.user).toBeUndefined();
  });
});