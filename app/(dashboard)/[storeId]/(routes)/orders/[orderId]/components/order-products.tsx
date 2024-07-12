"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { toast } from "react-hot-toast";

import { useState } from "react";
import type { Product, OrderItem } from "@/types";

import Modal from "@/components/modals/modal";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  productId: z.string().min(1),
  price: z.string().min(1),
  totalPrice: z.number(),
  quantity: z.number(),
});

interface StoreModalProps {
  products: Product[];
  initialData: OrderItem[] | null;
}

export const OrderProductModal: React.FC<StoreModalProps> = ({
  products,
  initialData,
}) => {
  const storeModal = useStoreModal();

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>(initialData || []);

  let data;
  if (orderItems && Array.isArray(initialData)) {
    data = initialData.map((item) => ({
      productId: item.product.id,
      price: item.product.price,
      totalPrice: item.price,
      quantity: item.quantity,
    }));
  } else {
    data = null;
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const product = products.find(
        (product) => product.id === values.productId
      );
      if (product) {
        setOrderItems([
          ...orderItems,
          {
            id: "",
            product,
            quantity: values.quantity,
            order: undefined,
            price: values.totalPrice,
          },
        ]);
      }

      toast.success("Product added successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };
 console.log(orderItems);
  return (
    orderItems &&
    orderItems.map((OrderedItem) => (
      <Accordion key={OrderedItem.id} type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>{OrderedItem.product.name}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="productId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product</FormLabel>
                          <Select
                            disabled={loading}
                            onValueChange={(value) => {
                              field.onChange(value);
                              const selectedProduct = products.find(
                                (product) => product.id === value
                              );
                              if (selectedProduct) {
                                form.setValue(
                                  "price",
                                  selectedProduct.price.toString()
                                );
                              }
                            }}
                            value={field.value}
                            defaultValue={OrderedItem.product.name}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  defaultValue={OrderedItem.product.name}
                                  placeholder="Select a Product"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {products.map((product) => (
                                <SelectItem key={product.id} value={product.id}>
                                  {product.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input
                              disabled={true}
                              placeholder="Product Price"
                              {...field}
                              defaultValue={OrderedItem.product.price}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              placeholder="Quantity"
                              {...field}
                              defaultValue={OrderedItem.quantity}
                              onChange={(e) => {
                                field.onChange(e);
                                const quantity = parseInt(e.target.value, 10);
                                const price = parseFloat(
                                  form.getValues("price")
                                );
                                if (!isNaN(quantity) && !isNaN(price)) {
                                  form.setValue("totalPrice", quantity * price);
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="totalPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Price</FormLabel>
                          <FormControl>
                            <Input
                              disabled={true}
                              placeholder="Total Price"
                              {...field}
                              defaultValue={OrderedItem.price}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ))
  );
};
