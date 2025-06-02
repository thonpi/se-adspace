const swaggerJSDoc = require('swagger-jsdoc');

const swaggerConfig = {
  openapi: '3.0.0',
  security: [
    {
      BearerAuth: [],
    },
  ],
  info: {
    title: 'Advertisement Space API Documentation',
    version: '1.0.0',
    description:
      'This API allows users to manage advertisement spaces, rental spaces, design jobs, and user profiles.',
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Local server',
    },
  ],
  tags: [
    { name: 'Home', description: 'Free testing public APIs' },
    {
      name: 'Authentication',
      description: 'Authentication-related operations',
    },
    { name: 'Users', description: 'Operations related to users' },
    {
      name: 'Advertisement Spaces',
      description: 'Operations related to advertisement spaces',
    },
    {
      name: 'Rental Spaces',
      description: 'Operations related to rental spaces',
    },
    { name: 'Design Jobs', description: 'Operations related to design jobs' },
    { name: 'Files', description: 'File upload operations' },
  ],
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          phoneNumber: { type: 'string' },
          roles: { type: 'array', items: { type: 'string' } },
          isDesigner: { type: 'boolean' },
          status: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      AdvertisementSpace: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          ownerId: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          latitude: { type: 'number' },
          longitude: { type: 'number' },
          width: { type: 'number' },
          height: { type: 'number' },
          imagePaths: { type: 'array', items: { type: 'string' } },
          status: { type: 'string' },
        },
      },
      RentalSpace: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          spaceId: { type: 'string' },
          monthlyPrice: { type: 'number' },
          yearlyPrice: { type: 'number' },
          visitorIds: { type: 'array', items: { type: 'string' } },
          customerId: { type: 'string' },
          status: { type: 'string' },
        },
      },
      DesignJob: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          spaceId: { type: 'string' },
          customerId: { type: 'string' },
          status: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      ApiResponse: {
        type: 'object',
        properties: {
          code: { type: 'number' },
          message: { type: 'string' },
          data: { type: 'object' },
        },
      },
    },
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {
    '/': {
      get: {
        summary: 'Welcome Message',
        description: 'Returns a welcome message.',
        tags: ['Home'],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },

    '/auth/register': {
      post: {
        summary: 'Register User',
        description: 'Register a new user.',
        tags: ['Authentication'],
        requestBody: {
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' },
            },
          },
        },
        responses: {
          201: { description: 'User registered successfully' },
          500: { description: 'Something wrong' },
        },
      },
    },
    '/auth/login': {
      post: {
        summary: 'Login User',
        description: 'Authenticate a user and provide access token.',
        tags: ['Authentication'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  phoneNumber: { type: 'string' },
                  password: { type: 'string' },
                },
                required: ['phoneNumber', 'password'],
              },
            },
          },
        },
        responses: {
          200: { description: 'Login successful' },
          500: { description: 'Something wrong' },
        },
      },
    },
    '/auth/forgot-password': {
      post: {
        summary: 'Forgot Password',
        description:
          'Send a password reset email (in the future ... now we simply reset the password for you).',
        tags: ['Authentication'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  phoneNumber: { type: 'string' },
                  password: { type: 'string' },
                },
                required: ['phoneNumber', 'password'],
              },
            },
          },
        },
        responses: {
          200: { description: 'Reset password successfully' },
          500: { description: 'Something wrong' },
        },
      },
    },
    '/auth/logout': {
      post: {
        summary: 'Logout User',
        description: 'Log out the currently authenticated user.',
        tags: ['Authentication'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  userId: { type: 'string' },
                },
                required: ['userId'],
              },
            },
          },
        },
        responses: {
          200: { description: 'Logged out successfully' },
          500: { description: 'Something wrong' },
        },
      },
    },
    '/user-profile/{id}': {
      get: {
        summary: 'Get User Profile',
        description: 'Retrieve the profile of the authenticated user.',
        tags: ['Users'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The ID of the user to retrieve',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: { description: 'Profile retrieved successfully' },
          500: { description: 'Something wrong' },
        },
      },
    },
  },
};

module.exports = swaggerConfig;
