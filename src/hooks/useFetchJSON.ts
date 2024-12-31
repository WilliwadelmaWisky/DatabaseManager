import { useRef } from "react";

/**
 * 
 */
type Method = "GET" | "POST"

/**
 * 
 */
export function useFetchJSON() {

    const abortControllerRef = useRef<AbortController | null>(null);

    /**
     * 
     * @param address 
     * @param method
     * @param body
     * @param mode
     * @returns
     */
    const fetchHandler = async (url: string, method: Method = 'GET', body: BodyInit | null = null, mode: RequestMode = 'cors') => {
        if (abortControllerRef.current !== null) {
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();
        const response = await fetch(url, {
            method: method,
            mode: mode,
            body: body,
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