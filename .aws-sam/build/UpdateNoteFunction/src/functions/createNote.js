// src/functions/createNote.js
const { v4: uuidv4 } = require('uuid');
const dynamodb = require('../lib/dynamodb');
const response = require('../lib/responseUtil');

exports.handler = async (event) => {
  try {
    // Parse the request body
    const requestBody = JSON.parse(event.body);
    
    // Validate request
    if (!requestBody.title) {
      return response.badRequest('Title is required');
    }
    
    // Create a new note
    const note = {
      id: uuidv4(),
      title: requestBody.title,
      content: requestBody.content || '',
      createdAt: new Date().toISOString()
    };
    
    // Save to DynamoDB
    const result = await dynamodb.createItem(note);
    
    // Return success response
    return response.created(result);
  } catch (error) {
    console.error('Error creating note:', error);
    return response.serverError('Failed to create note');
  }
};
