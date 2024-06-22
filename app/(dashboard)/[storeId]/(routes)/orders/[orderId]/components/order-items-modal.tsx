"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { toast } from "react-hot-toast";

import { useState } from "react";
import type { Product, OrderItem } from "@/types";

import { Modal } from "@/components/ui/modal";
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
  initialData: OrderItem[];
  onDone: (orderItems: OrderItem[]) => void;
}

export const StoreModal: React.FC<StoreModalProps> = ({
  products,
  initialData,
  onDone,
}) => {
  const storeModal = useStoreModal();

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>(initialData || []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      price: "",
      totalPrice: 0,
      quantity: 0,
    },
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

      form.reset();
      toast.success("Product added successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDone = () => {
    onDone(orderItems);
    closeModal();
  };

  return (
    isModalOpen && (
      <Modal
        title="Add Products"
        description="Select Products and Quantity to add to your order."
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <div>
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
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                defaultValue={field.value}
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
                            type="number"
                            disabled={loading}
                            placeholder="Quantity"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.valueAsNumber;
                              field.onChange(value);
                              const price = parseFloat(form.getValues("price"));
                              if (!isNaN(value) && !isNaN(price)) {
                                form.setValue("totalPrice", value * price);
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
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button
                      variant="destructive"
                      disabled={loading}
                      onClick={closeModal}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="secondary"
                      disabled={loading}
                      type="submit"
                    >
                      Continue
                    </Button>
                  </div>
                </form>
              </Form>
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  className="bg-green-500"
                  disabled={loading}
                  onClick={handleDone}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  );
};
