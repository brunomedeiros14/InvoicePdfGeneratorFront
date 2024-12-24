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
import { Plus, Trash } from 'lucide-react'
import PdfComponent from '../pdf/pdf-with-hook'
import MyDocument from '../pdf/sample-pdf'
import { UnitValueEnum } from '../types/product'
import { ModeToggle } from './mode-toggle'

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
      products: [
        { code: 0, description: '', unitValue: UnitValueEnum.UNIT, price: 0 },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-between">
          <h2>Informações do Cliente</h2>
          <ModeToggle />
        </div>
        <div className="flex gap-2">
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

        <div className="flex justify-between">
          <h2>Produtos</h2>
          <Button
            type="button"
            onClick={() =>
              append({
                code: 0,
                description: '',
                unitValue: UnitValueEnum.UNIT,
                price: 0,
              })
            }
          >
            Adicionar Produto <Plus />
          </Button>
        </div>
        <div className="rounded-lg border p-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex w-fit items-end gap-4">
              <FormField
                control={form.control}
                name={`products.${index}.code`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código</FormLabel>
                    <FormControl>
                      <Input placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`products.${index}.description`}
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
                control={form.control}
                name={`products.${index}.unitValue`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Value</FormLabel>
                    <FormControl>
                      <select {...field}>
                        <option value={UnitValueEnum.BOX}>BOX</option>
                        <option value={UnitValueEnum.UNIT}>UNIT</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`products.${index}.price`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço</FormLabel>
                    <FormControl>
                      <Input placeholder="0.0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant={'destructive'}
                size={'icon'}
                type="button"
                onClick={() => remove(index)}
              >
                <Trash />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button type="submit">Teste de envio</Button>

          <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
            <Button>Baixar PDF</Button>
          </PDFDownloadLink>

          <BlobProvider document={<MyDocument />}>
            {({ url, loading }) => {
              if (loading || url == null) return 'Loading document...'
              return (
                <a href={url} target="_blank">
                  <Button>Abrir PDF</Button>
                </a>
              )
            }}
          </BlobProvider>
          <PdfComponent />
        </div>
      </form>
    </Form>
  )
}
