import client from '../client';
import { getCookieStorage } from '../cookie-storage';

export const addComment = async (tokenId: string, data: object) => {
  try {
    const token = await getCookieStorage('auth_token');
    const comment = await client(`/token/comments/${tokenId}`, {
      token: token,
      formData: data
    });
    console.log(comment);
    if (comment.code !== 200) {
      return null;
    }
    return comment;
  } catch (error) {
    return null;
  }
};
