export interface TableOfContentsItem {
  title: string;
  id: string;
}

export interface GettingStartedInfo {
  title: string;
  content: string;
  baseUrl: {
    title:string;
    content: string;
    url: string;
  };
  authentication: {
    title: string;
    content: string;
    exampleHeader: string;
  };
}

export interface RequestBodyField {
  field: string;
  type: string;
  required: string;
  validationRules: string;
  description: string;
}

export interface SampleRequest {
  language: 'curl' | 'axios';
  code: string;
}

export interface SampleResponse {
  statusCode: string;
  description?: string;
  code: string;
}

export interface UrlParameter {
  parameter: string;
  type: string;
  description: string;
}

export interface Endpoint {
  id: string;
  title: string;
  url: string;
  method: 'POST' | 'GET' | 'PATCH' | 'DELETE';
  authentication: string;
  requestBody?: RequestBodyField[];
  urlParameters?: UrlParameter[];
  sampleRequests?: SampleRequest[];
  sampleSuccessResponse?: SampleResponse;
  sampleErrorResponses?: SampleResponse[];
  mockResponse?: {
    success: {
      statusCode: number;
      body: Record<string, unknown>;
    };
    error: {
      statusCode: number;
      body: Record<string, unknown>;
    };
  };
  description?: string;
  headers?: { header: string; type: string; description: string }[];
  status?: string;
  caching?: string;
  contentType?: string;
  requestBodyType?: 'json' | 'form-data';
  queryParameters?: { name: string, example: string }[];
  responseFormat?: string;
  rateLimiting?: string;
  generalRequestBody?: { field: string, type: string, required: boolean, description: string }[];
  useCases?: { useCaseId: string, description?: string, payload: { field: string, type: string, description: string }[], caching?: string }[];
  checks?: { database: { status: string }, cache: { status: string }, ai_gateway: { status: string, details: string } };
}

export interface ApiSection {
  id: string;
  title: string;
  description: string;
  endpoints: Endpoint[];
}

export interface TutorialStep {
  title: string;
  description: string;
  targetId: string; // The HTML id of the element to highlight
}

export interface Tutorial {
  id: string;
  title:string;
  description: string;
  steps: TutorialStep[];
}

export interface DocumentationData {
  title: string;
  version: string;
  generatedDate: string;
  tableOfContents: TableOfContentsItem[];
  welcomeMessage: string;
  gettingStarted: GettingStartedInfo;
  apiSections: ApiSection[];
  tutorials?: Tutorial[];
}
