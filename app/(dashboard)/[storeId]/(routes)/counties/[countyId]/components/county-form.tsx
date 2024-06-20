"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { LuTrash2 as Trash } from "react-icons/lu";
import { County } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(2),
});

type CountyFormValues = z.infer<typeof formSchema>;

interface CountyFormProps {
  initialData: County | null;
}

export const CountyForm: React.FC<CountyFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const user = useCurrentUser();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit county" : "Create county";
  const description = initialData ? "Edit a county." : "Add a new county";
  const toastMessage = initialData ? "County updated." : "County created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<CountyFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: CountyFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_ALL_URL}/api/${params.storeId}/counties/${params.countyId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${user?.session_token}`,
            },
          }
        );
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_ALL_URL}/api/${params.storeId}/counties`,
          data,
          {
            headers: {
              Authorization: `Bearer ${user?.session_token}`,
            },
          }
        );
      }
      router.refresh();
      router.push(`/${params.storeId}/counties`);
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
        `${process.env.NEXT_PUBLIC_API_ALL_URL}/api/${params.storeId}/counties/${params.countyId}`,
        {
          headers: {
            Authorization: `Bearer ${user?.session_token}`,
          },
        }
      );
      router.refresh();
      router.push(`/${params.storeId}/counties`);
      toast.success("County deleted.");
    } catch (error: any) {
      toast.error("Make sure you removed all Stores using this countyy first.");
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
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="County name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    placeholder="Product description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
