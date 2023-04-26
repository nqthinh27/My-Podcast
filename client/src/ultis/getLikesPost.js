import { postDataAPI } from "./fetchData";

export async function getLikesPost(postId, token) {
    const res = await postDataAPI('like', null, token)
    if (res) return res.data.liked
}