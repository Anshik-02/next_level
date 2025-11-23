import { create } from "zustand";

export type Snack = {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

export type SnackOrder = {
  id: number;
  snackItemId: number;
  playerSessionId: number;
  quantity: number;
  totalPrice: number;
  createdAt?: string;
  snackItem: {
    name: string;
    price: number;
    image?: string;
  };
};

export type Player = {
  id: string;
  playerName: string;
  players: number;
  device: string;
  startTime: string;
  endTime?: string | null;
  totalTimePlayer?: number | null;
  snacks: SnackOrder[];
  totalBill?: number;
  isActive: boolean;
  createdAt?: string;
  status?: string;
  bill?: string;
  actions?: string;
  endSession?: boolean;
  isPaused?: boolean;
  pausedAt?: string | null;
  totalPausedDuration?: number;
};

type SnackStore = {
  snacks: Snack[];
  setSnacks: (data: Snack[]) => void;
};

export const useSnackData = create<SnackStore>((set) => ({
  snacks: [],
  setSnacks: (data) => set({ snacks: data }),
}));

// ✅ Player store with update method
type PlayerStore = {
  players: Player[];
  setPlayers: (data: Player[] | ((prev: Player[]) => Player[])) => void;
  updatePlayer: (id: number, updatedFields: Partial<Player>) => void;
};


export const usePlayerData = create<PlayerStore>((set) => ({
  players: [],
  setPlayers: (data) =>
    typeof data === "function"
      ? set((state) => ({ players: data(state.players) }))
      : set({ players: data }),

  updatePlayer: (id, updatedFields) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === id ? { ...p, ...updatedFields } : p
      ),
    })),
}));



export type DevicePricing = {
  id?: number;
  players: number;
  pricePer30: number;
  pricePerHour: number;
};

export type Device = {
  id?: number;
  deviceName: string;
  deviceType: "PC" | "Ps4" | "Ps5" | "VR" | "Pool";
  status: "Active" | "Maintenance";
  isAvailable?: boolean;
  pricing: DevicePricing[];
};

type DeviceStore = {
  devices: Device[];
  setDevices: (devices: Device[]) => void;
  addDevice: (device: Device) => void;
  addPricing: (deviceId: number, newPricing: DevicePricing) => void;
  updatePricing: (deviceId: number, updatedPricing: DevicePricing[]) => void;

  // ⬇️ NEW
  fetchDevices: () => Promise<void>;
};

export const useDeviceStore = create<DeviceStore>((set) => ({
  devices: [],

  setDevices: (devices) => set({ devices }),

  addDevice: (device) =>
    set((state) => ({ devices: [...state.devices, device] })),

  addPricing: (deviceId, newPricing) =>
    set((state) => ({
      devices: state.devices.map((d) =>
        d.id === deviceId
          ? { ...d, pricing: [...(d.pricing || []), newPricing] }
          : d
      ),
    })),

  updatePricing: (deviceId, updatedPricing) =>
    set((state) => ({
      devices: state.devices.map((d) =>
        d.id === deviceId
          ? { ...d, pricing: updatedPricing || [] }
          : d
      ),
    })),

  // ⭐ NEW: Fetch devices from backend API
  fetchDevices: async () => {
    try {
      const response = await fetch("/api/device/info");
      if (!response.ok) throw new Error("Failed to fetch devices");

      const data = await response.json();
      set({ devices: data });
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  },
}));

