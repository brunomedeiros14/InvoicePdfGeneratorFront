import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'

Font.register({
  family: 'Monospace',
  src: 'http://fonts.gstatic.com/s/ubuntumono/v6/ViZhet7Ak-LRXZMXzuAfkZ0EAVxt0G0biEntp43Qt6E.ttf',
  // src: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap'
})

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFF',
    fontSize: 12,
    padding: '10px 15px',
    fontFamily: 'Monospace', //Courier Helvetica Times-Roman
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    color: 'grey',
    borderBottom: '1px dashed #aaa',
    paddingBottom: 5,
    alignItems: 'center',
  },
  client: {
    padding: 5,
  },
  productsHeader: {
    borderBottom: '1px dashed #aaa',
    paddingBottom: 5,
    flexDirection: 'row',
    textAlign: 'center',
  },
  products: {
    flexDirection: 'row',
    textAlign: 'center',
    paddingBottom: 5,
  },
  pageNumber: {
    flexDirection: 'row',
    borderTop: '1px dashed #aaa',
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    marginHorizontal: 15,
    paddingTop: 5,
    color: 'grey',
  },
})

function MyDocument() {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.header}>
          <Text>DOCUMENTO AUXILIAR DE VENDA</Text>
          <Text>NÃO É UM DOCUMENTO FISCAL</Text>
        </View>

        <View style={styles.client}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '70%' }}>
              <Text>Cliente...: </Text>
              <Text>Enderenço.: </Text>
              <Text>Bairro....: </Text>
            </View>
            <View style={{}}>
              <Text>Telefone.: </Text>
              <Text>Cidade...: </Text>
              <Text>CEP......: </Text>
            </View>
          </View>
        </View>

        <View style={styles.productsHeader}>
          <Text style={{ width: '70%' }}>Descrição</Text>
          <Text style={{ width: '5%' }}>Qtd.</Text>
          <Text style={{ width: '5%' }}>Und.</Text>
          <Text style={{ width: '10%' }}>pr. Unit.</Text>
          <Text style={{ width: '10%' }}>Tot. Produto</Text>
        </View>

        {new Array(10).fill(0).map((_, i) => (
          <View key={i} style={styles.products}>
            <Text style={{ width: '70%' }}>desc {i}</Text>
            <Text style={{ width: '5%' }}>{i}</Text>
            <Text style={{ width: '5%' }}>CX</Text>
            <Text style={{ width: '10%' }}>R$ 10,00</Text>
            <Text style={{ width: '10%' }}>R$ {10 * i}</Text>
          </View>
        ))}

        <View style={styles.pageNumber}>
          <Text style={{ width: '25%' }}>
            Data: {new Date().toLocaleDateString()}
          </Text>
          <Text style={{ width: '50%' }}></Text>
          <Text style={{ width: '25%', textAlign: 'right' }}>
            Total: R$ 1000,00
          </Text>
        </View>
      </Page>
    </Document>
  )
}
export default MyDocument
