import { Community } from "@/app/posts/enums/community.enum";

export interface PostRequest {
  title: string;
  content: string;
  community: Community
}
