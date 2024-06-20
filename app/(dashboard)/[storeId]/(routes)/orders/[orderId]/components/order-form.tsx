"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { LuTrash2 as Trash } from "react-icons/lu";
import { Order } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormDescription,
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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
    isDelivered: z.boolean().default(false).optional(),
    deliveryDate: z
        .date({
            required_error: "A date of Delivery is required.",
        })
        .default(() => new Date()),
});

type OrderFormValues = z.infer<typeof formSchema>;

interface OrderFormProps {
    initialData: z.infer<typeof formSchema> | null;
}

export const OrderForm: React.FC<OrderFormProps> = ({ initialData }) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit Order" : "Create Order";
    const description = initialData ? "Edit a Order." : "Add a new Order";
    const toastMessage = initialData ? "Order updated." : "Order created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<OrderFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            isDelivered: false,
        },
    });

    const onSubmit = async (data: OrderFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(
                    `/api/${params.storeId}/delivered/${params.orderId}`,
                    data
                );
            } else {
                await axios.post(`/api/${params.storeId}/delivered`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/orders`);
            toast.success(toastMessage);
        } catch (error: any) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(
                `/api/${params.storeId}/delivere-d/${params.orderId}`
            );
            router.refresh();
            router.push(`/${params.storeId}/orders`);
            toast.success("Order deleted.");
        } catch (error: any) {
            toast.error(
                "Make sure you removed all products using this order first."
            );
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="md:grid md:grid-cols-2 gap-8">
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
                                            Kindly Check this when you deliver
                                            the products.
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
                                    <FormLabel>
                                        Date the Client will receive the order.
                                    </FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            "PPP"
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={(date) =>
                                                    field.onChange(
                                                        date instanceof Date
                                                            ? date
                                                            : new Date()
                                                    )
                                                }
                                                disabled={(date) =>
                                                    date < new Date(new Date().setHours(0, 0, 0, 0))
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Pick a date this will be delivered to
                                        customer.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled={loading}
                        className="ml-auto"
                        type="submit"
                    >
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};

