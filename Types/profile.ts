export default interface UserProfile {
  createdAt: string;
  email: string;
  fileUrl: string;
  id: string;
  password: string;
  role: "user" | "admin";
  username: string;
}
