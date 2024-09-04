export enum STATE_STATUS {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export type Token = {
  unique_id: string;
  id: number;
  description: string;
  total_supply: string;
  contract_address: string;
  creator_id: string;
  name: string;
  symbol: string;
  logo_url: string;
  social_links: string;
  created_at: string;
  updated_at: string;
};
