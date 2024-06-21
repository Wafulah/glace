"use client";

import * as z from "zod"
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const router = useRouter();
  const user = useCurrentUser();

  const [loading, setLoading] = useState(false);
  const API_URL = `${process.env.NEXT_PUBLIC_API_ALL_URL}/api/stores`;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post(API_URL, values, {
        headers: {
            'Authorization': `Bearer ${user?.jwt_token}`,
            'Content-Type': 'application/json',
        },
    });
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage customers and orders."
      isOpen={storeModal.isOpen} 
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input disabled={loading} placeholder="Store Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button disabled={loading} variant="outline" onClick={storeModal.onClose}>
                    Cancel
                  </Button>
                  <Button disabled={loading} type="submit">Continue</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
};
