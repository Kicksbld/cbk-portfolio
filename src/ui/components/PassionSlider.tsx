import prisma from "@/prisma";
import PassionSliderClient from "./PassionSliderClient";

async function getPassions(locale: string) {
  const passions = await prisma.passion.findMany({
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
  return passions;
}

export default async function PassionServer({ locale }: { locale: string }) {
  const passions = await getPassions(locale);

  return <PassionSliderClient passions={passions} />;
}
