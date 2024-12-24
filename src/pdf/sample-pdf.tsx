import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFF',
    fontSize: 12,
    padding: '10px 15px',
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

export const doc = (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.header}>
        <Text>DOCUMENTO AUXILIAR DE VENDA</Text>
        <Text>NÃO É UM DOCUMENTO FISCAL</Text>
      </View>

      <View style={styles.client}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '70%' }}>
            <Text style={{ flexGrow: 1 }}>Cliente: </Text>
            <Text>Enderenço: </Text>
            <Text>Bairro: </Text>
          </View>
          <View style={{}}>
            <Text style={{ flexGrow: 1 }}>Telefone: </Text>
            <Text>Cidade: </Text>
            <Text>CEP: </Text>
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

// Create Document Component
const MyDocument = () => doc

export default MyDocument
