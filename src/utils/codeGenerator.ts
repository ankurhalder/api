import { Endpoint } from '@/types/documentation';

export const generateCurlSnippet = (endpoint: Endpoint): string => {
  let curl = `curl -X ${endpoint.method} '${endpoint.url}'`;

  if (endpoint.authentication.includes('Bearer Token')) {
    curl += ` \\\n  -H 'Authorization: Bearer <YOUR_JWT_TOKEN>'`;
  }

  if (endpoint.requestBody) {
    curl += ` \\\n  -H 'Content-Type: application/json'`;
    const body = endpoint.requestBody.reduce((acc, field) => {
      acc[field.field] = field.type === 'String' ? 'string' :
                         field.type === 'Number' ? 123 :
                         field.type === 'Boolean' ? true :
                         'value';
      return acc;
    }, {} as Record<string, string | number | boolean>);
    curl += ` \\\n  -d '${JSON.stringify(body, null, 2)}'`;
  }

  return curl;
};

export const generatePythonRequestsSnippet = (endpoint: Endpoint): string => {
  let python = `import requests\n\n`;
  python += `url = "${endpoint.url}"\n\n`;

  let payload = "{}";
  if (endpoint.requestBody) {
      const body = endpoint.requestBody.reduce((acc, field) => {
      acc[field.field] = field.type === 'String' ? 'string' :
                         field.type === 'Number' ? 123 :
                         field.type === 'Boolean' ? true :
                         'value';
      return acc;
    }, {} as Record<string, string | number | boolean>);
    payload = JSON.stringify(body, null, 4);
  }
  python += `payload = ${payload}\n\n`;

  let headers = "{}";
  if (endpoint.authentication.includes('Bearer Token') || endpoint.requestBody) {
    const headersObj: Record<string, string> = {};
    if (endpoint.requestBody) {
      headersObj['Content-Type'] = 'application/json';
    }
    if (endpoint.authentication.includes('Bearer Token')) {
      headersObj['Authorization'] = 'Bearer <YOUR_JWT_TOKEN>';
    }
    headers = JSON.stringify(headersObj, null, 4);
  }
  python += `headers = ${headers}\n\n`;

  python += `response = requests.request("${endpoint.method}", url, headers=headers, json=payload)\n\n`;
  python += `print(response.text)`;

  return python;
};

export const generateJavascriptFetchSnippet = (endpoint: Endpoint): string => {
  let js = `const url = '${endpoint.url}';\n`;

  let options = `{\n  method: '${endpoint.method}',\n`;

  const headers: Record<string, string> = {};
  if (endpoint.requestBody) {
    headers['Content-Type'] = 'application/json';
  }
  if (endpoint.authentication.includes('Bearer Token')) {
    headers['Authorization'] = 'Bearer <YOUR_JWT_TOKEN>';
  }

  options += `  headers: ${JSON.stringify(headers, null, 2)}`;

  if (endpoint.requestBody) {
    const body = endpoint.requestBody.reduce((acc, field) => {
      acc[field.field] = field.type === 'String' ? 'string' :
                         field.type === 'Number' ? 123 :
                         field.type === 'Boolean' ? true :
                         'value';
      return acc;
    }, {} as Record<string, string | number | boolean>);
    options += `,\n  body: JSON.stringify(${JSON.stringify(body, null, 2)})`;
  }

  options += `\n};`;

  js += `const options = ${options}\n\n`;

  js += `fetch(url, options)\n`;
  js += `  .then(res => res.json())\n`;
  js += `  .then(json => console.log(json))\n`;
  js += `  .catch(err => console.error('error:' + err));`;

  return js;
};
