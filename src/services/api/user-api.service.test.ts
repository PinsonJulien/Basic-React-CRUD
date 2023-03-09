import User from "../../models/User";
import UserApiService from "./user-api.service"

describe("UserApiService", () => {
  let userApiService: UserApiService;

  beforeEach(() => {
    userApiService = new UserApiService();
  });

  describe("getAll", () => {
    it("should return an array of users", async () => {
      const users: User[] = await userApiService.getAll();
      expect(users).toBeDefined();
      expect(users.length).toBeGreaterThan(0);
      expect(users[0]).toBeInstanceOf(User);
    })
  })
})