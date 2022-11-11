console.log("Hello JS");
let contract = {};
const itemTemplate = document.getElementById("itemTemplate");
const addItemBtn = document.querySelector(".btn_add");
const buyBtn = document.querySelector(".buy_btn");

// document.querySelector('.buy_btn').disabled=true;

async function displayItem() {
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // console.log(provider);

  // MetaMask requires requesting permission to connect users accounts
  await provider.send("eth_requestAccounts", []);

  // The MetaMask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, you need the account signer...
  const signer = provider.getSigner();
  let addressOfUser = await signer.getAddress();
  document.getElementById(
    "wallet"
  ).innerHTML = `Address Of User is: ${addressOfUser}`;
  const resourceAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const response = await fetch(
    "../artifacts/contracts/BasicMarketPlace.sol/basicMarketPlace.json"
  );
  const basicMarketPlaceArtifact = await response.json();
  console.log(basicMarketPlaceArtifact);
  let getJson = function () {
    contract = new ethers.Contract(
      resourceAddress,
      basicMarketPlaceArtifact.abi,
      signer
    );
  };
  getJson();
  console.log(contract);
  contract.getProduct(0).then((data) => console.log(data));

  contract.getProducts().then((data) => {
    console.log(data);
    let html = "";
    data.forEach((element) => {
      // if(element.isSold){
      //     buyBtn.disabled=true;
      // }
      html += ` <div class="card">
       <div class="container">
         <strong>Item Name</strong>: <span class="itemName">${
           element.itemName
         }</span> <br />
         <strong>Item Creater</strong>: <span class="itemCreater">${
           element.creator
         }</span>
         <br />
         <strong>Item Owner</strong>: <span class="itemOwner">${
           element.owner
         }</span> <br />
         <strong>Asking Price</strong>: <span class="askingPrice">${
           element.askingPrice
         }</span>
         <br />
         <strong>Item Status</strong>: <span class="itemStatus"> ${
           element.isSold ? "Sold" : "Available"
         }</span>
         <br />
         <button type="button"  class="buy_btn ${
           element.isSold ? "" : "btn"
         }" data-id=${element.id}  ${element.isSold ? "disabled" : ""}>${
        element.isSold ? "Sold" : "Buy"
      }</button>
       </div>
     </div>`;
    });
    itemTemplate.innerHTML = html;
    const buyButtons = document.querySelectorAll(".buy_btn");

    const buyNow = (e) => {
      let id = e.target.getAttribute("data-id"); // Get ID of Clicked Element
      contract.sellProduct(id);
    };

    for (let button of buyButtons) {
      button.addEventListener("click", buyNow);
    }
  });
}
displayItem();

// let buyNow = () => {
//   let id = document.querySelector(".buy_btn");
// };
async function addItem() {
  let newItemName = document.getElementById("new_itemName").value;
  let new_askingPrice = document.getElementById("new_askingPrice").value;
  console.log(newItemName, new_askingPrice);
  await contract.addProduct(newItemName, new_askingPrice);
}
