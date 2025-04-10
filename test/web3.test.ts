// testScript.ts
import { 
  getChainId, 
  getOwner, 
  totalSupply, 
  balanceOf, 
  transfer,
  approve,
  allowance,
  transferFrom
} from '../web3/web3';

async function test() {
  try {
    const owner = await getOwner();
    const secondAccount = '0x129894956765753454edcEA6E7a2AC7f059A6Af1';
    
    console.log('Owner Address:', owner.address);
    console.log('Second Account:', secondAccount);

    // 1. 두 번째 계정의 잔액 확인
    const secondAccountBalance = await balanceOf(secondAccount);
    console.log('Second Account Balance:', secondAccountBalance);

    // 2. 소유자에서 두 번째 계정으로 토큰 전송
    const transferAmount = 100;
    console.log(`\nTransferring ${transferAmount} tokens from owner to second account...`);
    const transferTx = await transfer(owner.address, secondAccount, transferAmount);
    console.log('Transfer Transaction:', transferTx);

    // 3. 전송 후 두 번째 계정의 잔액 확인
    const newSecondAccountBalance = await balanceOf(secondAccount);
    console.log('New Second Account Balance:', newSecondAccountBalance);

    // 4. 두 번째 계정이 소유자에게 토큰 사용 권한 부여
    const approveAmount = 50;
    console.log(`\nSecond account approving ${approveAmount} tokens to owner...`);
    const approveTx = await approve(owner.address, approveAmount);
    console.log('Approve Transaction:', approveTx);

    // 5. 승인된 토큰 양 확인
    const allowedAmount = await allowance(secondAccount, owner.address);
    console.log('Allowed Amount:', allowedAmount);

  } catch (error) {
    console.error('Error:', error);
  }
}

test();