// src/lib/dynamodb.js
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.NOTES_TABLE;

// Create a new note
const createItem = async (item) => {
  const params = {
    TableName: tableName,
    Item: item
  };
  
  await dynamodb.put(params).promise();
  return item;
};

// Get a note by ID
const getItem = async (id) => {
  const params = {
    TableName: tableName,
    Key: { id }
  };
  
  const result = await dynamodb.get(params).promise();
  return result.Item;
};

// List all notes
const listItems = async () => {
  const params = {
    TableName: tableName
  };
  
  const result = await dynamodb.scan(params).promise();
  return result.Items;
};

// Update a note by ID
const updateItem = async (id, item) => {
  // Remove any null or undefined properties
  Object.keys(item).forEach(key => {
    if (item[key] === null || item[key] === undefined) {
      delete item[key];
    }
  });
  
  // Create update expression
  const expressionAttributes = {};
  const expressionValues = {};
  const updateExpressions = [];
  
  Object.keys(item).forEach((key, index) => {
    if (key !== 'id') {
      const attributeName = `#attr${index}`;
      const attributeValue = `:val${index}`;
      
      expressionAttributes[attributeName] = key;
      expressionValues[attributeValue] = item[key];
      updateExpressions.push(`${attributeName} = ${attributeValue}`);
    }
  });
  
  const params = {
    TableName: tableName,
    Key: { id },
    UpdateExpression: `SET ${updateExpressions.join(', ')}`,
    ExpressionAttributeNames: expressionAttributes,
    ExpressionAttributeValues: expressionValues,
    ReturnValues: 'ALL_NEW'
  };
  
  const result = await dynamodb.update(params).promise();
  return result.Attributes;
};

// Delete a note by ID
const deleteItem = async (id) => {
  const params = {
    TableName: tableName,
    Key: { id }
  };
  
  await dynamodb.delete(params).promise();
  return { id };
};

module.exports = {
  createItem,
  getItem,
  listItems,
  updateItem,
  deleteItem
};
