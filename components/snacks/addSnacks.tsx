"use client";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/utils/uploadthing";
import { useState } from "react";
import Image from "next/image";
import { useSnackData } from "@/hooks/use-data-store";

const formSchema = z.object({
  snackName: z.string().min(2, "Snack name must be at least 2 characters"),
  price: z.string().nonempty("Please select a price"),
  quantity: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export function AddSnacks() {
  const snacks = useSnackData((state) => state.snacks);
  const setSnacks = useSnackData((state) => state.setSnacks);
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      snackName: "",
      price: "",
      quantity: "1",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const value = { ...values, imageUrl };
    try {
      const response = await axios.post("/api/snack/create", value);
      if (response.data.success) {
        toast.success("Snack created successfully ");
        setSnacks([...snacks, response.data.snack]);
        router.refresh();
      } else {
        toast.error(response.data.message || "Something went wrong ");
      }
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Server error ");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="
          flex items-center w-45 justify-center gap-2 py-3   text-md
          bg-white border border-gray-300 text-gray-900
          hover:bg-gray-100 hover:border-gray-400
          rounded-xl cursor-pointer shadow-sm hover:shadow-md transition-all duration-200
        ">
          <Plus className="w-5 h-5 text-gray-700" />
          Add New Item
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg bg-white text-black rounded-xl shadow-lg p-6">
        <DialogHeader>
          <DialogTitle>Add New Item/Snack</DialogTitle>
          <DialogDescription>
            Add info about the item or snack
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="snackName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter snack name"
                      className="border-gray-300 text-black placeholder-gray-400 focus:ring-green-400 focus:border-green-400"
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
                      placeholder="1"
                      className="border-gray-300 text-black placeholder-gray-400 focus:ring-green-400 focus:border-green-400"
                      {...field}
                    />
                  </FormControl>
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
                      type="number"
                      placeholder="₹50"
                      className="border-gray-300 text-black placeholder-gray-400 focus:ring-green-400 focus:border-green-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {imageUrl && (
              <div className="flex justify-center w-full rounded-2xl overflow-hidden my-2">
                <Image
                  src={imageUrl}
                  width={150}
                  height={150}
                  alt="Uploaded image"
                  className="object-cover rounded-2xl"
                />
              </div>
            )}

            <div className="my-2">
              <UploadDropzone
                endpoint={"imageUploader"}
                onClientUploadComplete={(res) => setImageUrl(res[0].ufsUrl)}
                onUploadError={(error: Error) => alert(`ERROR! ${error.message}`)}
                className="border-2 border-dashed border-gray-300 p-4 rounded-xl text-center text-gray-500 hover:border-green-500 transition-colors duration-200"
              />
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="text-gray-700 border-gray-300 hover:border-green-500 hover:text-black transition-colors duration-200"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white transition-colors duration-200"
              >
                Add Item
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
