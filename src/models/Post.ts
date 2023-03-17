import User from "./User";

export default class Post {

  public id: number;
  public title: string;
  public body: string;
  public userId?: User['id'];
  public user?: User;
  
  constructor(post: Post) {
    this.id = post.id;
    this.title = post.title;
    this.body = post.body;

    if (post.userId)
      this.userId = post.userId;

    if (post.user)
      this.user = post.user;
  }

}
