"use client"
import React, { useState, useEffect } from "react";
import Button from "./controls/Button";
import Input from "./controls/Input";
import { callApi } from "./coreFunctions/functions";
import { FakeStoreApiResponse,FakeStoreItem } from "./definitions/apiDefinitions";
import { productStyles, pageStyles } from "./styles/styles";

interface cartData {
  quantity:number,
  item:FakeStoreItem
}
type cartDataArray = cartData[]
interface productItemProps{
  item:FakeStoreItem
  setCartData:(data:cartDataArray)=>void;
  cartData:cartDataArray|undefined
}
function ProductItem({ item,setCartData,cartData}:productItemProps ) {
  const [quantity, setQuantity] = useState(0);
  console.log(cartData)
  return (
    <div style={productStyles.productContainer}>
      <div title={item.description} style={{top:'0',right:'0',backgroundColor:'lightblue',borderRadius:'5px',display:'flex',position:'absolute'}}>?</div>
      <div style={{paddingBottom:'9px'}}>
      <p style={productStyles.productTitle}>{item.title}</p>
      <p style={productStyles.productPrice}>${item.price}</p>
      <img src={item.image} style={{ width: '100px' }} alt={item.title} />
      </div>
      <div style={productStyles.buttonContainerStyle}>
      
      <div>Quantity: {quantity}</div>
      <Button
        text={"+"}
        onClick={() => {
          setQuantity(quantity + 1);
        }}
        disabled={quantity === 10}
      />
      <Button
        text={"-"}
        onClick={() => {
          setQuantity(quantity - 1);
        }}
        disabled={quantity === 0}
      />
      <Button
        text={"Add to Cart"}
        onClick={() => {
         setQuantity(0)
         if(cartData){
          const foundItem = cartData.find((e,i)=>{if(e.item.id===item.id){
            let newData:cartDataArray=[]
            cartData.forEach(e=>newData.push(e))
            newData[i].quantity=newData[i].quantity+quantity
          }})
          if(foundItem){
          }else{
            setCartData([...cartData,{item:item,quantity:quantity}])
          }
         }else{
          let newData = []
          newData.push({item:item,quantity:quantity})
          setCartData(newData)
         }
         
        }}
        disabled={quantity === 0}
      />
      </div>
    </div>
  );
}

export default function Page() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [searchString, setSearchString] = useState("");
  const [pageData, setPageData] = useState<FakeStoreApiResponse | undefined>(undefined);
  const [filteredPageData, setFilteredPageData] = useState<FakeStoreApiResponse | undefined>(undefined);
  const [cartData,setCartData] = useState<cartDataArray|undefined>(undefined)

  useEffect(() => {
    callApi<undefined, FakeStoreApiResponse>({
      url: 'https://fakestoreapi.com/products',
      method:'get',
      onSuccess: (data) => {
        setPageData(data);
      },
      onFail: (error) => {
        console.log('Failure', error);
      },
    });
  }, []);

  const returnStoreData = () => {
    if (pageData === undefined) {
      return undefined;
    } else if (pageData !== undefined && filteredPageData === undefined) {
      return pageData;
    } else {
      return filteredPageData;
    }
  }
  const totalCart = () =>{
    let total = 0;
    if(cartData){
      cartData.forEach(e=>total=total+e.quantity)
    }
    
    return total
  }
  return (
    <body style={pageStyles.pageContainer}>
      <div style={{display:'flex',justifyContent: 'space-between',alignItems:'center'}}>
      <h1>
        Mock Store
      </h1>
      <img src="https://avatars.githubusercontent.com/u/112432989?v=4" style={{height:'60px'}}></img>
      </div>
      <hr style={pageStyles.lineStyle} />
      <br/>
      <div style={{display:'flex',justifyContent: 'space-between'}}>
        <div>
        <Input
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
          value={searchString}
          style={{paddingRight:'9px'}}
        />
        <Button
          onClick={() => {
            setFilteredPageData(
              pageData
                ? pageData.filter(
                    (item) =>
                      item.title.toLocaleUpperCase().includes(searchString.toLocaleUpperCase())
                  )
                : undefined
            );
          }}
          text={"Search"}
          style={{paddingLeft:'5px'}}
        />
        </div>
        
          Cart Total: {totalCart()}
        
          <div>
          Count Incrementers --&gt;
          <Button
            text={count+''}
            onClick={() => {
              if (count >= 10) {
                setCount(0);
              } else {
                setCount(count + 1);
              }
            }}
            style={{backgroundColor:'white'}}
          />
          <Button
            text={count2+''}
            onClick={() => {
              if (count2 >= 10) {
                setCount2(0);
              } else {
                setCount2(count2+ 2);
              }
            }}
            style={{backgroundColor:'white'}}
          />
        </div>
      </div>
      {Array.isArray(returnStoreData())? (
        <div style={productStyles.allProductWrapper}>
          {returnStoreData().map((item) => (
            <ProductItem key={item.id} item={item} cartData={cartData} setCartData={setCartData} />
          ))}
        </div>
      ) : (
        <div>Welcome, we are loading the store data for you...</div>
      )}
      <hr style={pageStyles.lineStyle} />

      <div style={{display:'flex'}}>
      <a href="https://github.com/Vcvzgbzz/mockStore">Link to This project on GitHub</a>
      </div>
      
    </body>
  );
}
