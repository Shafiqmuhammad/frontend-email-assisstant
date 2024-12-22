// src/types/email.ts
export interface EmailDraft {
    id: number;
    content: string;
    recipient: string;
    context: string;
    timestamp: string;
    status: string;
    draft_version: number;
  }
  
  export interface EmailAnalysis {
    draft_id: number;
    draft_content: string;
    research_insights: ResearchInsight[];
  }
  
  export interface ResearchInsight {
    title: string;
    url: string;
  }