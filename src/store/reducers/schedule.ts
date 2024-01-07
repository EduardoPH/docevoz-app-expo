import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Schedule {
  ddd: string;
  name: string;
  phone: string;
  code: string;
  withReference: boolean;
  toDDD: string;
  toName: string;
  toPhone: string;
  date: string;
  hour: string;
  payment: string;
  voice: "male" | "female";
  createdAt?: string;
  customId?: string;
  songId?: string;
}

export interface IScheduleState {
  schedule: Schedule | null;
}

const initialState: IScheduleState = {
  schedule: {
    ddd: "",
    name: "",
    phone: "",
    code: "",
    withReference: false,
    toDDD: "244",
    toName: "",
    toPhone: "",
    voice: "female",
    hour: "",
    createdAt: "",
    date: "",
    customId: "",
    songId: "",
    payment: "",
  }
};

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    updateSchedule: (state, action: PayloadAction<Schedule | null>) => {
      state.schedule = action.payload;
    }
  },
});

export const { updateSchedule } = scheduleSlice.actions;

export default scheduleSlice.reducer;
