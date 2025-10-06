//usePulsa.tsx
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { isiPulsa, tambahKuota, kurangiMasaAktif } from "../redux/pulsaslice";

export default function usePulsa() {
    const { pulsa, kuota, masaAktif } = useSelector((state: RootState) => state.pulsa);
    const dispatch = useDispatch<AppDispatch>();

    return {
        pulsa,
        kuota,
        masaAktif,
        isiPulsa: (jumlah: number) => dispatch(isiPulsa(jumlah)),
        tambahKuota: (jumlah: number) => dispatch(tambahKuota(jumlah)),
        kurangiMasaAktif: (hari: number) => dispatch(kurangiMasaAktif(hari)),
    };
}