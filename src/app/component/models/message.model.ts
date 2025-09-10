export type ContentPart = { type: 'text'; content: string } | { type: 'image'; src: string };

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  parts: ContentPart[];
}

export interface QueryDTO {
  query: string;
}
