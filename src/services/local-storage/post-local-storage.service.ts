import Post from "../../models/Post";
import LocalStorageService from "./local-storage.service";

export default class PostLocalStorageService extends LocalStorageService {

  constructor() {
    super('posts');
  }

  /**
   * Returns the array of posts stored in the localStorage.
   * 
   * @returns Post[]
   */
  public getAll(): Post[] {
    const posts = this.getItem<Post[]>();
    return posts ?? [];
  }

  /**
   * Returns the post with the specified id stored in the localStorage.
   * Returns null if the post wasn't found.
   * 
   * @param id Post['id']
   * @returns Post | null
   */
  public getById(id: Post['id']): Post | null {
    const posts = this.getAll();
    const post = posts.find((post: Post) => post.id === id);

    return post ?? null;    
  }

  /**
   * Returns the last post stored in the localStorage.
   * Returns null if the array is empty.
   * 
   * @returns Post | null
   */
  public getLast(): Post | null {
    const posts = this.getAll();
    return posts.pop() ?? null;
  }

  /**
   * Store the given posts in the localStorage.
   * If the store is empty => store without any change.
   * If the store had posts => store with autoincrementing the post id.
   * 
   * @param ...posts Post[]
   * @returns void
   */
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

  /**
   * Update the given post stored in the localStorage.
   * Returns true on success.
   * Returns false if the post wasn't found in the localStorage.
   * 
   * @param post Post
   * @returns boolean
   */
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

  /**
   * Delete a post stored in the localStorage using the given id.
   * Returns true on success.
   * Returns false if the post wasn't found in the localStorage.
   * 
   * @param id Post['id']
   * @returns boolean
   */
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