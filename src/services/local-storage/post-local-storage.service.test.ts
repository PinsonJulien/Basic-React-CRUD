import Post from "../../models/Post";
import PostApiService from "../api/post-api.service";
import PostLocalStorageService from "./post-local-storage.service";

describe("PostLocalStorageService", () => {
  const postLocalStorageService = new PostLocalStorageService();
  const postApiService = new PostApiService();

  const post = new Post({
    id: 1,
    title: '',
    body: '',
    userId: null
  });

  afterEach(() => {
    localStorage.removeItem(postLocalStorageService.getKey());
  });

  describe("getLast", () => {
    it("should return null if the storage isn't set", () => {
      localStorage.removeItem(postLocalStorageService.getKey());
      expect(postLocalStorageService.getLast()).toBe(null);
    });

    it("should return null if the storage is empty", () => {
      postLocalStorageService.add(post);
      postLocalStorageService.delete(post.id);

      expect(postLocalStorageService.getLast()).toBe(null);
    });

    it("should return the last value of the storage", () => {
      postLocalStorageService.add(post);
      postLocalStorageService.add({...post, id: 2});

      expect(postLocalStorageService.getLast()!.id).toEqual(2);
    }); 
  });

  describe("getAll", () => {
    it("should return an empty array when no posts have been added", () => {
      expect(postLocalStorageService.getAll()).toEqual([]);
    });

    it("should return all posts that have been added", async () => {
      const postsToAdd: Post[] = await postApiService.getAll();      
      postLocalStorageService.add(...postsToAdd);
      expect(postLocalStorageService.getAll()).toEqual(postsToAdd);
    });
  });

  describe("add", () => {
    it("should add array of posts in the list of posts, without changing their id.", () => {
      postLocalStorageService.add(...[
        {...post, id: 5},
        {...post, id: 10}
      ]);

      const posts = postLocalStorageService.getAll();
      expect(posts[0].id).toEqual(5);
      expect(posts[1].id).toEqual(10);
    });

    it("should add a new post to the list of posts, with a incremented id based on the last.", async () => {
      postLocalStorageService.add({...post, id: 5});
      postLocalStorageService.add(post);
      const posts = postLocalStorageService.getAll();
      expect(posts[0].id).toEqual(5);
      expect(posts[1].id).toEqual(6);
    });
  });

  describe("update", () => {
    it("should update an existing post in the list of posts", () => {
      postLocalStorageService.add(post);

      const updatedPost: Post = { ...post, title: "Updated Title" };
      expect(postLocalStorageService.update(updatedPost)).toBe(true);
      expect(postLocalStorageService.getAll()).toEqual([updatedPost]);
    });

    it("should return false when trying to update a post that doesn't exist", () => {
      const postToUpdate: Post = { id: 1, title: "Updated Title", body: "Updated Body", userId: 1 };
      expect(postLocalStorageService.update(postToUpdate)).toBe(false);
      expect(postLocalStorageService.getAll()).toEqual([]);
    });
  });

  describe("delete", () => {
    it("should delete an existing post from the list of posts", () => {
      postLocalStorageService.add(post);

      expect(postLocalStorageService.delete(post.id)).toBe(true);
      expect(postLocalStorageService.getAll()).toEqual([]);
    });

    it("should return false when trying to delete a post that doesn't exist", () => {
      expect(postLocalStorageService.delete(1)).toBe(false);
      expect(postLocalStorageService.getAll()).toEqual([]);
    });
  });
});