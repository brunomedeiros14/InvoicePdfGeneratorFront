import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { any, z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { BlobProvider, PDFDownloadLink } from '@react-pdf/renderer'
import { Plus } from 'lucide-react'
import PdfComponent from '../pdf/pdf-with-hook'
import MyDocument from '../pdf/sample-pdf'
import { UnitValueEnum } from '../types/product'
import { ModeToggle } from './mode-toggle'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

const ClientSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  address: z.string().nonempty({ message: 'Address is required' }),
  postalCode: z.string().nonempty({ message: 'Postal Code is required' }),
  neighborhood: z.string().nonempty({ message: 'Neighborhood is required' }),
  city: z.string().nonempty({ message: 'City is required' }),
  phoneNumber: z.string().nonempty({ message: 'Phone Number is required' }),
})

const ProductSchema = z.object({
  code: z.number().nonnegative({ message: 'Code must be a positive number' }),
  description: z.string().nonempty({ message: 'Description is required' }),
  unitValue: z.nativeEnum(UnitValueEnum),
  price: z.number().nonnegative({ message: 'Price must be a positive number' }),
})

const FormSchema = z.object({
  client: ClientSchema,
  products: z.array(any()),
  // products: z.array(ProductSchema),
  // .nonempty({ message: 'At least one product is required' }),
})

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      client: {
        name: '',
        address: '',
        postalCode: '',
        neighborhood: '',
        city: '',
        phoneNumber: '',
      },
      products: [],
    },
  })

  const formProduct = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      code: undefined,
      description: undefined,
      unitValue: undefined,
      price: undefined,
    },
  })

  const { append } = useFieldArray({
    control: form.control,
    name: 'products',
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data))
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  function onSubmitProduct(data: z.infer<typeof ProductSchema>) {
    append(data)
    formProduct.reset()
    console.log(formProduct.getValues())
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  return (
    <>
      <div className="relative">
        <h2>Informações do Cliente</h2>
        <div className="absolute right-0 top-0">
          <ModeToggle />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mt-4 flex flex-col gap-2 lg:flex-row">
              <FormField
                control={form.control}
                name="client.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="client.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input placeholder="Endereço" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="client.postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <Input placeholder="CEP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="client.neighborhood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input placeholder="Bairro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="client.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Cidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="client.phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="Telefone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>

        <div className="mt-4 grid grid-cols-1 gap-2 lg:grid-cols-2">
          <div className="space-y-4 rounded border p-2">
            <Form {...formProduct}>
              <form
                onSubmit={formProduct.handleSubmit(onSubmitProduct)}
                className="space-y-6"
              >
                <h2 className="mb-4">Adicione um produto</h2>
                <div className="grid grid-cols-2 gap-2 lg:flex-row">
                  <FormField
                    control={formProduct.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Código"
                            {...field}
                            onChange={(event) => {
                              if (isNaN(Number(event.target.value))) return
                              field.onChange(Number(event.target.value))
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formProduct.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Input placeholder="Descrição" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formProduct.control}
                    name="unitValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unidade</FormLabel>
                        <FormMessage />
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="lg:min-w-44">
                              <SelectValue placeholder="Selecione o valor" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={UnitValueEnum.BOX.valueOf()}>
                              Caixa
                            </SelectItem>
                            <SelectItem value={UnitValueEnum.UNIT.valueOf()}>
                              Unidade
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formProduct.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preço</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="0.0"
                            {...field}
                            onChange={(e) => {
                              if (isNaN(Number(e.target.value))) return
                              field.onChange(Number(e.target.value))
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
            <Button onClick={formProduct.handleSubmit(onSubmitProduct)}>
              Adicionar Produto <Plus />
            </Button>
          </div>
          <div className="flex flex-col rounded border p-2">
            <h2 className="mb-4">Lista de produtos</h2>
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Nenhum produto adicionado
            </div>
          </div>
        </div>
        <div className="row mt-4 flex flex-col gap-2 lg:flex-row">
          <Button className="hidden" onClick={form.handleSubmit(onSubmit)}>
            Teste de envio
          </Button>

          <Button type="button" asChild>
            <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
              Baixar PDF
            </PDFDownloadLink>
          </Button>

          <BlobProvider document={<MyDocument />}>
            {({ url, loading }) => {
              if (loading || url == null) return 'Carregando o documento...'
              return (
                <Button type="button" asChild>
                  <a className="" href={url} target="_blank">
                    Abrir PDF
                  </a>
                </Button>
              )
            }}
          </BlobProvider>

          <PdfComponent />
        </div>
      </div>
    </>
  )
}
