import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Meme, Category } from '../types'; // FIXED: Added 'type'

interface MemeContextType {
    memes: Meme[];
    loading: boolean;
    error: string | null;
}

// FIXED: Removed 'export' from here to stop Fast Refresh warning
const MemeContext = createContext<MemeContextType | undefined>(undefined);

const CATEGORIES: Category[] = ["animals", "celebrities", "gaming", "school", "random"];

export const MemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [memes, setMemes] = useState<Meme[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMemes = async () => {
            try {
                const res = await fetch('https://api.imgflip.com/get_memes');
                const json = await res.json();

                if (!json.success) throw new Error("API Error");

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const enriched: Meme[] = json.data.memes.map((m: any) => { // FIXED: explicit any ignore
                    const rating = Math.floor(Math.random() * 5) + 1;
                    return {
                        ...m,
                        rating,
                        category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
                        price: rating * 25
                    };
                });
                setMemes(enriched);
            } catch { // FIXED: Removed unused 'err' variable
                setError("Failed to load memes 😢");
            } finally {
                setLoading(false);
            }
        };

        void fetchMemes(); // FIXED: Added 'void' to handle Promise
    }, []);

    return (
        <MemeContext.Provider value={{ memes, loading, error }}>
            {children}
        </MemeContext.Provider>
    );
};

export const useMemeData = () => {
    const context = useContext(MemeContext);
    if (!context) throw new Error("useMemeData must be used within MemeProvider");
    return context;
};