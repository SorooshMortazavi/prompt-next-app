import { IPrompt } from "@/interfaces/IPrompt";
import React from "react";
import PromptItem from "./PromptItem";

interface PromptListProps {
  prompts: IPrompt[];
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const PromptList: React.FC<PromptListProps> = ({
  prompts,
  onDelete,
  onToggleFavorite,
}) => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prompts.map((prompt) => (
         <PromptItem key={prompt.id} prompts={prompt} onDelete={onDelete} onToggleFavorite={onToggleFavorite}/>
        ))}
      </div>
    </div>
  );
};

export default PromptList;
