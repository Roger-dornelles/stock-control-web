import Image from "next/image";
import { useState } from "react";

import type UserProfile from "@/Types/profile";

import Button from "@/components/Button";
import Input from "@/components/Input";
import formatDate from "@/lib/formatDate";

const ProfileCard = ({ user }: { user: UserProfile }) => {
  const [disabled, setDisabled] = useState<true | false>(true);
  const [userData, setUserData] = useState<{
    username: string;
    email: string;
  }>({
    username: user.username,
    email: user.email,
  });

  return (
    <div
      className={`mt-4 flex flex-row rounded border border-[#afafaf] bg-[#f9f9f9] text-[#666]`}
    >
      <div className="flex flex-col items-center justify-center border-r border-[#9c9b9b] p-4">
        <Image
          src={user.fileUrl}
          alt="Imagem do usuario"
          width={200}
          height={200}
          objectFit="cover"
          className="rounded-full"
        />

        <button className="mt-2 cursor-pointer rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-500">
          Alterar foto
        </button>
      </div>

      <div className="flex w-3/4 flex-col justify-between p-4">
        <p className="flex flex-row">
          Nome:
          <Input
            className={`ml-2 outline-none ${disabled ? "text-[#999]" : "text-[#5b5b5b]"}`}
            type="text"
            value={userData.username}
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
            value={user.email}
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
            className={`cursor-pointer rounded border border-blue-600 bg-blue-500 p-2 text-white hover:bg-blue-600`}
            onClick={() => setDisabled(!disabled)}
          >
            Salvar Alterações
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
