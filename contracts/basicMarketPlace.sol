// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract BasicMarketPlace{
    struct Product{
        uint id;
        string itemName;
        address creator;
        address owner;
        uint askingPrice;
        bool isSold;
    }
    mapping(uint => Product) public products;
    uint8 public numProduct;
    event productSaved(uint8 indexed _productId);
    constructor(){
        numProduct=0;
        addProduct('Pant', 299);
    }
     function addProduct(string memory itemName, uint askingPrice) public{

        Product storage product = products[numProduct];
        product.itemName = itemName;
        product.askingPrice = askingPrice;
        product.id = numProduct;
        product.creator = msg.sender;
        product.owner = msg.sender;
        product.isSold =false;

        products[numProduct ] = Product(numProduct, product.itemName, product.creator, product.owner, product.askingPrice, product.isSold); 
        numProduct++;
     }

     function getProduct(uint productId) public view returns(Product memory){
        return products[productId];
     }
      function getProducts() public view returns(Product[] memory){
        Product[] memory prodList = new Product[](numProduct);
        for(uint i=0;i<numProduct;i++){
            Product storage productN = products[i];
            prodList[i] = productN;
        }
return prodList;

      }
       function sellProduct(uint productId) public returns(bool){
        Product storage product = products[productId];
        require(msg.sender != product.owner, "Owner Can Not Buy The Product");
        product.owner = msg.sender;
        product.isSold = true;
        return true;

       }
}