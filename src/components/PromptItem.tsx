import { IPrompt } from "@/interfaces/IPrompt";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faHeart } from "@fortawesome/free-solid-svg-icons";

interface PromptItemProps {
  prompts: IPrompt;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const PromptItem: React.FC<PromptItemProps> = ({
  prompts,
  onDelete,
  onToggleFavorite,
}) => {
  return (
    <div
      className="bg-white p-4 shadow rounded-lg flex flex-col"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">{prompts.title}</h2>
        {prompts.status && (
          <span
            className={`px-2 py-1 text-sm rounded-full text-white ${
              prompts.status === "completed" ? "bg-green-400" : "bg-blue-400"
            }`}
          >
            {prompts.status}
          </span>
        )}
      </div>
      <p className="text-gray-600 mt-2">{prompts.description}</p>
      {prompts.category && (
        <p className="text-gray-500 text-sm">
          Category: {prompts.category.join(", ")}
        </p>
      )}
      <div className="mt-auto pt-2 flex justify-between items-center">
        <div>
          <button
            className={prompts.isFavorite ? "text-blue-500 " : "text-gray-300"}
            onClick={() => onToggleFavorite(prompts.id)}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <button
            className="text-red-400 hover:text-red-500 ml-4"
            onClick={() => onDelete(prompts.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
        {prompts.createdAt && (
          <p className="text-gray-500 text-xs">Created: {prompts.createdAt}</p>
        )}
      </div>
    </div>
  );
};

export default PromptItem;
