interface MainTemperatureProps {
  icon: string;
  temperature: number;
  feels_like: number;
  description: string
}

interface MainDescriptionProps {
  children: string,
  icon: string,
  size?: undefined | number
}

export type { MainTemperatureProps, MainDescriptionProps }