import { PostRequest } from './post-request.dto';

export interface PatchRequest extends Partial<PostRequest> {}
