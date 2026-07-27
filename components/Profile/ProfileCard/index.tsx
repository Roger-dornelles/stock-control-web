import Image from "next/image";

import type UserProfile from "@/Types/profile";

import formatDate from "@/lib/formatDate";

const ProfileCard = ({ user }: { user: UserProfile }) => {
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
        <p> Nome: {user.username}</p>
        <p className="">Email: {user.email}</p>
        <p>Função: {user.role === "admin" ? "Administrador" : "Usuário"}</p>
        <p className="">Data do Cadastro: {formatDate(user.createdAt)}</p>
        <p className="items-center justify-center">
          Status da conta:{" "}
          <span
            className={`items-center justify-center rounded-2xl border border-green-500 bg-green-300 px-2 py-1 text-center`}
          >
            Ativo
          </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
