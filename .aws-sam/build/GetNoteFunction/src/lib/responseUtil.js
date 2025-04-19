// src/lib/responseUtil.js
// Standard response format for consistent API responses
const formatResponse = (statusCode, body) => {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
};

// Success response (200 OK)
const success = (data) => formatResponse(200, data);

// Created response (201 Created)
const created = (data) => formatResponse(201, data);

// Error response (4xx, 5xx)
const error = (statusCode, message) => formatResponse(
  statusCode, 
  { error: message }
);

// Not found response (404)
const notFound = (message = 'Resource not found') => error(404, message);

// Bad request response (400)
const badRequest = (message = 'Invalid request') => error(400, message);

// Server error response (500)
const serverError = (message = 'Internal server error') => error(500, message);

module.exports = {
  success,
  created,
  error,
  notFound,
  badRequest,
  serverError
};
