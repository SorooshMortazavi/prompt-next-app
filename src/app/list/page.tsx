"use client";
import PromptList from "@/components/PromptList";
import { useToast } from "@/components/Toast/ToastContext";
import { IPrompt } from "@/interfaces/IPrompt";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";

export default function List() {
  const [prompts, setPrompts] = useState<IPrompt[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await axiosInstance.get("/prompt");
        setPrompts(response.data);
        setLoading(false);
      } catch (error) {
        addToast(error as string, "error");
      }
    };
    fetchPrompts();
  }, [loading]);

  const handleDelete = async (id: string) => {
    let index = null;
    const data: IPrompt[] = prompts?.filter((item,i) => {
      if (item.id != id) {
        return true
      }
      index = i
      return false
    }) as IPrompt[]
    const response = await axiosInstance.delete(`/prompt/${index}`)
    if (response.data) {
      setPrompts(data)
    }
  };

  const handleToggleFavorite = async (id: string) => {
    let index = null;
    let isFavorite = null
    const data: IPrompt[] = prompts?.map((item,i) => {
      if (item.id === id) {
        index = i;
        isFavorite = !item.isFavorite
        return {
          ...item,
          isFavorite: !item.isFavorite,
        };
      }
      return item;
    }) as IPrompt[];
    const response = await axiosInstance.patch(`/prompt/${index}`,{
      isFavorite
    });
    if (response.data) {
      setPrompts(data);
    }
  };

  if (loading) return <div>Loading...</div>;
  return (
    <>
      {prompts ? (
        <PromptList
          prompts={prompts}
          onDelete={handleDelete}
          onToggleFavorite={handleToggleFavorite}
        />
      ) : (
        <p>no prompt data</p>
      )}
    </>
  );
}
