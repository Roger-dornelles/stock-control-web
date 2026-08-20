import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import type UserProfile from "@/Types/profile";

import Button from "@/components/Button";
import Input from "@/components/Input";
import formatDate from "@/lib/formatDate";

const ProfileCard = ({ user }: { user: UserProfile }) => {
  const queryClient = useQueryClient();

  const inputRef = useRef<HTMLInputElement>(null);

  const [disabled, setDisabled] = useState<true | false>(true);

  const [userData, setUserData] = useState<{
    username: string;
    email: string;
    fileUrl: string;
    id: string;
  }>({
    username: user.username,
    email: user.email,
    fileUrl: user.fileUrl,
    id: user.id,
  });

  const [saveChanges, setSaveChanges] = useState<true | false>(false);

  const { mutate } = useMutation({
    mutationFn: async (userData: {
      username?: string;
      email?: string;
      fileUrl?: string;
      id: string;
    }) => {
      const res = await fetch("/api/profile/update", {
        method: "PATCH",
        body: JSON.stringify(userData),
        credentials: "include",
      });

      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Perfil atualizado com sucesso");
    },
    onError: () => {
      toast.error("Erro ao atualizar informações do usuário");
    },
    onSettled: () => {
      setDisabled(false);
    },
  });

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const file = e.target.files?.[0];

    if (!file) return;

    const maxSizeMB = 10;
    if (!file.type.startsWith("image/")) {
      toast.info("Selecione um arquivo de imagem válido, EX: png ou jpg");
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.info(`A imagem deve ter no máximo ${maxSizeMB}MB.`);
      return;
    }
    formData.append("file", file);
    const response = await fetch("/api/createImageUser", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (response.ok) {
      const fileUrl = await response.json();
      const user = { fileUrl: fileUrl.fileUrl, id: userData.id };

      mutate(user);
      setUserData((prev) => ({ ...prev, fileUrl: fileUrl.fileUrl }));
    } else {
      toast.error("Erro ao atualizar imagem do usuário");
    }
  };

  useEffect(() => {
    if (saveChanges) {
      const saveUserChanges = async () => {
        try {
          if (userData.username !== user.username) {
            mutate(userData);
          }

          if (userData.email !== user.email) {
            mutate(userData);
          }
        } catch (error) {
          if (error instanceof Error) {
            toast.error("Erro ao salvar alterações");
          }
        } finally {
          setDisabled(false);
        }
      };

      saveUserChanges();
      setSaveChanges(false);
      setDisabled(true);
    } else {
      setSaveChanges(false);
    }
  }, [saveChanges, userData]);

  return (
    <div
      className={`mt-4 flex flex-row rounded border border-[#afafaf] bg-[#f9f9f9] text-[#666]`}
    >
      <div className="flex flex-col items-center justify-center border-r border-[#9c9b9b] p-4">
        <div className="h-50 w-50 overflow-hidden rounded-full">
          <Image
            src={user.fileUrl}
            alt="Imagem do usuario"
            width={200}
            height={200}
            className="h-full w-full object-contain"
          />
        </div>

        <button
          className="mt-2 cursor-pointer rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
          onClick={handleClick}
        >
          Alterar foto
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="flex w-3/4 flex-col justify-between p-4">
        <p className="flex flex-row">
          Nome:
          <Input
            className={`ml-2 outline-none ${disabled ? "text-[#999]" : "text-[#5b5b5b]"}`}
            type="text"
            value={userData.username && userData.username}
            onChange={(event) =>
              setUserData((prev) => ({ ...prev, username: event.target.value }))
            }
            disabled={disabled}
          />
        </p>

        <p className="w-full">
          Email:
          <Input
            className={`ml-2 outline-none ${disabled ? "text-[#999]" : "text-[#5b5b5b]"}`}
            type="text"
            value={userData.email && userData.email}
            onChange={(event) =>
              setUserData((prev) => ({ ...prev, email: event.target.value }))
            }
            disabled={disabled}
          />
        </p>
        <p>
          Função:{" "}
          <span className={`text-[#999]`}>
            {user.role === "admin" ? "Administrador" : "Usuário"}
          </span>
        </p>
        <p className="">
          Data do Cadastro:{" "}
          <span className={`text-[#999]`}>{formatDate(user.createdAt)}</span>
        </p>
        <p className="items-center justify-center">
          Status da conta:{" "}
          <span
            className={`items-center justify-center rounded-2xl border border-green-500 bg-green-200 px-2 py-1 text-center`}
          >
            Ativo
          </span>{" "}
        </p>
        <div className="flex justify-between pt-3">
          <Button
            className={`cursor-pointer rounded border border-gray-400 bg-gray-400 p-2 text-white hover:bg-gray-600`}
            onClick={() => setDisabled(!disabled)}
          >
            Editar Informações
          </Button>

          <Button
            className={`${disabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-blue-600"} rounded border border-blue-600 bg-blue-500 p-2 text-white`}
            onClick={() => setSaveChanges(true)}
            disabled={disabled}
          >
            Salvar Alterações
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
