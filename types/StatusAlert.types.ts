import { Dispatch, SetStateAction } from "react";

type StatusType = "info" | "warning" | "success" | "error" | "loading" | undefined
type DescriptionType = string | JSX.Element

interface StatusAlertProps {
  status: StatusType;
  title: string;
  children?: string | JSX.Element | undefined;
  isOpen: boolean
}

type StatusState = [StatusType, Dispatch<SetStateAction<StatusType>>]
type TitleState = [string, Dispatch<SetStateAction<string>>]
type DescriptionState = [DescriptionType, Dispatch<SetStateAction<DescriptionType>>]

export type {
  StatusAlertProps,
  StatusType,
  DescriptionType,
  StatusState,
  TitleState,
  DescriptionState
}