import type { AdditionalInformationsProps } from '../../types/temperature/AdditionalInformations.types'

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