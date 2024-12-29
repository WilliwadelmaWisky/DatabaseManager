import { useRef } from "react";

/**
 * 
 */
type Method = "GET" | "POST"

/**
 * 
 */
export function useFetch() {

    const abortControllerRef = useRef<AbortController | null>(null);

    /**
     * 
     * @param address 
     */
    const fetchHandler = async (url: string, method: Method, mode: RequestMode = 'cors') => {
        if (abortControllerRef.current !== null) {
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();
        const response = await fetch(url, {
            method: method,
            mode: mode,
            signal: abortControllerRef.current.signal
        });

        if (!response.ok) {
            throw new Error("response not ok");
        }

        const json = await response.json();
        return json;
    };

    return [fetchHandler];
}