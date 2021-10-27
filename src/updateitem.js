"use strict";

const AWS = require("aws-sdk");

const updateItem = async (event) => {

    const {id} = event.pathParameters;
    const {itemStatus} = JSON.parse(event.body);
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    try{

        await dynamoDB.update({
           TableName: "ItemTableNew" ,
           Key: {id} ,
           UpdateExpression: "set itemStatus = :itemStatus" ,
           ExpressionAttributeValues: {
               ':itemStatus' : itemStatus 
           },
           ReturnValues: "ALL_NEW"
        }).promise();

    }catch(error){
        console.log(error);
        return {
            statusCode: 400 , 
            body: JSON.stringify({msg:`Cannot update item with id ${id}`}) ,
        };
    }

    return {
        statusCode: 200 , 
        body: JSON.stringify({msg:`Item with id ${id} updated`})
    };

};

module.exports = {
    handler:updateItem
};