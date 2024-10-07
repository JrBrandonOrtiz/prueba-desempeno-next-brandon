'use client';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import styled from 'styled-components';
import Spinner from "../spiner/Spiner";
import Button from "../UI/Button/Button";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

const GetProducts = () => {
    const [posts, setPosts] = useState<Product[]>([]);
    const { data: session, status } = useSession();

    useEffect(() => {
        const fetchProducts = async () => {
            if (session) {
                try {
                    const response = await fetch('http://192.168.88.39:7000/auth/products', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${session.user.access_token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    if (data && Array.isArray(data)) {
                        setPosts(data);
                    }
                } catch (error) {
                    console.error('Failed to fetch products:', error);
                }
            }
        };

        fetchProducts();
    }, [session]);

    if (status === "loading") {
        return <Spinner />;
    }

    if (status === "unauthenticated") {
        return <div>You need to be authenticated to view products.</div>;
    }

    return (
        <ProductContainer>
            <ProductGrid>
                {posts.map((post) => (
                    <ProductCard key={post.id}>
                        <ImageContainer>
                            {post.image ? (
                                <ProductImage src={post.image} alt={post.title} />
                            ) : (
                                <PlaceholderImage>
                                    hola
                                </PlaceholderImage>
                            )}
                        </ImageContainer>
                        <ProductTitle>{post.title}</ProductTitle>
                        <ProductPrice>${post.price}</ProductPrice>
                        <Actions>
                            <AddToCartButton label={<FaShoppingCart />} />
                            <AddLike label={<FaRegHeart />} />
                        </Actions>
                    </ProductCard>
                ))}
            </ProductGrid>
        </ProductContainer>
    );
};

export const ProductContainer = styled.div`
    display: flex;
    padding: 20px;
    justify-content: center;
    width: 100%;
`;

export const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    justify-items: center;
    width: 100%;
`;

export const ProductCard = styled.div`
    width: 100%;
    max-width: 250px;  
    border: 1px solid #007bff;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 16px;
    text-align: center;
    background-color: white;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    }
`;

export const ImageContainer = styled.div`
    position: relative;
    padding-top: 100%; 
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 12px;
`;

export const ProductImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

export const PlaceholderImage = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e0e0e0;
    color: #aaa;
    font-size: 24px;
`;

export const ProductTitle = styled.h2`
    font-size: 16px;
    color: #007bff; 
    text-align: center;
    width: 100%;
    height: 60px; 
`;

export const ProductPrice = styled.p`
    font-size: 14px;
    color: #28a745;
    margin-bottom: 12px;
`;

export const Actions = styled.div`
    width: 100%;
    display: flex;
    gap: 8px;
`;

export const AddToCartButton = styled(Button)`
    background: linear-gradient(to right, #007bff, #00aaff); 
    color: white;
    padding: 10px 0;
    border: none;
    border-radius: 16px;
    width: 100%;
    font-size: 14px; 
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }
`;

export const AddLike = styled(Button)`
    background: linear-gradient(to right, #007bff, #00aaff); 
    color: white;
    padding: 10px 0;
    border: none;
    border-radius: 16px;
    width: 100%;
    font-size: 14px;
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }
`;

export default GetProducts;
