import type { HourWeather } from "../submitCity/weatherStateReducer.types";

interface HourModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: HourWeather;
}

export type { HourModalProps };
