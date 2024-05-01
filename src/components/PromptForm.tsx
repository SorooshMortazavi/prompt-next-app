"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from 'react-select';
import { ICreatePrompts } from "@/interfaces/ICreatePrompt";

const schema = yup.object({
  title: yup.string().min(3).max(50).required("Title is required"),
  description: yup.string().min(3).max(500).required("Description is required"),
  categories: yup.array().min(1, 'At least one category is required').required('Category is required')
});

const PromptForm = ({ createPromptHandler }: { createPromptHandler: (data: ICreatePrompts) => void }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const categoryOptions = [
    { value: 'History', label: 'History' },
    { value: 'Science', label: 'Science' },
    { value: 'Personal', label: 'Personal' },
    { value: 'Biography', label: 'Biography' },
  ];

  return (
    <form className="m-8" onSubmit={handleSubmit(createPromptHandler)}>
      <h2 className="text-lg font-semibold text-gray-800">ADD PROMPT</h2>
      <hr className="my-2 border-gray-300" />
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          {...register("title")}
          className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight max-w-96 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 ${
            errors.title ? "border-red-500" : ""
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">{errors.title.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 ${
            errors.description ? "border-red-500" : ""
          }`}
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-xs italic">
            {errors.description.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="categories" className="block text-gray-700 text-sm font-bold mb-2">
          Categories
        </label>
        <Controller
          name="categories"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={categoryOptions as any}
              isMulti
              className="text-gray-700"
              classNamePrefix="select"
            />
          )}
        />
        {errors.categories && (
          <p className="text-red-500 text-xs italic">{errors.categories.message}</p>
        )}
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Prompt
        </button>
      </div>
    </form>
  );
};

export default PromptForm;
