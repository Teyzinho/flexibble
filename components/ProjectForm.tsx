"use client";

import { SessionInterface } from "@/common.types";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";
import Button from "./Button";

type Props = {
  type: string;
  session: SessionInterface;
};

const ProjectForm = ({ type, session }: Props) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    liveSiteUrl: "",
    githubUrl: "",
    category: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true)

    try {
      if(type === 'create'){
        
      }
    } catch (error) {
      
    }
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault(); //preve a página de fazer Re-load

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      return alert("Por Favor envie uma arquivo de Imagem");
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange("image", result);
    };
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Escolha um miniatura para o seu projeto"}
          <input
            id="image"
            type="file"
            accept="image/*"
            required={type === "create"}
            className="form_image-input"
            onChange={handleChangeImage}
          />
        </label>
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="miniatura"
            fill
          />
        )}
      </div>

      <FormField
        title="Titulo"
        state={form.title}
        placeholder="Flexiblle"
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        title="Descrição"
        state={form.description}
        placeholder="Mostre e descubra projetos de desenvolvedores notáveis"
        setState={(value) => handleStateChange("description", value)}
      />
      <FormField
        type="url"
        title="Site Url"
        state={form.liveSiteUrl}
        placeholder="https://flexibble.pro"
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />
      <FormField
        type="url"
        title="Github Url"
        state={form.githubUrl}
        placeholder="https://github.com/teyzinho"
        setState={(value) => handleStateChange("githubUrl", value)}
      />

      <CustomMenu
        title="Categorias"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />

      <div className="flexStart w-full">
        <Button
          title={
            isSubmitting
              ? `${type === "create" ? "Criando" : "Editando"}`
              : `${type === "create" ? "Criar" : "Editar"}`
          }
          type="submit"
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
