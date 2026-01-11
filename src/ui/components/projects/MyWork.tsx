import React from "react";
import MyWorkClient from "./MyWorkClient";
import prisma from "@/prisma";

// Récupère les projets avec les traductions en fonction de la langue
async function getProjects(locale: string) {
  const projects = await prisma.project.findMany({
    orderBy: { id: "desc" },
    include: {
      images: true,
      translations: {
        where: {
          language: locale, // Filtrer les traductions par langue
        },
      },
    },
  });
  return projects;
}

const MyWork = async ({ locale }: { locale: string }) => {
  const projects = await getProjects(locale);

  return (
    // Passe les projets et la locale au composant client
    <MyWorkClient projects={projects} locale={locale} />
  );
};

export default MyWork;
