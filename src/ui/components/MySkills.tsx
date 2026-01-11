import prisma from "@/prisma";
import MySkillsClient from "./MySkillsClient";

async function getSkills(locale: string) {
  const skills = await prisma.skills.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      translations: {
        where: {
          language: locale,
        },
      },
    },
  });
  return skills;
}

export default async function MySkillsServer({ locale }: { locale: string }) {
  const skills = await getSkills(locale);

  return <MySkillsClient skills={skills} />;
}
