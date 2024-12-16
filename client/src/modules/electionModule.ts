import Web3 from 'web3';
import ElectionABI from '../contracts/Election.json';
import { CONTRACT_ADDRESSES } from '../config';

const web3 = new Web3((window as any).ethereum);
const electionContract = new web3.eth.Contract(ElectionABI.abi, CONTRACT_ADDRESSES.election);

export const ElectionModule = {
  createElection: async (title: string, startTime: number, endTime: number): Promise<void> => {
    const accounts = await web3.eth.getAccounts();
    await electionContract.methods.createElection(title, startTime, endTime).send({ from: accounts[0] });
  },
  addCandidate: async (electionId: number, candidateId: number, name: string, description: string, imageURL: string): Promise<void> => {
    const accounts = await web3.eth.getAccounts();
    await electionContract.methods.addCandidate(electionId, candidateId, name, description, imageURL).send({ from: accounts[0] });
  },
  vote: async (electionId: number, candidateId: number): Promise<void> => {
    const accounts = await web3.eth.getAccounts();
    await electionContract.methods.vote(electionId, candidateId).send({ from: accounts[0] });
  },
  pauseElection: async (electionId: number): Promise<void> => {
    const accounts = await web3.eth.getAccounts();
    await electionContract.methods.pauseElection(electionId).send({ from: accounts[0] });
  },
  resumeElection: async (electionId: number): Promise<void> => {
    const accounts = await web3.eth.getAccounts();
    await electionContract.methods.resumeElection(electionId).send({ from: accounts[0] });
  },
  getElectionResults: async (electionId: number): Promise<any> => {
    const results = await electionContract.methods.getElectionResults(electionId).call();
    return results;
  },
  register: async (electionId: number, voterNationalId: string): Promise<void> => {
    const accounts = await web3.eth.getAccounts();
    await electionContract.methods.register(electionId, voterNationalId, accounts[0]).send();
  },
  checkVoterStatus: async (voterNationalId: string, electionId: number): Promise<boolean> => {
    const hasVoted = await electionContract.methods.hasVoted(voterNationalId, electionId).call();
    return !hasVoted;
  },
}; 