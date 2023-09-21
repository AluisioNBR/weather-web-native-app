interface MainTemperatureProps {
  icon: string;
  temperature: number;
  description: string;
}

interface MainDescriptionProps {
  children: string;
  icon: string;
  imgSize?: number;
  descriptionSize?: number;
}

export type { MainTemperatureProps, MainDescriptionProps };
