import { phonesData } from "@/utils/phonesData";

export const getClaimAmountForLevel = (level: number | null) => {
  let levelDetails = phonesData.filter((each) => each.level == level)[0];
  return levelDetails?.claim;
};
