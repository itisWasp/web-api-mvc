import { Router } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import response from './response';

const docrouter = Router();

const paths = {
  ...response,
};

const options = {
  openapi: '3.0.1',
  info: {
    version: '0.0.1',
    title: 'My WEB MVC API',
    description: 'My WEB MVC API functionality',
    contact: {
      name: 'Mugisha Israel',
      email: 'mugishaisrael18@gmail.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },

  servers: [
    {
      url: 'http://localhost:3000/',
      description: 'Local server',
    },
    {
      url: 'https://my-portfolio-back-end.herokuapp.com/api/doc/',
      description: 'Remote server',
    },
  ],

  paths: {
    '/api/register': {
      post: {
        tags: ['Users'],
        description: 'Create users',
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
              example: {
                Name: 'JaneD',
                PhoneNumber: '0788492013',
                UserName: 'itiswasp@gmail.com',
                Password: 'Password@2022',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'New User was created successfully',
          },
          400: {
            description: 'Bad Request',
          },
        },
      },
    },

    '/api/login': {
      post: {
        tags: ['Login'],
        description: 'Log In',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
              example: {
                UserName: 'itiswasp@gmail.com',
                Password: 'Password@2022',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'User Logged In successfully',
          },
          400: {
            description: 'Bad Request',
          },
        },
      },
    },

    '/api/users': {
      get: {
        security: [
          {
            ApiKey: [],
          },
        ],
        tags: ['Users'],
        summary: 'Returns the list of all the users',
        responses: {
          200: {
            description: 'The list of the users',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },

          401: {
            description: 'Unauthorized to get All Users',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: 'object',

        properties: {
          id: {
            type: 'string',
            description: 'The auto-generated id of the blog',
          },
          name: {
            type: 'string',
            description: "User's Name",
          },
          username: {
            type: 'string',
            description: "User's Email",
          },
          phoneNumber: {
            type: 'integer',
            description: "User's Phone Number",
          },
          roleId: {
            type: 'integer',
            description: "User's Role ID",
          },
          password: {
            type: 'string',
            description: "User's Password",
          },
        },
      },
    },

    securitySchemes: {
      ApiKey: {
        type: 'apiKey',
        in: 'header',
        name: 'auth-token',
      },
    },
  },
};

// const specs = swaggerJsDoc(options);

docrouter.use('/', serve, setup(options));

export default docrouter;
