"use client";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useDeviceStore } from "@/hooks/use-data-store";

const pricingSchema = z.object({
  players: z.string(),
  pricePer30: z.string(),
  pricePerHour: z.string(),
});

const formSchema = z.object({
  deviceName: z.string().min(2, "Device name must be at least 2 characters"),
  deviceType: z.string().nonempty("Select a device type"),
  status: z.string().default("Active"),
  pricing: z.array(pricingSchema).min(1, "Add at least one pricing configuration"),
});

type FormValues = z.infer<typeof formSchema>;

export function AddDevice() {
  const devices = useDeviceStore((state) => state.devices);
  const addDevice = useDeviceStore((state) => state.addDevice);
  const addPricing = useDeviceStore((state) => state.addPricing);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deviceName: "",
      deviceType: "",
      status: "Active",
      pricing: [{ players: "1", pricePer30: "", pricePerHour: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "pricing",
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      const deviceRes = await axios.post("/api/device/create", {
        deviceName: values.deviceName,
        deviceType: values.deviceType,
        status: values.status,
      });
      addDevice(deviceRes.data.device);
      const deviceId = deviceRes.data.device.id;

      const res = await axios.post("/api/device/pricing", {
        deviceId,
        pricing: values.pricing,
      });

      if (res.status === 201) {
        addPricing(deviceId, values.pricing);
      }
 setOpen(false); 
      toast.success("Device and pricing added successfully ");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add device");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
<Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger asChild>

        <Button     onClick={() => setOpen(true)}  className="mt-2 bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 flex items-center gap-2">
          <Plus /> Add Device
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg bg-white text-black rounded-xl shadow-lg p-6">
        <DialogHeader>
          <DialogTitle>Add New Device</DialogTitle>
          <DialogDescription>Configure your device and its pricing</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Device Name */}
            <FormField
              control={form.control}
              name="deviceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="PS5-01 / VR-2 / PC-3"
                      className="border-gray-300 text-black placeholder-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Device Type */}
            <FormField
              control={form.control}
              name="deviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="border-gray-300 text-black">
                        <SelectValue placeholder="Select device type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PC">PC</SelectItem>
                        <SelectItem value="Ps4">PS4</SelectItem>
                        <SelectItem value="Ps5">PS5</SelectItem>
                        <SelectItem value="VR">VR</SelectItem>
                        <SelectItem value="Pool">Pool</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Pricing Configuration */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Pricing Configuration</h3>
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-4 gap-2 items-end">
                  <FormField
                    control={form.control}
                    name={`pricing.${index}.players`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Players</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="border-gray-300 text-black">
                              <SelectValue placeholder="1-4" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`pricing.${index}.pricePer30`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>₹ / 30min</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="50"
                            className="border-gray-300 text-black placeholder-gray-500"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`pricing.${index}.pricePerHour`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>₹ / hour</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="100"
                            className="border-gray-300 text-black placeholder-gray-500"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    variant="destructive"
                    className="mt-6"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:border-green-500"
                onClick={() => append({ players: "", pricePer30: "", pricePerHour: "" })}
              >
                + Add Another Pricing
              </Button>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <DialogClose asChild>
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:border-green-500">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                {isSubmitting ? "Adding..." : "Add Device"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
