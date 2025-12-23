export interface Meme {
    id: string;
    name: string;
    url: string;
    width: number;
    height: number;
    box_count: number;
    // Enhanced properties
    rating: number;
    category: string;
    price: number;
}

export interface User {
    username: string;
    loggedIn: boolean;
}

export interface CartItem extends Meme {
    quantity: number;
}

export type Category = "animals" | "celebrities" | "gaming" | "school" | "random";