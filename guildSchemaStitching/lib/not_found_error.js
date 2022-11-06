// Error handling for non existing documents
export default class NotFoundError extends Error {
  constructor(message) {
    super(message || 'Record not found');
    this.extensions = { code: 'NOT_FOUND' };
  }
};
