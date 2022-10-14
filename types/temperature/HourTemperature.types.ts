import type { HourWeather }	 from '../submitCity/weatherStateReducer.types'

interface HourlyTemperatureProps{ children: HourWeather }

interface HourModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: HourWeather
}

export type { HourlyTemperatureProps, HourModalProps }