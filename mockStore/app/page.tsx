"use client"
import React, { useState, useEffect } from "react";
import Button from "./controls/Button";
import Input from "./controls/Input";
import { callApi } from "./coreFunctions/functions";
import { FakeStoreApiResponse,FakeStoreItem } from "./definitions/apiDefinitions";
import { productStyles, pageStyles } from "./styling/styles";

function ProductItem({ item} ) {
  const [quantity, setQuantity] = useState(0);

  return (
    <div style={productStyles.productContainer}>
      <div title={item.description} style={{top:'0',right:'0',backgroundColor:'lightblue',borderRadius:'5px',display:'flex',position:'absolute'}}>?</div>
      <div style={{paddingBottom:'7px'}}>
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
      </div>
    </div>
  );
}

export default function Page() {
  const [count, setCount] = useState(0);
  const [searchString, setSearchString] = useState("");
  const [pageData, setPageData] = useState<FakeStoreApiResponse | undefined>(undefined);
  const [filteredPageData, setFilteredPageData] = useState<FakeStoreApiResponse | undefined>(undefined);

  useEffect(() => {
    callApi<undefined, FakeStoreApiResponse>({
      url: 'https://fakestoreapi.com/products',
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

  return (
    <body style={pageStyles.pageContainer}>
      <h1>
        Mock Store
      </h1>
      <div>
        <Input
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
          value={searchString}
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
        />
        <Button
          text={count}
          onClick={() => {
            if (count >= 10) {
              setCount(0);
            } else {
              setCount(count + 1);
            }
          }}
        />
      </div>

      {returnStoreData() ? (
        <div style={productStyles.allProductWrapper}>
          {returnStoreData().map((item) => (
            <ProductItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div>Welcome, we are loading the store data for you...</div>
      )}
    </body>
  );
}
