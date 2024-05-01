"use client";
import PromptForm from "@/components/PromptForm";
import { useToast } from "@/components/Toast/ToastContext";
import { ICreatePrompts } from "@/interfaces/ICreatePrompt";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";

export default function AddPrompt() {
  const { addToast } = useToast();
  const router = useRouter()

  const handleFormSubmit = async (data: ICreatePrompts) => {
    try {
      const response = await axiosInstance.post("/prompt", {
        title:data.title,
        description:data.description,
        category: [...data.categories.map(item=> (item?.value))],
      });
      if (response.data) {
        addToast("prompt created successfully",'success')
        router.push('/list')
      }
    } catch (error) {
      addToast("prompt creation failed",'error')
    }
  };

  return (
    <>
      <div className="max-w-screen-lg mx-auto">
        <PromptForm createPromptHandler={handleFormSubmit} />
      </div>
    </>
  );
}
