import { Web3 } from 'web3';
import { abi, address as contractAddress } from '../abis/Mytoken.json'; // Todo: 배포먼저 실행해주세요. (npm run deploy)
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const web3 = new Web3('https://public-en-kairos.node.kaia.io'); 
const privateKey = process.env.PRIVATE_KEY_GANACHE || '';

export const getChainId = async () => {

  return web3.eth.net.getId();
};

export const getWeb3 = async () => {
  return web3;
};

export const getOwner = async () => {
  // Contract의 Owner를 리턴합니다.
  return web3.eth.accounts.privateKeyToAccount(privateKey);
};
/*
    위의 코드들은 지우지 않습니다.
    
    abi : Mytoken Contract의 ABI 데이터
    contractAddress : Mytoken Contract의 Address
    privateKey : .env 파일에 설정된 가나슈 계정의 프라이빗 키
*/

export const getContract = () => {
  // Todo: MyToken Contract 인스턴스를 리턴합니다. - new web3.eth.Contract(ABI, 컨트랙트 주소);
  // 이 후에 구현하는 컨트랙트 호출은 구현한 getContract를 사용합니다.

  return new web3.eth.Contract(abi, contractAddress);
};

export const totalSupply = async () => {
  // Todo: MyToken의 totalSupply 리턴 값을 리턴합니다.
  const contract = getContract();
  const totalSupply = await contract.methods.totalSupply().call();
  return totalSupply;
};

export const balanceOf = async (address: string) => {
  // Todo: 인자 address의 balanceOf 리턴 값을 리턴합니다.

  const balance = await getContract().methods.balanceOf(address).call();
  return balance;
};

export const transfer = async (from: string, to: string, amount: number) => {
  const contract = await getContract();
  const transfer = await contract.methods.transfer(to, amount).send({ from });
  return transfer;
};

export const approve = async (spender: string, amount: number) => {
  const owner = await getOwner();
  const approve = await getContract().methods.approve(spender, amount).send({ from: owner.address });
  return approve;
};

export const allowance = async (owner: string, spender: string) => {
  const contract = getContract();
  const allowance = await contract.methods.allowance(owner, spender).call();
  return allowance;
};

export const transferFrom = async (
  spender: string,
  from: string,
  to: string,
  amount: number
) => {
 
  return await getContract()
  .methods.transferFrom(from, to, amount)
  .send({ from: spender });
};
