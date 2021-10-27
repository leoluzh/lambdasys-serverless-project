"use strict";

const AWS = require("aws-sdk");

const deleteItem = async (event) => {
    
    const {id} = event.pathParameters;
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    try{

        await dynamoDB.delete({
            TableName: "ItemTableNew" ,
            Key: {id} ,
        }).promise();

    }catch(error){
        console.log(error);
        return {
            statusCode: 400 , 
            body: JSON.stringify({msg:`Cannot delete item with id ${id}`})
        };
    }

    return {
        statusCode: 200 , 
        body: JSON.stringify({msg:`Item with id ${id} deleted.`})
    };
    
};

module.exports = {
    handler:deleteItem
};