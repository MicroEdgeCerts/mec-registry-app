import * as React from 'react'
import { Connector, useConnect } from 'wagmi'

type WalletOptionPropType = {
  connector: Connector
  onClick: () => void
}
const  WalletOption: React.FC<WalletOptionPropType> = ({
  connector,
  onClick  }) => {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    ;(async () => {
      const provider = await connector.getProvider()
      setReady(!!provider)
    })()
  }, [connector])

  return (
    <button disabled={!ready} onClick={onClick}>
      {connector.name}
    </button>
  )
}


const WalletOptions = () => {
  const { connectors, connect } = useConnect()

  return <>
    { connectors.map((connector) => <WalletOption
      key={connector.uid}
      connector={connector}
      onClick={() => connect({ connector })}
    /> )}
    </>
  
}

export default WalletOptions;
