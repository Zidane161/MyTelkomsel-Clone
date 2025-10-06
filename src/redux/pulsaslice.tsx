import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PulsaState {
  pulsa: number;
  kuota: number;
  masaAktif: number;
}

const initialState: PulsaState = {
  pulsa: 0,
  kuota: 0,
  masaAktif: 7, // default 7 hari
};

const pulsaSlice = createSlice({
  name: "pulsa",
  initialState,
  reducers: {
    isiPulsa: (state, action: PayloadAction<number>) => {
      state.pulsa += action.payload;
      state.masaAktif += 1;
    },
    tambahKuota: (state, action: PayloadAction<number>) => {
      state.kuota += action.payload;
      state.masaAktif +=  2;
    },
    kurangiMasaAktif: (state, action: PayloadAction<number>) => {
      if (state.masaAktif > 0) {
        state.masaAktif -= action.payload;
      }
    },
    resetPulsa: (state) => {
      state.pulsa = 0;
      state.kuota = 0;
      state.masaAktif = 0;
    },
  },
});

export const { isiPulsa, tambahKuota, kurangiMasaAktif, resetPulsa } =
  pulsaSlice.actions;

export default pulsaSlice.reducer;
