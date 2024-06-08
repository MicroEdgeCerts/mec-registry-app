'use client'

import { useEffect, useState } from 'react'
import { Connector, useConnect } from 'wagmi'

type WalletOptionPropType = {
  connector: Connector
  onClick: () => void
}

const  WalletOption: React.FC<WalletOptionPropType> = ({
  connector,
  onClick  }) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    ;(async () => {
      const provider = await connector.getProvider()
      setReady(!!provider)
    })()
  }, [connector])

  return <button disabled={!ready} onClick={onClick}>
        {connector.name}
      </button>
}


const WalletOptions = () => {
  const { connectors, connect } = useConnect()
  return <div>
    { connectors.map((connector) => <WalletOption
      key={connector.uid}
      connector={connector}
      onClick={() => connect({ connector }
      )} /> )}
    </div>
}

export default WalletOptions;
