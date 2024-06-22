"use client";

import * as React from "react";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { LuTrash2 as Trash } from "react-icons/lu";
import { Customer, Product, Order, OrderItem, Category, County } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
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
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import Select from "react-select";
// import makeAnimated from "react-select/animated";

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import { StoreModal } from "./order-items-modal";
import ImageUpload from "@/components/ui/image-upload";

const OrderItemSchema = z.object({
  productId: z.string(),
  name: z.string(),
  quantity: z.number().int(),
  price: z.string(),
  totalPrice: z.number(),
});

const formSchema = z.object({
  customerId: z.string().min(1),
  isPaid: z.boolean(),
  isDelivered: z.boolean(),
  phone: z.string(),
  address: z.string(),
  deliveryDate: z.date(),
  orderItems: z.array(OrderItemSchema),
});

type OrderFormValues = z.infer<typeof formSchema>;

interface AddOrderFormProps {
  initialData:
    | Order
    | (null & {
        orderItems: OrderItem[];
      });
  customers: Customer[];
  products: Product[];
  jwt_token?: string;
}

type Checked = DropdownMenuCheckboxItemProps["checked"];
// const animatedComponents = makeAnimated();

export const AddOrderForm: React.FC<AddOrderFormProps> = ({
  initialData,
  customers,
  products,
  jwt_token,
}) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const handleDone = (items: OrderItem[]) => {
    setOrderItems([...items]);
    console.log("page", orderItems);
    setIsModalOpen(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      orderItems: initialData.orderItems.map((item) => ({
        productid: item.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        totalPrice: item.price,
      })),
    },
  });

  const onSubmit = async (values: OrderFormValues) => {
    try {
      setLoading(true);
      const data = {
        ...values,
        orderItems: orderItems.map((item) => ({
          product: { id: item.product.id },
          quantity: item.quantity,
          price: item.price,
        })),
      };
      console.log("data", data);
      if (initialData) {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_ALL_URL}/${params.storeId}/orders/${params.orderId}/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${jwt_token}`,
            },
          }
        );
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_ALL_URL}/${params.storeId}/orders/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${jwt_token}`,
            },
          }
        );
      }
      router.refresh();
      toast.success("Order updated.");
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      // await axios.delete(
      //   `${process.env.NEXT_PUBLIC_API_ALL_URL}/stores/${params.storeId}/`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${jwt_token}`,
      //     },
      //   }
      // );
      // router.refresh();
      // router.push("/");
      toast.success("Order deleted.");
    } catch (error: any) {
      toast.error("An error occured.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  const onProducts = async () => {
    setIsModalOpen(true);
  };

  // Assuming this function is defined within the AddOrderForm component

  const showProducts = async () => {
    // Assuming orderItems are managed elsewhere and accessible in the component
    const data = {
      ...form.getValues(), // Get current form values using react-hook-form
      orderItems: orderItems.map((item) => ({
        product: { id: item.product.id }, // Assuming productId is correct field name
        quantity: item.quantity,
        price: item.price,
      })),
    };

    console.log("Data for debugging:", data);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title="Orders" description="Manage Orders" />
        {/* <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button> */}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a Customer"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.first_name}
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
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Address"
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Phone"
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="isDelivered"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Delivery</FormLabel>
                    <FormDescription>
                      Kindly Check this when you deliver the products.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPaid"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>isPaid</FormLabel>
                    <FormDescription>
                      Check this box if products are paid.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deliveryDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date the Client will receive the order.</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date: Date | undefined) =>
                          field.onChange(
                            date instanceof Date ? date : new Date()
                          )
                        }
                        disabled={(date: Date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Pick a date this will be delivered to customer.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="bg-green-500 rounded-lg" onClick={onProducts}>
              Add Products
            </Button>
          </div>

          <Button disabled={loading} className="ml-auto" onClick={showProducts}>
            Save changes
          </Button>
        </form>
      </Form>
      {isModalOpen && (
        <StoreModal
          products={products}
          initialData={initialData.orderItems}
          onDone={handleDone}
        />
      )}
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        variant="public"
        description={`${origin}/api/${params.storeId}`}
      />
    </>
  );
};
