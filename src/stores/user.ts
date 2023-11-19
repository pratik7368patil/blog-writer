import { ID } from "appwrite";
import { account } from "./../db/index";
import { reactive } from "vue";

export const user: any = reactive({
  current: null as any,
  async init() {
    if (this.current) return this.current;
    try {
      this.current = await account.get();
    } catch (e) {
      this.current = null;
    }
    return this.current;
  },
  async register(email: string, password: string) {
    await account.create(ID.unique(), email, password);
    await this.login(email, password);
  },
  async login(email: string, password: string) {
    await account.createEmailSession(email, password);
  },
  async logout() {
    await account.deleteSession("current");
    this.current = null;
  },
});
