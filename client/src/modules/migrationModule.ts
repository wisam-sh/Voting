import Web3 from 'web3';
import MigrationABI from '../contracts/Migration.json';
import { CONTRACT_ADDRESSES } from '../config';

let web3;
if (typeof window !== 'undefined' && typeof (window as any).ethereum !== 'undefined') {
  web3 = new Web3((window as any).ethereum);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}

const migrationContract = new web3.eth.Contract(MigrationABI.abi, CONTRACT_ADDRESSES.migration);

export const MigrationModule = {
  getLastCompletedMigration: async (): Promise<number> => {
    const lastCompleted: number = await migrationContract.methods.last_completed_migration().call();
    return lastCompleted;
  },
  setCompleted: async (completed: boolean): Promise<void> => {
    const accounts = await web3.eth.getAccounts();
    await migrationContract.methods.setCompleted(completed).send({ from: accounts[0] });
  },
}; 