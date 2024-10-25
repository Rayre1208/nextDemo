import { LightboxExternalProps } from 'yet-another-react-lightbox';

// ----------------------------------------------------------------------

export interface LightBoxProps extends LightboxExternalProps {
  disabledZoom?: boolean;
  disabledVideo?: boolean;
  disabledTotal?: boolean;
  disabledCaptions?: boolean;
  disabledSlideshow?: boolean;
  index?: number;
  disabledThumbnails?: boolean;
  disabledFullscreen?: boolean;
  onGetCurrentIndex?: (index: number) => void;
}
