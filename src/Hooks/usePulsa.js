import { useState } from "react";

export default function usePulsa(initialPulsa = 0, initialKuota = 0) {
    const [pulsa, setPulsa] = useState(initialPulsa);
    const [kuota, setKuota] = useState(initialKuota);

    const isiPulsa = (jumlah = 10000) => setPulsa((prev) => prev + jumlah);
    const tambahKuota = (jumlah = 1) => setKuota((prev) => prev + jumlah);

    return { pulsa, kuota, isiPulsa, tambahKuota};
}