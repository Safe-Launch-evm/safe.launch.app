import client from '../client';
import { setCookieStorage } from '../cookie-storage';
import { Request } from '../http';

export async function getUser({ address }: { address: string }) {
  try {
    const user = await client(`/user/${address}`, 'user');
    // console.log('ser', user);
    return { user: user.data.data };
  } catch (error) {
    return { user: null };
  }
}

export async function getNonce({ address }: { address: string }) {
  try {
    const nonce = await client('/auth/get-nonce', { walletAddress: address }, 'nonce');
    return nonce;
  } catch (error) {
    return null;
  }
}

export async function verifyNonce({ address, sig }: { address: string; sig: string }) {
  try {
    const nonce: any = await client(
      '/auth/verify-nonce',
      { walletAddress: address, signature: sig },
      'nonce'
    );
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
