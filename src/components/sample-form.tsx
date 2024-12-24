import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

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
import { Trash } from 'lucide-react'
import { UnitValueEnum } from '../types/product'

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
  products: z.array(ProductSchema),
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
        <h2>Client Information</h2>
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="client.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Client Name" {...field} />
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
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Client Address" {...field} />
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
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="Postal Code" {...field} />
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
                <FormLabel>Neighborhood</FormLabel>
                <FormControl>
                  <Input placeholder="Neighborhood" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="client.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} />
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
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <h2>Products</h2>
        <div className="rounded-lg border p-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4">
              <FormField
                control={form.control}
                name={`products.${index}.code`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Product Code"
                        {...field}
                      />
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Product Description" {...field} />
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
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Product Price"
                        {...field}
                      />
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
          Add Product
        </Button>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
