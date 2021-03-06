module.exports = {
  "swaggerDefinition": {
    "swagger": "2.0",
    "info": {
      "title": "Find My Job API",
      "version": "1.0.0",
      "description": "Node.js Express API for Find My Job website."
    },
    "host": "36bda0f1.ngrok.io",
    "basePath": "/api",
    "tags": [{
      "name": "user",
      "description": "Operations with users"
    },
    {
      "name": "vacancy",
      "description": "Operations with vacancies"
    },
    {
      "name": "technology",
      "description": "Operations with technologies"
    },
  ],
    "securityDefinitions": {
      "bearer-auth": {
        "type": "apiKey",
        "in": "header",
        "name": "Authorization"
      },
    },
  },
  "apis": ['./routes/api.js']
};
