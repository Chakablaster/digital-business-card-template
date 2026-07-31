import cardConfig from '../config/card.config'
import { DigitalCard } from '../features/digital-card/components/DigitalCard'
import { usePageMetadata } from '../hooks/usePageMetadata'

function App() {
  usePageMetadata(cardConfig.metadata)

  return <DigitalCard />
}

export default App