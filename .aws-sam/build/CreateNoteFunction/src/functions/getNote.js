// src/functions/getNote.js
const dynamodb = require('../lib/dynamodb');
const response = require('../lib/responseUtil');

exports.handler = async (event) => {
  try {
    // Get note ID from path parameters
    const noteId = event.pathParameters?.id;
    
    if (!noteId) {
      return response.badRequest('Note ID is required');
    }
    
    // Get note from DynamoDB
    const note = await dynamodb.getItem(noteId);
    
    // Check if note exists
    if (!note) {
      return response.notFound(`Note with ID ${noteId} not found`);
    }
    
    // Return success response
    return response.success(note);
  } catch (error) {
    console.error('Error getting note:', error);
    return response.serverError('Failed to get note');
  }
};
