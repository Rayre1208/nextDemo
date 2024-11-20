import { StackProps } from '@mui/material/Stack';

// ----------------------------------------------------------------------

export interface ColorPreviewProps extends StackProps {
  colors: string[];
  limit?: number;
}

export interface TutorNATProps extends StackProps {
  multi?: boolean;
  colors: string[];
  tutorsNAT: string[];
  selected: string | string[];
  tutorSelected?: string | string[];
  limit?: 'auto' | number;
  onSelectColor?: (color: string | string[]) => void;
  onSelectTutorNat: (tutorsNAT: string | string[]) => void;
}

export interface ColorPickerProps extends StackProps {
  multi?: boolean;
  colors: string[];
  tutorsNAT: string[];
  selected: string | string[];
  limit?: 'auto' | number;
  onSelectColor: (color: string | string[]) => void;
}
