import Post from "../../models/Post";
import LocalStorageService from "./local-storage.service";

export default class PostLocalStorageService extends LocalStorageService {

  constructor() {
    super('posts');
  }

  public getAll(): Post[] {
    const posts = this.getItem<Post[]>();
    return posts ?? [];
  }

  public getById(id: Post['id']): Post | null {
    const posts = this.getAll();
    const post = posts.find((post: Post) => post.id === id);

    return post ?? null;    
  }

  public getLast(): Post | null {
    const posts = this.getAll();
    return posts.pop() ?? null;
  }

  public add(...posts: Post[]): void {
    const storedPosts = this.getAll();

    // If the storage is empty, insert data as provided.
    if (!storedPosts.length) {
      this.setItem<Post[]>([...posts]);
      return;
    }

    // If the store wasn't empty, we will autoincrement the post id based on the last post.
    const lastPost = [...storedPosts].pop();
    
    let lastPostId = lastPost!.id;
    
    const newPosts = posts.map((post: Post) => {
      lastPostId++;
      
      return { ...post, id: lastPostId };
    });

    this.setItem<Post[]>([...storedPosts, ...newPosts]);
  }

  public update(post: Post): boolean {
    const posts = this.getAll();
    const index = posts.findIndex((p: Post) => p.id === post.id);

    if (index < 0)
      return false;
    
    const newPosts = [...posts];
    newPosts[index] = post;
    this.setItem<Post[]>(newPosts);

    return true;
  }

  public delete(id: Post['id']): boolean {
    const posts = this.getAll();
    const index = posts.findIndex((post: Post) => post.id === id);
    
    if (index < 0)
      return false;
    
    const newPosts = [...posts];
    newPosts.splice(index, 1);
    this.setItem<Post[]>(newPosts);

    return true;
  }

}