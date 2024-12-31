import { useState } from "react";
import { useFetchJSON } from "./useFetchJSON";

/**
 * 
 */
interface Connection {
    address: string,
    tables: string[]
}

/**
 * 
 */
export function useConnectDatabase(): [Connection | null, (address: string) => void] {
    const [connection, setConnection] = useState<Connection | null>(null);
    const [fetchJSON] = useFetchJSON();

    /**
     * 
     * @param address 
     */
    const connectDatabaseHandler = async (address: string) => {
        const url = `${address}/information_schema`;

        try {
            const data = await fetchJSON(url, 'GET');
            console.log(data);
            setConnection({
                address: address,
                tables: data.tables
            });
        } catch (error) {
            console.error(error);
        }
    };

    return [connection, connectDatabaseHandler];
}