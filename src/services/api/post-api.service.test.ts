import Post from "../../models/Post";
import PostApiService from "./post-api.service";

describe("PostApiService", () => {
  let postApiService: PostApiService;

  beforeEach(() => {
    postApiService = new PostApiService();
  });

  describe("getAll", () => {
    it("should return an array of posts", async () => {
      const posts: Post[] = await postApiService.getAll();
      expect(posts).toBeDefined();
      expect(posts.length).toBeGreaterThan(0);
      expect(posts[0]).toBeInstanceOf(Post);
    });
  });

  describe("create", () => {
    it("should create a new post and return it", async () => {
      const newPost: Partial<Post> = {
        title: "New Post Title",
        body: "New Post Body",
        userId: 1,
      };

      const createdPost: Post = await postApiService.create(newPost);
      expect(createdPost).toBeDefined();
      expect(createdPost.title).toBe(newPost.title);
      expect(createdPost.body).toBe(newPost.body);
      expect(createdPost.userId).toBe(newPost.userId);
      expect(createdPost.id).toBeDefined();
    });
  });

  describe("updateById", () => {
    it("should update an existing post and return it", async () => {
      const existingPost: Post = {
        id: 1,
        title: "Existing Post Title",
        body: "Existing Post Body",
        userId: 1,
      };

      const updatedPostData: Partial<Post> = {
        title: "Updated Post Title",
        body: "Updated Post Body",
      };

      const updatedPost: Post = await postApiService.updateById(
        existingPost.id,
        updatedPostData
      );

      expect(updatedPost).toBeDefined();
      expect(updatedPost.title).toBe(updatedPostData.title);
      expect(updatedPost.body).toBe(updatedPostData.body);
      expect(updatedPost.userId).toBe(existingPost.userId);
      expect(updatedPost.id).toBe(existingPost.id);
    });
  });

  describe("deleteById", () => {
    it("should delete an existing post", async () => {
      const existingPost: Post = {
        id: 1,
        title: "Existing Post Title",
        body: "Existing Post Body",
        userId: 1,
      };

      await postApiService.deletebyId(existingPost.id);

      try {
        await postApiService.getById(existingPost.id);
      } catch (error: any) {
        expect(error.response.status).toBe(404);
      }
    });
  });
});