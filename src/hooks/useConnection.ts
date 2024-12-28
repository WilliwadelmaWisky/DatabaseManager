import { useRef, useState } from "react";

interface Connection {
    address: string,
    tables: string[]
}

export function useConnection(): [Connection | null, (address: string) => void] {
    const [connection, setConnection] = useState<Connection | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    /**
     * 
     * @param address 
     */
    const connect = async (address: string) => {
        const url = `http://${address}/information_schema`;

        if (abortControllerRef.current !== null) {
            abortControllerRef.current.abort();
        }

        try {
            abortControllerRef.current = new AbortController();
            const res = await fetch(url, {
                method: 'GET',
                signal: abortControllerRef.current.signal
            });

            if (!res.ok) {
                return;
            }

            const data = await res.json();
            setConnection({
                address: address,
                tables: data.tables
            });
        } catch (error) {
            console.error(error);
        }
    };

    return [connection, connect];
}