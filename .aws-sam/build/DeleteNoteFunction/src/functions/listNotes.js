// src/functions/listNotes.js
const dynamodb = require('../lib/dynamodb');
const response = require('../lib/responseUtil');

exports.handler = async () => {
 console.log('*** THIS IS THE LIST NOTES FUNCTION ***');
  try {
    // Get all notes from DynamoDB
    const notes = await dynamodb.listItems();
    
    // Return success response
    return response.success({ notes });
  } catch (error) {
    console.error('Error listing notes:', error);
    return response.serverError('Failed to list notes');
  }
};
