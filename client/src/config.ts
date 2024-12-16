import dotenv from 'dotenv';
dotenv.config();

export const CONTRACT_ADDRESSES: {
  migration: string;
  election: string;
} = {
  migration: process.env.MIGRATION_CONTRACT_ADDRESS || '',
  election: process.env.ELECTION_CONTRACT_ADDRESS || '',
};
