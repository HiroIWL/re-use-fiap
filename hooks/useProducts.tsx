import React, { createContext, useContext, useEffect, useState } from "react";

export type Product = {
    id?: number;
    title: string;
    category: string;
    condition: string;
    description: string;
    photos: string[];
};

type ProductContextType = {
    products: Product[];
    addProduct: (product: Product) => Promise<void>;
    refreshProducts: () => Promise<void>;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const API_URL = "http://localhost:3001/products";

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);

    const refreshProducts = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error("Erro ao buscar produtos:", err);
        }
    };

    useEffect(() => {
        refreshProducts();
    }, []);

    const addProduct = async (product: Product) => {
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });

            if (!res.ok) throw new Error("Erro ao adicionar produto");

            const saved = await res.json();
            setProducts((prev) => [...prev, saved]);
        } catch (err) {
            console.error("Erro ao salvar produto:", err);
            throw err;
        }
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, refreshProducts }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const ctx = useContext(ProductContext);
    if (!ctx) throw new Error("useProducts deve estar dentro de ProductProvider");
    return ctx;
};
