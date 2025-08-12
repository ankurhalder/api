export interface QuickStartItem {
  title: string;
  content: string;
}

export interface Point {
  title: string;
  content: string;
}

export interface Endpoint {
  id: string;
  title: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  description: string;
  sampleRequest?: string;
  sampleResponse?: string;
}

export interface SubSection {
  id: string;
  title: string;
  endpoints?: Endpoint[];
}

export interface Section {
  id: string;
  title: string;
  content: string;
  points?: Point[];
  subSections?: SubSection[];
}

export interface DocumentationData {
  title: string;
  version: string;
  baseUrl: string;

  quickStart: QuickStartItem[];
  introduction: string;
  sections: Section[];
}
