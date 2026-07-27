export default interface UserProfile {
  createdAt: string;
  email: string;
  fileUrl: string;
  id: number;
  password: string;
  role: "user" | "admin";
  username: string;
}
