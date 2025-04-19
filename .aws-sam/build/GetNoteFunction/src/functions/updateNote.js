// src/functions/updateNote.js
const dynamodb = require('../lib/dynamodb');
const response = require('../lib/responseUtil');

exports.handler = async (event) => {
  try {
    // Get note ID from path parameters
    const noteId = event.pathParameters?.id;
    
    if (!noteId) {
      return response.badRequest('Note ID is required');
    }
    
    // Parse the request body
    const requestBody = JSON.parse(event.body);
    
    if (!requestBody.title && !requestBody.content) {
      return response.badRequest('At least one field (title or content) is required');
    }
    
    // Check if note exists
    const existingNote = await dynamodb.getItem(noteId);
    
    if (!existingNote) {
      return response.notFound(`Note with ID ${noteId} not found`);
    }
    
    // Update note
    const updatedNote = {
      ...requestBody,
      id: noteId,
      updatedAt: new Date().toISOString()
    };
    
    // Save to DynamoDB
    const result = await dynamodb.updateItem(noteId, updatedNote);
    
    // Return success response
    return response.success(result);
  } catch (error) {
    console.error('Error updating note:', error);
    return response.serverError('Failed to update note');
  }
};
