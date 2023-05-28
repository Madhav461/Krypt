//https://eth-mainnet.g.alchemy.com/v2/_ihCwZTzfUB8KdsFdqKr_-gcDh3LAx6Q

require('@nomiclabs/hardhat-waffle');

module.exports={
  solidity:'0.8.0',
  networks:{
    goerli:{
      url:'https://eth-mainnet.g.alchemy.com/v2/_ihCwZTzfUB8KdsFdqKr_-gcDh3LAx6Q',
      accounts:['3a61cbda422ded70181a3648748333158c35e34ffa8181ccac7ad1985a655da5']
    },
    sepolia:{
      url:'https://eth-sepolia.g.alchemy.com/v2/0FrIDXKNxFyqk350u9J7EAZL8p27GrtT',
      accounts:['3a61cbda422ded70181a3648748333158c35e34ffa8181ccac7ad1985a655da5'],
    }

  }
}