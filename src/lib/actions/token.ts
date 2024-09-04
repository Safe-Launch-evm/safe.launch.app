import { Token } from '@/types';
import client from '../client';
import { getCookieStorage } from '../cookie-storage';
import { CreateTokenInput } from '../validations/create-token-schema';

export async function uploadLogo(data: FormData) {
  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: data
    });
    return res.json();
  } catch (error) {
    return null;
  }
}

export async function createToken(data: CreateTokenInput) {
  try {
    const token = await getCookieStorage('auth_token');

    const result: any = await client('/tokens', {
      formData: data,
      token,
      tag: 'nonce'
    });

    if (result.error === true) {
      return null;
    }

    return result;
  } catch (error) {
    return null;
  }
}

type FetchTokenResponse = {
  error: boolean;
  data: string;
  code: number;
  result: Token[];
};

export async function fetchToken(): Promise<Token[] | null> {
  try {
    const token = await getCookieStorage('auth_token');
    const tokens: FetchTokenResponse = await client(`/tokens`, {
      token: token,
      tag: 'tokens'
    });
    return tokens.result;
  } catch (error) {
    return [];
  }
}
