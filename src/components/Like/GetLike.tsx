'use client';
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import styled from 'styled-components';
import Spinner from "../spiner/Spiner";
import Button from "../UI/Button/Button";

interface Like {
    id: number;
    post_id: number;
    quantity: number;
}

interface ApiResponse {
    message: string;
}
/*
const handleLike = async (postId: number) => {
    const token = sessionStorage.getItem('access_token');
    if (!token) {
        console.error("No access token found.");
        return;
    }

    try {
        const existingLike = likes.find(like => like.post_id === postId);

        if (existingLike) {
            const response = await fetch(`http://localhost:7000/auth/products/${postId}/like`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data: ApiResponse = await response.json();
            if (response.ok && data.message === 'Me gusta eliminado') {
                setLikes(likes.filter(like => like.post_id !== postId));
            }
        } else {
            const response = await fetch(`http://localhost:7000/auth/products/${postId}/like`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });

            const data: ApiResponse = await response.json();
            if (response.ok && data.message === 'Producto marcado como me gusta') {
                setLikes([...likes, { post_id: postId, quantity: 1 }]);
            }
        }
    } catch (error) {
        console.error("Error handling like:", error);
        setError('Failed to update like.');
    }
};
*/