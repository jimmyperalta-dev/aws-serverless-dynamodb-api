// src/functions/deleteNote.js
const dynamodb = require('../lib/dynamodb');
const response = require('../lib/responseUtil');

exports.handler = async (event) => {
  try {
    // Get note ID from path parameters
    const noteId = event.pathParameters?.id;
    
    if (!noteId) {
      return response.badRequest('Note ID is required');
    }
    
    // Check if note exists
    const existingNote = await dynamodb.getItem(noteId);
    
    if (!existingNote) {
      return response.notFound(`Note with ID ${noteId} not found`);
    }
    
    // Delete note from DynamoDB
    await dynamodb.deleteItem(noteId);
    
    // Return success response
    return response.success({ message: `Note with ID ${noteId} deleted successfully` });
  } catch (error) {
    console.error('Error deleting note:', error);
    return response.serverError('Failed to delete note');
  }
};
