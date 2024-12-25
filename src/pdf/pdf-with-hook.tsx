import { usePDF } from '@react-pdf/renderer'
import MyDocument from './sample-pdf'

const PdfComponent = () => {
  const [instance, _] = usePDF({ document: MyDocument() })

  if (instance.loading) return <div>Loading ...</div>

  if (instance.error) return <div>Something went wrong: {instance.error}</div>

  return (
    <a href={instance.url!} className="hidden" download="test.pdf">
      Baixar pdf 'a'
    </a>
  )
}

export default PdfComponent
