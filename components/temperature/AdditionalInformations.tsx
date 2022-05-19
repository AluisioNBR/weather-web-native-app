interface AdditionalInformationsProps{
  children: string;
  value: string
}

function AdditionalInformations(props: AdditionalInformationsProps) {
  return (
    <div>
      <h3>{props.children}</h3>

      <div style={{
        textAlign: 'center',
        fontWeight: 400
      }}>{props.value}</div>
    </div>
  );
}

export { AdditionalInformations }