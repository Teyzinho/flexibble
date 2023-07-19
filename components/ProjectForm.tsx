"use client";

import { SessionInterface } from "@/common.types";
import Image from "next/image";
import { ChangeEvent } from "react";
import FormField from "./FormField";

type Props = {
  type: string;
  session: SessionInterface;
};

const ProjectForm = ({ type, session }: Props) => {
  const form = {
    title: "",
    image: "",
  };

  const handleFormSubmit = (e: React.FormEvent) => {};
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {};
  const handleStateChange = (fieldName: string, value: string) => {};

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

      {/* CustomInput */}

      <div className="flexStart w-full">
            <button>
                Criar
            </button>
      </div>

    </form>
  );
};

export default ProjectForm;
