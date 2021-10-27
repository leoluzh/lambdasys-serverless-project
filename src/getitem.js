"use strict";

const AWS = require("aws-sdk");


const getItems = async(event) => {

    const {id} = event.pathParameters;
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    let item;

    try{
        const result = await dynamoDB.get({
            TableName: "ItemTableNew" , 
            Key: {id}
        }).promise();
        item = result.Item;
    }catch(error){
        console.log(error);
        return {
            statusCode: 400 , 
            body: JSON.stringify({msg:`Cannot fetch item with id ${id}`}) ,

        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(item) ,
    };

};

module.exports = {
    handler:getItems
};