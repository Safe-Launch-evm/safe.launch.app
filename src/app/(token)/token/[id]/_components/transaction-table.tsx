'use client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { transactions } from '@/config/site-config';
import { Token } from '@/types';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useLazyQuery,
  gql
} from '@apollo/client';
import { timeAgo } from '@/lib/utils';

const GET_ALL_TOKEN_SWAPS = gql`
  query GetAllTokenSwaps($tokenAddress: String!) {
    tokenSwaps(filter: { token: { equalTo: $tokenAddress } }, orderBy: TIMESTAMP_DESC) {
      nodes {
        id
        token
        txnType
        amount
        fee
        timestamp
        user
      }
    }
  }
`;
export default function TransactionTable({ token }: { token: Token }) {
  const [getTokenSwaps, { loading, error, data }] = useLazyQuery(GET_ALL_TOKEN_SWAPS);

  useEffect(() => {
    if (token) {
      getTokenSwaps({ variables: { tokenAddress: token?.contract_address } });
    }
    console.log(data?.tokenSwaps?.nodes, 'Transaction');
  }, [token, getTokenSwaps, data]);

  return (
    <section className="w-full py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">From</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>To</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data && data?.tokenSwaps?.nodes.length === 0 && (
            <p>No swaps found for this token.</p>
          )}
          {data &&
            data?.tokenSwaps?.nodes.length > 0 &&
            data?.tokenSwaps?.nodes.map((transaction: any) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.token}</TableCell>
                <TableCell>{transaction.txnType}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.user}</TableCell>
                <TableCell className="text-right">{timeAgo(transaction.timestamp)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </section>
  );
}
