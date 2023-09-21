import { useState, useCallback, useContext } from "react";
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  useMediaQuery,
} from "@chakra-ui/react";

import { StatusAlert } from "./StatusAlert";
import { submitCity } from "./submitCity/submitCity";
import { colors } from "../styles/colors";

import type { FormEvent, ChangeEvent } from "react";
import type { CitySelectionProps } from "../types/CitySelection.types";
import type {
  StatusType,
  StatusState,
  TitleState,
} from "../types/StatusAlert.types";
import { MyApiSecretContext, CityContext } from "../pages";

export function CitySelection(props: CitySelectionProps) {
  const myApiSecret = useContext(MyApiSecretContext);
  const { city, state } = useContext(CityContext);
  const [isLowerThan720] = useMediaQuery("(max-width: 720px)");
  const [cityValue, setCityValue] = useState("");

  const [alertStatus, setAlertStatus]: StatusState = useState(
    undefined as StatusType
  );
  const [alertTitle, setAlertTitle]: TitleState = useState("");
  const [alertIsOpen, setAlertIsOpen] = useState(false);

  const submitForm = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    setAlertIsOpen(true);
    setAlertStatus("loading");
    setAlertTitle("Buscando cidade!");
    submitCity({
      cityValue,
      setCityValue,
      myApiSecret,
      citySelectionProps: props,
      setAlertStatus,
      setAlertTitle,
      setAlertIsOpen,
    });
    setCityValue("");
    console.log(cityValue);
  };

  const onCityValueChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setCityValue(event.target.value),
    []
  );

  return (
    <>
      <FormControl as="form" onSubmit={submitForm}>
        <FormLabel
          htmlFor="city-input"
          color={colors.white.main}
          textAlign="center"
          fontFamily="Poppins"
          fontSize="1.5rem"
          hidden
        >
          Informe sua cidade:
        </FormLabel>

        <Stack
          direction={isLowerThan720 ? "column" : "row"}
          align="center"
          justify="center"
        >
          <Input
            name="city-input"
            type="text"
            required={true}
            defaultValue={cityValue}
            onChange={onCityValueChange}
            placeholder={
              city == "" ? "Informe sua cidade" : `${city}, ${state}`
            }
            _placeholder={{ textColor: colors.white.main }}
            textAlign={"center"}
            fontFamily="Poppins"
            fontSize="1.1rem"
            p="0.5"
            borderRadius={75}
            color={colors.white.main}
            bgColor={colors.black["1"]}
            w={isLowerThan720 ? "20rem" : "30rem"}
          />
        </Stack>
      </FormControl>

      <StatusAlert
        status={alertStatus}
        title={alertTitle}
        isOpen={alertIsOpen}
      />
    </>
  );
}
