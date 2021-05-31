# Attendance-Portal-Dapp

This Dapp is specially created for attendance purpose which can be used by teachers in school or colleges.
It is devloped using:
  Truffle suit(Local Blockchain),
  React JS(UI),
  Metamask wallet(for signing the transaction),
  Web3.JS(To interact with local ethereum node using HTTP, IPC or Websocket),

Following are the function which teacher can perform using his Dapp:
1. Create a student.
2. Increment attendance for student.
3. View information of particular student.
4. View all student's roll number which are added in the attendance sheet.

Following are the steps to run this Dapp on your local machine:

1. Clone this repository.
2. Run your local blockchain using truffle suit or ganache CLI.
3. Deploy the contracts on local blockchain.
4. Find the address from contractName.json file on which the contract is deployed and put it in the app.js file in client folder(React Application).
5. To run the react application, install all the dependencies present in package.json and run the command- npm run start.
6. Open your localhost in browser such as chrome and firefox. Install the metamask chrome extension and connect your truffle suit with metamask.
7. Make sure you have fake ethers in the account which are provided by truffle suit and are using the account address which was used to deploy the contract in the local ethereum node.
8. Now you are good to go!!
