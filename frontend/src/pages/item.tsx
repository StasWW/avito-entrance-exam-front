import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import type { Ad } from "../serverCalls/ads.ts";
import { useAds } from "../store/storage.ts";
import { getAdById } from "../serverCalls/ads.ts";

export default function ItemPage() {
  const [ads] = useAds();
  const [ad, setAd] = useState<Ad | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();

  const loadItemById = async (id: string): Promise<Ad> => {
    for (let ad of ads) if (ad.id === Number(id)) return ad;
    return await getAdById(id);
  };

  useEffect(() => {
    if (!id) return;
    loadItemById(id)
      .then(result => {
        setAd(result);
      })
      .catch(e => {
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>loading...</h1>
      ) : ad ? (
        <h1>{ad.title}</h1>
      ) : (
        <h1>Item not found</h1>
      )}
    </>
  );
}
