"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
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
} from "../ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";
import { usePlayerData, useSnackData } from "@/hooks/use-data-store";

const formSchema = z.object({
  snacks: z.array(z.number()).nonempty("Select at least one snack"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

type FormValues = z.infer<typeof formSchema>;
type PlayerId = { playerId: string };

export function SnackDropDown({ playerId }: PlayerId) {
  const snacks = useSnackData((state) => state.snacks);
  const setSnacks = useSnackData((state) => state.setSnacks);
  const setPlayers = usePlayerData((state) => state.setPlayers);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/snack/info");
        setSnacks(response.data);
      } catch (error) {
        console.error("Error fetching snack info:", error);
      }
    };
    fetchData();
  }, [setSnacks]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      snacks: [],
      quantity: 1,
    },
  });

  const onError = (errors: any) => {
    console.log("Form submission failed. Errors:", errors);
    toast.error("Please select at least one snack and a valid quantity.");
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const payload = { ...values, playerId };
      const response = await axios.patch("/api/player/create", payload);
      if (response.data.success) {
        toast.success("Snacks added successfully");
        const updatedPlayerRes = await axios.get(
          `/api/player/singleInfo?playerId=${playerId}`
        );
        const updatedPlayer = updatedPlayerRes.data.player;
        setPlayers((prev) =>
          prev.map((p) => (p.id === updatedPlayer.id ? updatedPlayer : p))
        );
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Server error");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"default"}  className="flex items-center gap-2 hover:text-black border border-zinc-300 mt-1 cursor-pointer">
          <Plus /> Add Snacks
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px] bg-white text-zinc-900 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Select Snacks</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="space-y-6"
          >
            <FormField
              name="snacks"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-zinc-900">
                    Available Snacks
                  </FormLabel>

                  <div className="max-h-60 overflow-y-auto border border-zinc-200 rounded-xl p-3 space-y-3 bg-white shadow-sm">
                    {snacks.map((snack) =>
                      snack.quantity > 0 ? (
                        <label
                          key={snack.id}
                          className="flex items-center justify-between bg-white hover:bg-zinc-50 transition-all px-4 py-3 rounded-xl cursor-pointer border border-zinc-200 shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              value={snack.id}
                              checked={field.value.includes(snack.id)}
                              onChange={() => {
                                if (field.value.includes(snack.id)) {
                                  field.onChange(
                                    field.value.filter((id) => id !== snack.id)
                                  );
                                } else {
                                  field.onChange([...field.value, snack.id]);
                                }
                              }}
                              className="accent-green-600 h-5 w-5"
                            />

                            <div className="flex flex-col">
                              <span className="font-medium text-zinc-900 text-base">
                                {snack.name}
                              </span>
                              <span className="text-xs text-zinc-500">
                                {snack.quantity} left
                              </span>
                            </div>
                          </div>

                          <span className="text-sm font-semibold text-green-600">
                            ₹{snack.price}
                          </span>
                        </label>
                      ) : null
                    )}
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-900">Quantity (per item)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter quantity"
                      min={1}
                      {...field}
                      className="border border-zinc-300 bg-white text-zinc-900 placeholder-zinc-400 focus:ring-2 focus:ring-green-400 focus:border-green-400"
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? 0 : Number(value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-end gap-3">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                Add Snacks
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default SnackDropDown;
