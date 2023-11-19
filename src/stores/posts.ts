import { reactive } from "vue";

export const posts = reactive({
  posts: [] as Array<any>,
  init(posts: Array<any>) {
    this.posts = posts;
  },
  addNewPost(post: any) {
    this.posts.push(post);
  },
  getPosts() {
    return this.posts;
  },
  getPostById(id: string) {
    return this.posts.find(({ $id }: { $id: string }) => $id === id);
  },
  deletePostById(id: string) {
    this.posts = [
      ...this.posts.filter(({ $id }: { $id: string }) => $id !== id),
    ];
  },
});
