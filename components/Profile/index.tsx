import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import ProfileCard from "./ProfileCard";

import type UserProfile from "../../Types/profile";

const Profile = () => {
  const {
    data = [] as UserProfile[],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch("/api/profile", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        toast.error("Erro ao buscar as informações do usuario");
      }
      return res.json();
    },
  });

  return (
    <>
      <div className={`h-screen bg-[#f9f9f9] p-6`}>
        {isLoading && (
          <p
            className={`m-auto flex items-center justify-center text-gray-500`}
          >
            Carregando informações do usuario .....
          </p>
        )}

        {isError && (
          <p className={`m-auto items-center justify-center text-red-500`}>
            {isError}
          </p>
        )}

        {!isLoading && !isError && (
          <>
            <h2 className="text-lg font-bold text-[#3d3d3d]">
              Informações do usuário
            </h2>

            <span className="text-[#666]">
              Visualize e Gerencie suas informações pessoais
            </span>
            <div className="w-2/3">
              <ProfileCard user={data.data} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
