import User from "./User";

export default class Post {

  public id: number;
  public title: string;
  public body: string;
  public userId: User['id'] | null;
  
  constructor(post: Post) {
    this.id = post.id;
    this.title = post.title;
    this.body = post.body;
    this.userId = post.userId;
  }

}