import { DocumentationData } from '@/types/documentation';

export const documentationData: DocumentationData = {
  title: 'Ankur Halder Portfolio API Documentation',
  version: '1.4.0',
  generatedDate: 'Sat Aug 30 05:46:01 UTC 2025',
  tableOfContents: [
    { title: 'Getting Started', id: 'getting-started' },
    { title: 'Authentication API', id: 'authentication-api' },
    { title: 'User Management API', id: 'user-management-api' },
    { title: 'Email API', id: 'email-api' },
    { title: 'Endorsement API', id: 'endorsement-api' },
    { title: 'Portfolio API', id: 'portfolio-api' },
    { title: 'Project Stats API', id: 'project-stats-api' },
    { title: 'Public AI API', id: 'public-ai-api' },
    { title: 'Health Check API', id: 'health-check-api' },
    { title: 'Admin API & Endpoints', id: 'admin-api' },
  ],
  welcomeMessage:
    'Welcome to the developer documentation for the Ankur Halder Portfolio API. This document will provide all the information you need to interact with the API.',
  gettingStarted: {
    title: 'Getting Started',
    content:
      'This guide will walk you through the basics of using the API, including authentication and making your first request.',
    baseUrl: {
        title: 'Base URL',
        content: 'All API endpoints are relative to the following base URL:',
        url: '/api/v1',
    },
    authentication: {
      title: 'Authentication',
      content:
        'Most endpoints in this API are protected and require authentication. The API uses **JSON Web Tokens (JWT)** for authentication.\n\nTo authenticate, you need to follow these steps:\n\n1.  **Log in:** Send a `POST` request to the `/users/login` endpoint with your email and password.\n2.  **Receive Token:** If your credentials are correct, the API will return a JWT in the response body.\n3.  **Send Token:** For all subsequent requests to protected endpoints, you must include this token in the `Authorization` header with the `Bearer` scheme.',
      exampleHeader: 'Authorization: Bearer <YOUR_JWT_TOKEN>',
    },
  },
  apiSections: [
    {
      id: 'authentication-api',
      title: 'Authentication API',
      description:
        'This section covers endpoints related to user authentication, including signup, login, logout, and password management.',
      endpoints: [
        {
          id: '1-user-signup',
          title: 'User Signup',
          url: '/users/signup',
          method: 'POST',
          authentication: 'Not required.',
          requestBody: [
            {
              field: 'name',
              type: 'String',
              required: 'Yes',
              validationRules: 'Max 100 characters',
              description: "The user's full name.",
            },
            {
              field: 'email',
              type: 'String',
              required: 'Yes',
              validationRules: 'Must be a valid email address.',
              description: "The user's email address.",
            },
            {
              field: 'password',
              type: 'String',
              required: 'Yes',
              validationRules: 'Min 8 characters.',
              description: "The user's password.",
            },
            {
              field: 'passwordConfirm',
              type: 'String',
              required: 'Yes',
              validationRules: 'Must match the `password` field.',
              description: 'Confirmation of the password.',
            },
          ],
          sampleRequests: [
            {
              language: 'curl',
              code: `curl -X POST \\\n  /api/v1/users/signup \\\n  -H 'Content-Type: application/json' \\\n  -d '{\n    "name": "Ankur Halder",\n    "email": "test@example.com",\n    "password": "password123",\n    "passwordConfirm": "password123"\n  }'`,
            },
            {
              language: 'axios',
              code: `import axios from 'axios';\n\nasync function signupUser() {\n  try {\n    const response = await axios.post('/api/v1/users/signup', {\n      name: 'Ankur Halder',\n      email: 'test@example.com',\n      password: 'password123',\n      passwordConfirm: 'password123'\n    });\n    console.log(response.data);\n  } catch (error) {\n    console.error(error.response.data);\n  }\n}`,
            },
          ],
          sampleSuccessResponse: {
            statusCode: '201 Created',
            code: `{\n  "status": "success",\n  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",\n  "data": {\n    "user": {\n      "role": "user",\n      "active": true,\n      "_id": "60d5f2f5c7b3c3b3c3b3c3b3",\n      "name": "Ankur Halder",\n      "email": "test@example.com",\n      "createdAt": "2023-01-01T00:00:00.000Z",\n      "updatedAt": "2023-01-01T00:00:00.000Z"\n    }\n  }\n}`,
          },
          sampleErrorResponses: [
            {
              statusCode: '400 Bad Request (Validation Error)',
              code: `{\n  "status": "fail",\n  "message": "Invalid input: Password confirmation does not match password (in body for parameter 'passwordConfirm')."\n}`,
            },
            {
              statusCode: '400 Bad Request (Duplicate Email)',
              description: 'If the email address is already registered.',
              code: `{\n  "status": "fail",\n  "message": "This email address is already in use."\n}`,
            },
          ],
        },
        {
            id: '2-user-login',
            title: 'User Login',
            url: '/users/login',
            method: 'POST',
            authentication: 'Not required.',
            requestBody: [
              {
                field: 'email',
                type: 'String',
                required: 'Yes',
                validationRules: 'Must be a valid email address.',
                description: "The user's email address.",
              },
              {
                field: 'password',
                type: 'String',
                required: 'Yes',
                validationRules: 'Cannot be empty.',
                description: "The user's password.",
              },
            ],
            sampleRequests: [
                {
                    language: 'curl',
                    code: `curl -X POST \\\n  /api/v1/users/login \\\n  -H 'Content-Type: application/json' \\\n  -d '{\n    "email": "test@example.com",\n    "password": "password123"\n  }'`,
                }
            ],
            sampleSuccessResponse: {
                statusCode: '200 OK',
                code: `{\n  "status": "success",\n  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",\n  "data": {\n    "user": {\n      "_id": "60d5f2f5c7b3c3b3c3b3c3b3",\n      "name": "Ankur Halder",\n      "email": "test@example.com",\n      "role": "user"\n    }\n  }\n}`,
            },
            sampleErrorResponses: [
                {
                    statusCode: '401 Unauthorized',
                    code: `{\n  "status": "fail",\n  "message": "Incorrect email or password"\n}`,
                }
            ]
        },
        {
            id: '3-user-logout',
            title: 'User Logout',
            url: '/users/logout',
            method: 'POST',
            authentication: 'Required (Bearer Token).',
            sampleRequests: [
                {
                    language: 'curl',
                    code: `curl -X POST \\\n  /api/v1/users/logout \\\n  -H 'Authorization: Bearer <YOUR_JWT_TOKEN>'`,
                }
            ],
            sampleSuccessResponse: {
                statusCode: '200 OK',
                code: `{\n  "status": "success"\n}`,
            }
        },
        {
            id: '4-forgot-password',
            title: 'Forgot Password',
            url: '/users/forgotPassword',
            method: 'POST',
            authentication: 'Not required.',
            requestBody: [
                {
                    field: 'email',
                    type: 'String',
                    required: 'Yes',
                    validationRules: 'Must be a valid email address.',
                    description: "The user's email address.",
                }
            ],
            sampleRequests: [
                {
                    language: 'curl',
                    code: `curl -X POST \\\n  /api/v1/users/forgotPassword \\\n  -H 'Content-Type: application/json' \\\n  -d '{\n    "email": "test@example.com"\n  }'`,
                }
            ],
            sampleSuccessResponse: {
                statusCode: '200 OK',
                description: 'This endpoint always returns a success message to prevent user enumeration, even if the email does not exist.',
                code: `{\n  "status": "success",\n  "message": "If an account with that email exists, a password reset link has been sent."\n}`,
            }
        },
        {
            id: '5-reset-password',
            title: 'Reset Password',
            url: '/users/resetPassword/:token',
            method: 'PATCH',
            authentication: 'Not required.',
            urlParameters: [
                {
                    parameter: 'token',
                    type: 'String',
                    description: 'The password reset token from the email.',
                }
            ],
            requestBody: [
                {
                    field: 'password',
                    type: 'String',
                    required: 'Yes',
                    validationRules: 'Min 8 characters.',
                    description: 'The new password.',
                },
                {
                    field: 'passwordConfirm',
                    type: 'String',
                    required: 'Yes',
                    validationRules: 'Must match the `password` field.',
                    description: 'Confirmation of the new password.',
                }
            ],
            sampleRequests: [
                {
                    language: 'curl',
                    code: `curl -X PATCH \\\n  /api/v1/users/resetPassword/a1b2c3d4e5f6... \\\n  -H 'Content-Type: application/json' \\\n  -d '{\n    "password": "newPassword456",\n    "passwordConfirm": "newPassword456"\n  }'`,
                }
            ],
            sampleSuccessResponse: {
                statusCode: '200 OK',
                description: 'Returns a new JWT and the user object.',
                code: `{\n  "status": "success",\n  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",\n  "data": {\n    "user": { ... }\n  }\n}`,
            },
            sampleErrorResponses: [
                {
                    statusCode: '400 Bad Request',
                    code: `{\n  "status": "fail",\n  "message": "Token is invalid or has expired."\n}`,
                }
            ]
        }
      ],
    },
    {
        id: 'user-management-api',
        title: 'User Management API',
        description: 'This section describes the endpoints for managing the profile of the currently authenticated user. All endpoints in this section require authentication.',
        endpoints: [
            {
                id: '1-get-my-profile',
                title: 'Get My Profile',
                url: '/users/me',
                method: 'GET',
                authentication: 'Required (Bearer Token).',
                sampleRequests: [
                    {
                        language: 'curl',
                        code: `curl -X GET \\\n  /api/v1/users/me \\\n  -H 'Authorization: Bearer <YOUR_JWT_TOKEN>'`,
                    },
                    {
                        language: 'axios',
                        code: `import axios from 'axios';\n\nasync function getMyProfile(token) {\n  try {\n    const response = await axios.get('/api/v1/users/me', {\n      headers: {\n        'Authorization': \`Bearer \${token}\`\n      }\n    });\n    console.log(response.data);\n  } catch (error) {\n    console.error(error.response.data);\n  }\n}`
                    }
                ],
                sampleSuccessResponse: {
                    statusCode: '200 OK',
                    code: `{\n  "status": "success",\n  "data": {\n    "user": {\n      "role": "user",\n      "active": true,\n      "_id": "60d5f2f5c7b3c3b3c3b3c3b3",\n      "name": "Ankur Halder",\n      "email": "test@example.com",\n      "createdAt": "2023-01-01T00:00:00.000Z",\n      "updatedAt": "2023-01-01T00:00:00.000Z"\n    }\n  }\n}`
                },
                sampleErrorResponses: [
                    {
                        statusCode: '401 Unauthorized',
                        description: 'If the token is missing, invalid, or expired.',
                        code: `{\n  "status": "fail",\n  "message": "You are not logged in! Please log in to get access."\n}`
                    }
                ]
            },
            {
                id: '2-update-my-profile',
                title: 'Update My Profile',
                url: '/users/updateMe',
                method: 'PATCH',
                authentication: 'Required (Bearer Token).',
                description: 'Updates the name and/or email for the currently logged-in user.\n\n**Note:** You cannot update your password using this endpoint. Please use the `/users/updateMyPassword` endpoint instead.',
                requestBody: [
                    {
                        field: 'name',
                        type: 'String',
                        required: 'No',
                        validationRules: 'Max 100 characters',
                        description: "The user's new name."
                    },
                    {
                        field: 'email',
                        type: 'String',
                        required: 'No',
                        validationRules: 'Must be a valid email address.',
                        description: "The user's new email address."
                    }
                ],
                sampleRequests: [
                    {
                        language: 'curl',
                        code: `curl -X PATCH \\\n  /api/v1/users/updateMe \\\n  -H 'Authorization: Bearer <YOUR_JWT_TOKEN>' \\\n  -H 'Content-Type: application/json' \\\n  -d '{\n    "name": "Ankur H.",\n    "email": "ankur.h@example.com"\n  }'`
                    }
                ],
                sampleSuccessResponse: {
                    statusCode: '200 OK',
                    code: `{\n  "status": "success",\n  "data": {\n    "user": {\n      "_id": "60d5f2f5c7b3c3b3c3b3c3b3",\n      "name": "Ankur H.",\n      "email": "ankur.h@example.com",\n      ...\n    }\n  }\n}`
                },
                sampleErrorResponses: [
                    {
                        statusCode: '400 Bad Request',
                        description: 'If you try to update the password via this route.',
                        code: `{\n    "status": "fail",\n    "message": "This route is not for password updates. Please use /updateMyPassword."\n}`
                    }
                ]
            },
            {
                id: '3-deactivate-my-account',
                title: 'Deactivate My Account',
                url: '/users/deleteMe',
                method: 'DELETE',
                authentication: 'Required (Bearer Token).',
                description: 'Deactivates the account of the currently logged-in user. This is a soft delete.',
                sampleRequests: [
                    {
                        language: 'curl',
                        code: `curl -X DELETE \\\n  /api/v1/users/deleteMe \\\n  -H 'Authorization: Bearer <YOUR_JWT_TOKEN>'`
                    }
                ],
                sampleSuccessResponse: {
                    statusCode: '204 No Content',
                    description: 'The server will respond with a `204 No Content` status and an empty body.',
                    code: ''
                }
            },
            {
                id: '4-update-my-password',
                title: 'Update My Password',
                url: '/users/updateMyPassword',
                method: 'PATCH',
                authentication: 'Required (Bearer Token).',
                description: 'Updates the password for the currently logged-in user.',
                requestBody: [
                    {
                        field: 'passwordCurrent',
                        type: 'String',
                        required: 'Yes',
                        validationRules: 'Cannot be empty.',
                        description: "The user's current password."
                    },
                    {
                        field: 'password',
                        type: 'String',
                        required: 'Yes',
                        validationRules: 'Min 8 characters.',
                        description: 'The new password.'
                    },
                    {
                        field: 'passwordConfirm',
                        type: 'String',
                        required: 'Yes',
                        validationRules: 'Must match the `password` field.',
                        description: 'Confirmation of the new password.'
                    }
                ],
                sampleRequests: [
                    {
                        language: 'curl',
                        code: `curl -X PATCH \\\n  /api/v1/users/updateMyPassword \\\n  -H 'Authorization: Bearer <YOUR_JWT_TOKEN>' \\\n  -H 'Content-Type: application/json' \\\n  -d '{\n    "passwordCurrent": "password123",\n    "password": "newPassword456",\n    "passwordConfirm": "newPassword456"\n  }'`
                    }
                ],
                sampleSuccessResponse: {
                    statusCode: '200 OK',
                    description: 'Returns a new JWT and the user object.',
                    code: `{\n  "status": "success",\n  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",\n  "data": {\n    "user": { ... }\n  }\n}`
                },
                sampleErrorResponses: [
                    {
                        statusCode: '401 Unauthorized',
                        description: 'If the `passwordCurrent` is incorrect.',
                        code: `{\n  "status": "fail",\n  "message": "Your current password is incorrect."\n}`
                    }
                ]
            }
        ]
    },
    {
        id: 'email-api',
        title: 'Email API',
        description: 'This section covers endpoints related to email functionality, such as the contact form.',
        endpoints: [
            {
                id: '1-submit-contact-form',
                title: 'Submit Contact Form',
                url: '/email/contact',
                method: 'POST',
                authentication: 'Not required.',
                contentType: 'multipart/form-data',
                description: 'Submits the main contact form, potentially with file attachments. This endpoint performs AI analysis on the message content and sends confirmation emails.',
                requestBody: [
                    {
                        field: 'name',
                        type: 'String',
                        required: 'Yes',
                        validationRules: 'Max 100 characters.',
                        description: "The sender's name."
                    },
                    {
                        field: 'email',
                        type: 'String',
                        required: 'Yes',
                        validationRules: 'Must be a valid email address.',
                        description: "The sender's email address."
                    },
                    {
                        field: 'subject',
                        type: 'String',
                        required: 'Yes',
                        validationRules: 'Max 200 characters.',
                        description: 'The subject of the message.'
                    },
                    {
                        field: 'message',
                        type: 'String',
                        required: 'Yes',
                        validationRules: 'Max 5000 characters.',
                        description: 'The body of the message.'
                    },
                    {
                        field: 'attachments',
                        type: 'File[]',
                        required: 'No',
                        validationRules: 'Max 5 files. Max 900KB per file. Allowed types: `text/plain`, `image/jpeg`, `image/png`, `application/pdf`, etc.',
                        description: 'File attachments for the message.'
                    },
                    {
                        field: 'honeypot',
                        type: 'String',
                        required: 'No',
                        validationRules: 'Should be left empty.',
                        description: 'A hidden field used for spam detection. If this field is filled out, the submission is treated as spam and silently discarded.'
                    }
                ],
                sampleRequests: [
                    {
                        language: 'curl',
                        code: `curl -X POST \\\n  /api/v1/email/contact \\\n  -F "name=John Doe" \\\n  -F "email=john.doe@example.com" \\\n  -F "subject=Project Inquiry" \\\n  -F "message=Hello, I would like to discuss a project." \\\n  -F "attachments=@/path/to/your/file.pdf"`
                    }
                ],
                sampleSuccessResponse: {
                    statusCode: '200 OK',
                    code: `{\n  "success": true,\n  "message": "Message and file(s) received (Ref: AH-1672531200000-abcdef12). Thank you!",\n  "referenceId": "AH-1672531200000-abcdef12"\n}`
                },
                sampleErrorResponses: [
                    {
                        statusCode: '400 Bad Request (Validation Error)',
                        code: `{\n  "status": "fail",\n  "message": "Invalid input: Message is required (in body for parameter 'message')."\n}`
                    },
                    {
                        statusCode: '400 Bad Request (Invalid File Type)',
                        code: `{\n  "status": "fail",\n  "message": "File type image/gif not allowed. Allowed types: image/jpeg, image/png, ..."\n}`
                    },
                    {
                        statusCode: '503 Service Unavailable',
                        description: 'If the email service is not configured on the server.',
                        code: `{\n    "status": "error",\n    "message": "Email service is not configured. Cannot process request."\n}`
                    }
                ]
            },
            {
                id: '2-generate-draft-reply-admin',
                title: 'Generate Draft Reply (Admin)',
                url: '/email/:id/draft-reply',
                method: 'POST',
                authentication: 'Required (Bearer Token, Admin role only).',
                description: 'Generates an AI-powered draft reply for a previously received email.',
                urlParameters: [
                    {
                        parameter: 'id',
                        type: 'String',
                        description: 'The MongoDB ObjectId of the email record.'
                    }
                ],
                sampleRequests: [
                    {
                        language: 'curl',
                        code: `curl -X POST \\\n  /api/v1/email/60d5f2f5c7b3c3b3c3b3c3b3/draft-reply \\\n  -H 'Authorization: Bearer <ADMIN_JWT_TOKEN>'`
                    }
                ],
                sampleSuccessResponse: {
                    statusCode: '200 OK',
                    code: `{\n  "status": "success",\n  "data": {\n    "draftReply": "Dear John Doe,\\n\\nThank you for your inquiry about the project...",\n    "usedModel": "gemini-1.5-flash"\n  }\n}`
                },
                sampleErrorResponses: [
                    {
                        statusCode: '404 Not Found',
                        code: `{\n    "status": "fail",\n    "message": "No email submission found with that ID."\n}`
                    }
                ]
            }
        ]
    },
    {
        id: 'endorsement-api',
        title: 'Endorsement API',
        description: 'This section covers endpoints for fetching and submitting skill and project endorsements.',
        endpoints: [
            {
                id: '1-get-all-endorsements',
                title: 'Get All Endorsements',
                url: '/endorsements',
                method: 'GET',
                authentication: 'Not required.',
                caching: 'This endpoint is cached. The data is refreshed from the database periodically.',
                description: 'Retrieves a map of all skill and project endorsements with their current counts.',
                sampleRequests: [
                    {
                        language: 'curl',
                        code: `curl -X GET /api/v1/endorsements`
                    }
                ],
                sampleSuccessResponse: {
                    statusCode: '200 OK',
                    code: `{\n  "status": "success",\n  "data": {\n    "skills": {\n      "javascript": 15,\n      "nodejs": 25,\n      "react": 22\n    },\n    "projects": {\n      "portfolio-backend": 10,\n      "some-other-project": 5\n    }\n  }\n}`
                }
            },
            {
                id: '2-add-an-endorsement',
                title: 'Add an Endorsement',
                url: '/endorsements',
                method: 'POST',
                authentication: 'Not required.',
                description: 'Increments the endorsement count for a specific skill or project.',
                requestBody: [
                    {
                        field: 'type',
                        type: 'String',
                        required: 'Yes',
                        validationRules: 'Must be either `skill` or `project`.',
                        description: 'The type of item being endorsed.'
                    },
                    {
                        field: 'id',
                        type: 'String',
                        required: 'Yes',
                        validationRules: 'Min 1, Max 100 characters.',
                        description: 'The ID of the skill or project (e.g., `nodejs`).'
                    }
                ],
                sampleRequests: [
                    {
                        language: 'curl',
                        code: `curl -X POST \\\n  /api/v1/endorsements \\\n  -H 'Content-Type: application/json' \\\n  -d '{\n    "type": "skill",\n    "id": "nodejs"\n  }'`
                    }
                ],
                sampleSuccessResponse: {
                    statusCode: '200 OK',
                    code: `{\n  "status": "success",\n  "data": {\n    "type": "skill",\n    "id": "nodejs",\n    "endorsements": 26\n  }\n}`
                },
                sampleErrorResponses: [
                    {
                        statusCode: '400 Bad Request',
                        code: `{\n  "status": "fail",\n  "message": "Invalid input: Endorsement type must be 'skill' or 'project' (in body for parameter 'type')."\n}`
                    }
                ]
            }
        ]
    },
    {
        id: 'portfolio-api',
        title: 'Portfolio API',
        description: 'This section describes the CRUD API for managing portfolio projects and skills. Public endpoints are available to read the data, while write operations are restricted to administrators.',
        endpoints: [
            {
                id: '1-get-all-projects',
                title: 'Get All Projects',
                url: '/portfolio/projects',
                method: 'GET',
                authentication: 'Not required.',
                caching: 'This endpoint is cached for 10 minutes (600 seconds).',
                description: 'Retrieves a list of all portfolio projects.',
                sampleRequests: [
                    {
                        language: 'curl',
                        code: `curl -X GET /api/v1/portfolio/projects`
                    }
                ],
                sampleSuccessResponse: {
                    statusCode: '200 OK',
                    description: 'The response is an array of project objects. Each project includes HATEOAS links.',
                    code: `{\n  "status": "success",\n  "data": [\n    {\n      "_id": "60d5f2f5c7b3c3b3c3b3c3b3",\n      "title": "My Awesome Project",\n      "description": "...",\n      "tags": [ ... ],\n      "links": [\n        { "rel": "self", "href": "/api/v1/portfolio/projects/60d5f2f5c7b3c3b3c3b3c3b3" },\n        { "rel": "endorse", "href": "/api/v1/endorsements" }\n      ]\n    }\n  ]\n}`
                }
            },
            {
                id: '2-get-all-skills',
                title: 'Get All Skills',
                url: '/portfolio/skills',
                method: 'GET',
                authentication: 'Not required.',
                caching: 'This endpoint is cached for 10 minutes (600 seconds).',
                description: 'Retrieves a list of all skills, with associated projects.',
                sampleRequests: [
                    {
                        language: 'curl',
                        code: `curl -X GET /api/v1/portfolio/skills`
                    }
                ],
                sampleSuccessResponse: {
                    statusCode: '200 OK',
                    description: 'The response is an array of skill objects. Each skill includes a list of projects that use that skill.',
                    code: `{\n  "status": "success",\n  "data": [\n    {\n      "_id": "60d5f2f5c7b3c3b3c3b3c3b4",\n      "title": "Node.js",\n      "category": "Backend",\n      "projects": [\n        { "id": "project1", "title": "My Awesome Project" }\n      ],\n      "links": [ ... ]\n    }\n  ]\n}`
                }
            },
            {
                id: '3-admin-project-skill-endpoints',
                title: 'Admin Project & Skill Endpoints',
                url: '',
                method: 'POST',
                authentication: 'Required (Admin JWT).',
                description: 'The following endpoints are for administrative purposes and require an admin-level JWT for authentication.\n\n-   `POST /portfolio/projects`: Create a new project.\n-   `PATCH /portfolio/projects/:id`: Update a project.\n-   `DELETE /portfolio/projects/:id`: Delete a project.\n-   `POST /portfolio/skills`: Create a new skill.\n-   `PATCH /portfolio/skills/:id`: Update a skill.\n-   `DELETE /portfolio/skills/:id`: Delete a skill.',
            }
        ]
    },
    {
        id: 'project-stats-api',
        title: 'Project Stats API',
        description: 'This API provides statistics for GitHub projects.',
        endpoints: [
            {
                id: '1-get-all-project-stats',
                title: 'Get All Project Stats',
                url: '/project-stats',
                method: 'GET',
                authentication: 'Not required.',
                caching: 'This endpoint is cached for 5 minutes (300 seconds).',
                description: 'Retrieves a map of all project statistics.',
                sampleRequests: [
                    {
                        language: 'curl',
                        code: `curl -X GET /api/v1/project-stats`
                    }
                ],
                sampleSuccessResponse: {
                    statusCode: '200 OK',
                    description: 'The response is a map where keys are project IDs and values are the stats objects.',
                    code: `{\n  "status": "success",\n  "data": {\n    "portfolio-backend": {\n      "_id": "60d5f2f5c7b3c3b3c3b3c3b5",\n      "projectId": "portfolio-backend",\n      "stars": 123,\n      "forks": 45,\n      "watchers": 67,\n      "lastUpdatedAt": "2023-01-01T00:00:00.000Z"\n    }\n  }\n}`
                }
            },
            {
                id: '2-trigger-stats-update',
                title: 'Trigger Stats Update',
                url: '/project-stats/update',
                method: 'POST',
                authentication: 'Requires an API Key.',
                description: 'Triggers a background job to update the project statistics from GitHub. This is a protected endpoint intended for automated use.',
                headers: [
                    {
                        header: 'x-api-key',
                        type: 'String',
                        description: 'The secret API key for automation tasks.'
                    }
                ],
                sampleRequests: [
                    {
                        language: 'curl',
                        code: `curl -X POST \\\n  /api/v1/project-stats/update \\\n  -H 'x-api-key: <YOUR_AUTOMATION_API_KEY>'`
                    }
                ],
                sampleSuccessResponse: {
                    statusCode: '200 OK',
                    code: `{\n  "status": "success",\n  "message": "GitHub project stats update job has completed.",\n  "report": {\n    "processed": ["repo1", "repo2"],\n    "failed": ["repo3"],\n    "errors": [ ... ]\n  }\n}`
                },
                sampleErrorResponses: [
                    {
                        statusCode: '401 Unauthorized',
                        code: `{\n    "status": "fail",\n    "message": "Unauthorized: Invalid API Key"\n}`
                    }
                ]
            },
            {
                id: '3-get-private-repo-stats-admin',
                title: 'Get Private Repo Stats (Admin)',
                url: '/project-stats/private-stats',
                method: 'GET',
                authentication: 'Required (Bearer Token, Admin role only).',
                status: 'Not Implemented',
                description: 'This endpoint is intended to retrieve stats for private repositories.\n\nThis feature is not yet implemented. The endpoint will return a `501 Not Implemented` error.',
                sampleErrorResponses: [
                    {
                        statusCode: '501 Not Implemented',
                        code: `{\n    "status": "error",\n    "message": "This feature has not been implemented yet."\n}`
                    }
                ]
            }
        ]
    },
    {
        id: 'public-ai-api',
        title: 'Public AI API',
        description: 'This API provides access to various AI-powered features. All features are accessed through a single endpoint, and the desired feature is specified by a `useCaseId`.',
        endpoints: [
            {
                id: '1-general-ai-request-endpoint',
                title: 'General AI Request Endpoint',
                url: '/public-ai/request',
                method: 'POST',
                authentication: 'Not required.',
                rateLimiting: 'This endpoint uses a sophisticated **cost-based rate limiting** system. Each request consumes a certain number of "points" from a user\'s budget based on the complexity of the request. The budget resets every 15 minutes. If a request would exceed the budget, it will be rejected with a `429 Too Many Requests` error.',
                generalRequestBody: [
                    { field: 'useCaseId', type: 'String', required: true, description: 'The ID of the AI use case to execute.' },
                    { field: 'payload', type: 'Object', required: true, description: 'An object containing the inputs for the use case.' }
                ],
                responseFormat: 'The response format is consistent for all use cases. The AI-generated output is within the `data.content` field.',
                sampleSuccessResponse: {
                    statusCode: '200 OK',
                    code: `{\n  "status": "success",\n  "data": {\n    "content": "<AI-generated response content>"\n  }\n}`
                },
                sampleErrorResponses: [
                    { statusCode: '400 Bad Request (Invalid Payload)', description: 'If the payload does not match the schema for the given `useCaseId`.', code: '' },
                    { statusCode: '400 Bad Request (Malicious Input)', description: 'If the input is flagged by the AI security service.', code: '' },
                    { statusCode: '404 Not Found', description: 'If the `useCaseId` does not exist or is disabled.', code: '' },
                    { statusCode: '429 Too Many Requests', description: 'If the user\'s request budget is exceeded.', code: '' }
                ],
                useCases: [
                    {
                        useCaseId: 'portfolio-insights',
                        caching: 'This use case is heavily cached (24 hours).',
                        payload: []
                    },
                    {
                        useCaseId: 'github-readme',
                        payload: [
                            { field: 'githubUsername', type: 'String', description: "The user's GitHub username." }
                        ]
                    },
                    {
                        useCaseId: 'project-changelog',
                        payload: [
                            { field: 'repo', type: 'String', description: 'The repository path in the format `owner/repository`.' }
                        ]
                    },
                    {
                        useCaseId: 'skill-synergy',
                        payload: [
                            { field: 'skills', type: 'String[]', description: 'An array of skill titles to analyze.' }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'health-check-api',
        title: 'Health Check API',
        description: "This section describes the API for monitoring the health of the application and its dependencies.",
        endpoints: [
            {
                id: '1-get-health-status',
                title: 'Get Health Status',
                url: '/health',
                method: 'GET',
                authentication: 'Not required.',
                description: "This endpoint checks the status of the MongoDB database, the Redis cache, and the AI provider gateway. It returns a `200 OK` status if all services are operational and a `503 Service Unavailable` if any service is down.",
                sampleRequests: [
                    {
                        language: 'curl',
                        code: 'curl -X GET /health'
                    }
                ],
                sampleSuccessResponse: {
                    statusCode: '200 OK',
                    code: `{\n  "status": "ok",\n  "timestamp": "2023-01-01T12:00:00.000Z",\n  "checks": {\n    "database": {\n      "status": "up"\n    },\n    "cache": {\n      "status": "up"\n    },\n    "ai_gateway": {\n      "status": "operational",\n      "details": "At least one Tier 1 model is healthy."\n    }\n  }\n}`
                },
                sampleErrorResponses: [
                    {
                        statusCode: '503 Service Unavailable',
                        code: `{\n  "status": "error",\n  "timestamp": "2023-01-01T12:01:00.000Z",\n  "checks": {\n    "database": {\n      "status": "up"\n    },\n    "cache": {\n      "status": "down",\n      "error": "Could not connect to Redis."\n    },\n    "ai_gateway": {\n      "status": "operational",\n      "details": "At least one Tier 1 model is healthy."\n    }\n  }\n}`
                    }
                ]
            }
        ]
    },
    {
        id: 'admin-api',
        title: 'Admin API & Endpoints',
        description: 'This section covers endpoints that are restricted to users with the `admin` role.',
        endpoints: [
            {
                id: 'admin-web-interface',
                title: 'Admin Web Interface',
                url: '',
                method: 'GET',
                authentication: 'Admin authentication required for /admin.',
                description: 'The application includes a web-based administrative interface. The routes below are for rendering HTML pages for this interface and are not part of the JSON API.\n\n-   `GET /admin/login`: Renders the admin login page.\n-   `GET /admin`: Renders the main admin dashboard. Requires admin authentication.'
            },
            {
                id: '1-get-email-analytics-admin',
                title: 'Get Email Analytics (Admin)',
                url: '/analytics/emails',
                method: 'GET',
                authentication: 'Required (Bearer Token, Admin role only).',
                description: 'Retrieves email analytics data. This endpoint supports filtering, sorting, field limiting, and pagination.',
                queryParameters: [
                    { name: 'Filtering', example: '?intent=job_inquiry' },
                    { name: 'Sorting', example: '?sort=-date' },
                    { name: 'Field Limiting', example: '?fields=date,totalEmails,totalSpam' },
                    { name: 'Pagination', example: '?page=2&limit=10' }
                ],
                sampleRequests: [
                    {
                        language: 'curl',
                        code: `curl -X GET \\\n  '/api/v1/analytics/emails?sort=-date&limit=1' \\\n  -H 'Authorization: Bearer <ADMIN_JWT_TOKEN>'`
                    }
                ],
                sampleSuccessResponse: {
                    statusCode: '200 OK',
                    code: `{\n  "status": "success",\n  "results": 1,\n  "data": [\n    {\n      "_id": "60d5f2f5c7b3c3b3c3b3c3b6",\n      "date": "2023-01-01T00:00:00.000Z",\n      "totalEmails": 50,\n      "totalSpam": 5,\n      "averageSentiment": 0.8,\n      "intents": {\n        "job_inquiry": 10,\n        "project_proposal": 20,\n        "general_question": 15\n      }\n    }\n  ]\n}`
                }
            }
        ]
    }
  ],
};
