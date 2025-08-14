export interface ModuleData {
  id: string;
  type: 'heading' | 'highlight' | 'stats' | 'security' | 'image';
  data: any;
  htmlStart: number;
  htmlEnd: number;
}

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onMetaGenerated?: (meta: { title: string; description: string; keywords: string[] }) => void;
  onCleanContentChange?: (cleanContent: string) => void;
}

export type ModuleType = 'heading' | 'highlight' | 'stats' | 'security' | 'image';

export type ViewType = 'modules' | 'heading' | 'highlight' | 'stats' | 'security' | 'image';

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
  uploadedBy: string;
}

export interface HeadingModuleData {
  number: string;
  title: string;
  htmlTag: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export interface HighlightModuleData {
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'error';
}

export interface StatsModuleData {
  title: string;
  description: string;
  stats: Array<{
    label: string;
    value: string;
    description?: string;
  }>;
}

export interface SecurityModuleData {
  title: string;
  content: string;
  level: 'low' | 'medium' | 'high';
}

export interface ImageModuleData {
  url: string;
  alt: string;
  height: number;
  caption?: string;
}



export interface FloatingToolbarPosition {
  top: number;
  left: number;
  show: boolean;
} 