interface AdditionalInformationsProps{
  children: string;
  value: string
}

function AdditionalInformations(props: AdditionalInformationsProps) {
  return (
    <p style={{
      textAlign: 'center',
      fontWeight: 400,
      margin: 0
    }}>
      {props.children}: {props.value}
    </p>
  );
}

export { AdditionalInformations }