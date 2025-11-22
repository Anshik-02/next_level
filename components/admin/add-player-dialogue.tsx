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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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
import { usePlayerData } from "@/hooks/use-data-store";
import { useEffect, useState } from "react";

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  device: z.string().nonempty("Please select a device"),
  players: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export function AddPlayer() {
  const players = usePlayerData((state) => state.players);
  const setPlayers = usePlayerData((state) => state.setPlayers);
  const router = useRouter();

  const [availableDevices, setAvailableDevices] = useState<
    { id: number; deviceName: string; pricing: { players: number }[] }[]
  >([]);
  const [selectedDevice, setSelectedDevice] = useState<string>("");

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get("/api/device/info");
        const available = response.data.filter((d: any) => d.isAvailable);
        setAvailableDevices(available);
      } catch (err) {
        console.error("Failed to fetch devices", err);
      }
    };
    fetchDevices();
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      device: "",
      players: "1",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await axios.post("/api/player/create", values);
      if (response.data.success) {
        toast.success("Player created successfully 🎮");
        setPlayers([...players, response.data.player]);
        router.refresh();
      } else {
        toast.error(response.data.message || "Something went wrong ");
      }
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Server error ");
    }
  };

  const selectedDeviceObj = availableDevices.find(
    (d) => d.deviceName === selectedDevice
  );
  const validPlayerCounts =
    selectedDeviceObj?.pricing?.map((p) => p.players.toString()) || [];

  return (
    <Dialog>
      <DialogTrigger asChild>
       <button className="
  flex items-center gap-2 px-4 py-2 mb-5 mt-5
  rounded-lg  border border-slate-300
  bg-[#06B6D4]
text-white font-medium hover:bg-[#0E7490] cursor-pointer transition-colors
">
  <Plus className="w-5 h-5 text-white" />
  Add Player
</button>

      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-white backdrop-blur-2xl text-black rounded-xl shadow-lg p-6">
        <DialogHeader>
          <DialogTitle>Add New Player Session</DialogTitle>
          <DialogDescription>
            Add info about the new gaming session of a player
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Player/Group Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter player name"
                      className=" border-gray-700 text-black placeholder-gray-400 focus:ring-green-400 focus:border-green-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="device"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(val) => {
                        field.onChange(val);
                        setSelectedDevice(val);
                        form.setValue("players", "1");
                      }}
                    >
                      <SelectTrigger className="w-full border-gray-700 text-black">
                        <SelectValue placeholder="Select device" />
                      </SelectTrigger>
                      <SelectContent className="text-black bg-white hover:bg-gray-100">
                        <SelectGroup>
                          <SelectLabel>Devices</SelectLabel>
                          {availableDevices.length > 0 ? (
                            availableDevices.map((device) => (
                              <SelectItem key={device.id}  value={device.deviceName}>
                                {device.deviceName}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none" disabled>
                              No available devices
                            </SelectItem>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="players"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Players</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full border-gray-700 hover:bg-gray-100">
                        <SelectValue placeholder="Number of players" />
                      </SelectTrigger>
                      <SelectContent className="text-black bg-white hover:bg-gray-100">
                        <SelectGroup>
                          <SelectLabel>Players</SelectLabel>
                          {validPlayerCounts.length > 0 ? (
                            validPlayerCounts.map((count) => (
                              <SelectItem key={count} value={count}>
                                {count}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none" className="text-black" disabled>
                              Select a device first
                            </SelectItem>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4 flex justify-end gap-3">
              <DialogClose asChild>
                <Button
                  variant="default"
                  className="text-gray-700 border-gray-800 "
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Start Session
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
