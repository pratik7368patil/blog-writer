import { Client, Databases, ID } from "appwrite";
const projectId = "6559b0b25b08b44fad56";
const dbId = "6559b13d7e11bdb37e8c";
const collectionId = "6559b18e3b603d0f267b";

const client = new Client();
client.headers = {
  ...client.headers,
  "X-Appwrite-Project": projectId,
};
const databases = new Databases(client);

export function initDb() {
  client.setEndpoint("https://cloud.appwrite.io/v1").setProject(projectId);
}

export async function getAllBlogs() {
  try {
    return await databases.listDocuments(dbId, collectionId);
  } catch (error) {
    console.error("Error while fetching all blogs: ", error);
    return [];
  }
}

export async function createNewBlog(payload: any) {
  try {
    return await databases.createDocument(
      dbId,
      collectionId,
      ID.unique(),
      payload
    );
  } catch (error) {
    console.error("Error while creating new blog: ", error);
    return false;
  }
}

export async function updateBlog(blogId: string, payload: any) {
  try {
    return await databases.updateDocument(dbId, collectionId, blogId, payload);
  } catch (error) {
    console.error("Error while updating blog: ", error);
    return false;
  }
}

export async function deleteBlog(blogId: string) {
  try {
    return await databases.deleteDocument(dbId, collectionId, blogId);
  } catch (error) {
    console.error("Error while deleting blog: ", error);
    return false;
  }
}

export async function getBlogById(blogId: string) {
  try {
    return await databases.getDocument(dbId, collectionId, blogId);
  } catch (error) {
    console.error("Error while fetching blog by id: ", error);
    return null;
  }
}
