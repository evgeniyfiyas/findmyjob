module.exports = {
  "swaggerDefinition": {
    "swagger": "2.0",
    "info": {
      "title": "Find My Job API",
      "version": "1.0.0",
      "description": "Node.js Express API for Find My Job website."
    },
    "host": "localhost:3000",
    "basePath": "/api",
    "tags": [
      {
        "name": "user",
        "description": "Operations about user"
      }
    ]
  },
  "apis": ['./routes/api.js']
};
