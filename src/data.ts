import type { DocumentationData } from "./types";

export const documentationData: DocumentationData = {
  title: "Ankur Halder - Backend API Documentation",
  version: "1.2.0",
  baseUrl: "https://ankurhalder.onrender.com/api/v1",
  quickStart: [
    {
      title: "Base URL",
      content:
        "All API endpoints are relative to `https://ankurhalder.onrender.com/api/v1`.",
    },
    {
      title: "Authentication",
      content:
        "For protected admin endpoints, first obtain a JWT by sending a `POST` request to `/users/login`.",
    },
    {
      title: "Making Requests",
      content:
        "Include the JWT as a Bearer Token in the `Authorization` header for all protected requests. For state-changing requests (POST, PATCH, etc.), you must also include a CSRF token (see Authentication section).",
    },
  ],
  introduction:
    "This document provides a comprehensive, developer-focused guide to the backend API for the Ankur Halder portfolio website. The API is built on a robust stack including Node.js, Express.js, and MongoDB, and is designed to be secure, scalable, and highly available.\n\nKey features include a resilient, multi-provider AI service that intelligently cycles through models from Google Gemini, Groq, and OpenRouter, as well as automated background jobs that periodically fetch and cache statistics from the GitHub API to keep portfolio data fresh and dynamic.",
  sections: [
    {
      id: "authentication",
      title: "Authentication",
      content:
        "Endpoints marked with **(Admin Only)** are protected and require a Bearer Token in the `Authorization` header. The system uses JSON Web Tokens (JWT) for secure, stateless authentication and employs CSRF tokens to protect against cross-site request forgery on state-changing requests.",
      points: [
        {
          title: "Get a JWT (Bearer Token)",
          content:
            "Send a `POST` request to `/users/login` with valid admin credentials. The server will respond with a JWT.",
        },
        {
          title: "Use the JWT",
          content:
            "For all subsequent protected requests, include the received token in the `Authorization` header.\n\n* **Header**: `Authorization: Bearer <YOUR_JWT_TOKEN>`",
        },
        {
          title: "CSRF Token Protection (for State-Changing Requests)",
          content:
            "To protect against Cross-Site Request Forgery (CSRF) attacks, any authenticated request that modifies data (`POST`, `PATCH`, `PUT`, `DELETE`) requires an additional CSRF token. This is a crucial security measure that ensures requests are genuinely originating from your frontend application.\n\n* **Step 1: Get a CSRF Token**: Before making a sensitive request, your client application must first make a `GET` request to this endpoint:\n    * `GET /api/v1/csrf-token`\n    * The server will respond with a unique, temporary token.\n\n* **Step 2: Use the CSRF Token**: In your subsequent state-changing request, you must include this token in the `x-csrf-token` header.\n    * **Header**: `x-csrf-token: <YOUR_CSRF_TOKEN>`\n\nIf this token is missing or invalid, the server will reject the request with a `403 Forbidden` error.",
        },
      ],
    },
    {
      id: "public-api-endpoints",
      title: "Public API Endpoints",
      content:
        "These endpoints are publicly accessible and do not require authentication. They are governed by the following rate limits to ensure fair usage and service stability:",
      points: [
        {
          title: "Standard Limit",
          content:
            "150 requests per hour per IP address. Applies to most general endpoints.",
        },
        {
          title: "Lenient Limit",
          content:
            "30 requests per 15 minutes per IP address. Applies to more resource-intensive endpoints like AI helpers.",
        },
      ],
      subSections: [
        {
          id: "portfolio-data",
          title: "Portfolio Data",
          endpoints: [
            {
              id: "get-all-projects",
              title: "Get All Projects",
              method: "GET",
              path: "/portfolio/projects",
              description:
                "Retrieves a complete list of all public portfolio projects.",
              sampleResponse: `{\n  "status": "success",\n  "data": [\n    {\n      "_id": "60d5ec49f72e3e4a1c8f8b6d",\n      "title": "Space Otaku",\n      ...\n    }\n  ]\n}`,
            },
            {
              id: "get-all-skills",
              title: "Get All Skills",
              method: "GET",
              path: "/portfolio/skills",
              description:
                "Retrieves a list of all skills, augmented with the projects they are used in.",
              sampleResponse: `{\n  "status": "success",\n  "data": [\n    {\n      "_id": "60d5ec49f72e3e4a1c8f8b7e",\n      "title": "React",\n      ...\n    }\n  ]\n}`,
            },
          ],
        },
        {
          id: "github-statistics",
          title: "GitHub Statistics",
          endpoints: [
            {
              id: "get-all-public-stats",
              title: "Get All Public Project Stats",
              method: "GET",
              path: "/project-stats",
              description:
                "Retrieves the latest cached GitHub statistics for all public portfolio projects.",
              sampleResponse: `{\n  "status": "success",\n  "data": {\n    "1": {\n      "repo": "ankurhalder/spaceotaku",\n      "stars": 21,\n      "totalCommits": 837,\n      ...\n    }\n  }\n}`,
            },
          ],
        },
        {
          id: "interactions",
          title: "Interactions",
          endpoints: [
            {
              id: "get-all-endorsements",
              title: "Get All Endorsements",
              method: "GET",
              path: "/endorsements",
              description:
                "Retrieves the current endorsement counts for all skills and projects.",
              sampleResponse: `{\n  "status": "success",\n  "data": {\n    "skills": { "React": 10, "Node.js": 8 },\n    "projects": { "1": 5, "2": 12 }\n  }\n}`,
            },
            {
              id: "add-endorsement",
              title: "Add an Endorsement",
              method: "POST",
              path: "/endorsements",
              description:
                "Increments the endorsement count for a specified skill or project.",
              sampleRequest: `{\n  "type": "skill",\n  "id": "React"\n}`,
              sampleResponse: `{\n  "status": "success",\n  "data": {\n    "endorsements": 11\n  }\n}`,
            },
            {
              id: "submit-contact-form",
              title: "Submit Contact Form",
              method: "POST",
              path: "/email/contact",
              description:
                "Submits the contact form with optional file attachments.",
              sampleRequest: `// multipart/form-data\nname: "Jane Doe"\nemail: "jane.doe@example.com"\n...`,
              sampleResponse: `{\n  "success": true,\n  "message": "Message and file(s) received...",\n  "referenceId": "AH-1754939137587"\n}`,
            },
          ],
        },
      ],
    },
    {
      id: "ai-helper-endpoints",
      title: "AI Helper Endpoints",
      content:
        "These endpoints leverage the multi-provider AI service. The response for each includes a `usedModel` field, providing transparency into which AI model successfully handled the request.",
      subSections: [
        {
          id: "ai-endpoints",
          title: "",
          endpoints: [
            {
              id: "generate-project-idea",
              title: "Generate Project Idea",
              method: "POST",
              path: "/ai/project-idea",
              description:
                "Generates a creative and contextually relevant project idea based on a given technology.",
              sampleRequest: `{\n  "skill": "Next.js"\n}`,
              sampleResponse: `{\n  "status": "success",\n  "data": {\n    "idea": "Develop a hyper-local e-commerce platform...",\n    "usedModel": "groq:llama3-70b-8192"\n  }\n}`,
            },
            {
              id: "eli5",
              title: "Explain Like I'm 5 (ELI5)",
              method: "POST",
              path: "/ai/eli5",
              description:
                "Provides a simple, easy-to-understand analogy for a complex technology.",
              sampleRequest: `{\n  "skill": "Kubernetes"\n}`,
              sampleResponse: `{\n  "status": "success",\n  "data": {\n    "description": "Imagine you have many toy robots...",\n    "usedModel": "gemini:gemini-1.5-flash-latest"\n  }\n}`,
            },
            {
              id: "project-xray",
              title: "Project X-Ray Analysis",
              method: "POST",
              path: "/ai/project-xray",
              description:
                "Performs a high-level architectural analysis of a public GitHub repository.",
              sampleRequest: `{\n  "repo": "expressjs/express"\n}`,
              sampleResponse: `{\n  "status": "success",\n  "data": {\n    "analysis": "### Architectural Overview\\n...",\n    "usedModel": "openrouter:meta-llama/llama-3.1-70b-instruct"\n  }\n}`,
            },
            {
              id: "deep-dive",
              title: "Deep Dive Explanation",
              method: "POST",
              path: "/ai/deep-dive",
              description:
                "Generates a detailed, technically accurate explanation of a specific topic.",
              sampleRequest: `{\n  "skill": "Node.js",\n  "topic": "Event Loop"\n}`,
              sampleResponse: `{\n  "status": "success",\n  "data": {\n    "explanation": "The Node.js event loop is...",\n    "usedModel": "gemini:gemini-1.5-pro-latest"\n  }\n}`,
            },
          ],
        },
      ],
    },
    {
      id: "admin-endpoints",
      title: "Admin (Protected) Endpoints",
      content:
        "These endpoints require admin authentication and provide administrative and diagnostic functionalities.",
      subSections: [
        {
          id: "admin-github",
          title: "GitHub Statistics",
          endpoints: [
            {
              id: "get-private-stats",
              title: "Get Private Repo Stats",
              method: "GET",
              path: "/project-stats/private-stats",
              description:
                "Retrieves the latest cached GitHub stats for your private repositories.",
              sampleResponse: `{\n  "status": "success",\n  "data": {\n    "ankurhalder/ankurhalder-backend": {\n      ...\n    }\n  }\n}`,
            },
            {
              id: "trigger-stats-update",
              title: "Trigger Stats Update Job",
              method: "POST",
              path: "/project-stats/update",
              description:
                "Manually triggers the background job to update stats for all public projects.",
              sampleResponse: `{\n  "status": "success",\n  "message": "GitHub project stats update job has completed.",\n  "report": [\n    ...\n  ]\n}`,
            },
          ],
        },
        {
          id: "admin-ai",
          title: "AI Service Management",
          endpoints: [
            {
              id: "draft-email-reply",
              title: "Draft Email Reply",
              method: "POST",
              path: "/email/:id/draft-reply",
              description:
                "Generates an AI-drafted reply for a received email.",
              sampleResponse: `{\n  "status": "success",\n  "data": {\n    "draftReply": "Dear Jane Doe,...",\n    "usedModel": "groq:llama3-8b-8192"\n  }\n}`,
            },
            {
              id: "exhaustive-ai-test",
              title: "Exhaustive AI Test Job",
              method: "POST",
              path: "/ai/exhaustive-test",
              description:
                "Triggers an asynchronous background job to test all configured AI models.",
              sampleRequest: `{\n  "prompt": "What is the capital of West Bengal?"\n}`,
              sampleResponse: `{\n  "status": "success",\n  "message": "Exhaustive AI model test job has been started..."\n}`,
            },
          ],
        },
      ],
    },
    {
      id: "error-responses",
      title: "Error Responses",
      content:
        "Failed requests will return a standardized error response to ensure consistent error handling on the client-side.",
      points: [
        {
          title: "400 Bad Request",
          content:
            '```json\n{\n  "status": "fail",\n  "message": "Invalid input: Skill is required..."\n}\n```',
        },
        {
          title: "401 Unauthorized",
          content:
            '```json\n{\n  "status": "fail",\n  "message": "You are not logged in!"\n}\n```',
        },
        {
          title: "403 Forbidden",
          content:
            '```json\n{\n  "status": "fail",\n  "message": "You do not have permission..."\n}\n```',
        },
        {
          title: "503 Service Unavailable",
          content:
            '```json\n{\n  "status": "error",\n  "message": "The AI service is currently unavailable."\n}\n```',
        },
      ],
    },
  ],
};
