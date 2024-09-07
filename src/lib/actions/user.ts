import { UserType } from '@/types';
import client from '../client';
import { setCookieStorage } from '../cookie-storage';
import { Request } from '../http';
import { ProfileInput } from '../validations/profile-schema';

export type UserResponse = {
  error: boolean;
  data: string;
  code: number;
  result: UserType[];
};

export async function getUser({ address }: { address: string }): Promise<UserType | null> {
  try {
    const user: UserResponse = await client(`/user/auth/${address}`, { tag: 'user' });
    if (user.code !== 200) {
      return null;
    }
    return user.result[0];
  } catch (error) {
    return null;
  }
}
export async function registerUser(data: ProfileInput) {
  try {
    const user = await client(`/user/register`, { tag: 'user', formData: data });
    if (!user) return user;
    return user;
  } catch (error) {
    return null;
  }
}

export async function getNonce({ address }: { address: string }) {
  try {
    const nonce = await client('/auth/get-nonce', {
      formData: { walletAddress: address },
      tag: 'nonce'
    });
    return nonce;
  } catch (error) {
    return null;
  }
}

export async function verifyNonce({ address, sig }: { address: string; sig: string }) {
  try {
    const nonce: any = await client('/auth/verify-nonce', {
      formData: { walletAddress: address, signature: sig },
      tag: 'nonce'
    });
    if (nonce.code !== 200) {
      return null;
    }
    await setCookieStorage('auth_token', nonce.result.token);
    await setCookieStorage('expires_at', nonce.result.expires_at);
    return nonce;
  } catch (error) {
    return null;
  }
}
