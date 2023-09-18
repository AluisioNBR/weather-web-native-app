import { returnGeocodingLocalization } from "../../components/api/dataReqs";
import type { NextApiRequest, NextApiResponse } from "next";
import { verifyInformations } from "../../components/api/verifyContentFunctions";

export default async function returnData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.myApiSecret === process.env.MY_API_SECRET) {
    const localization = await returnGeocodingLocalization(
      req.query.city as string
    );
    res.status(200).json(await verifyInformations(localization));
  } else
    res.status(200).json({
      cod: 403,
      msg: "Você não tem autorização para fazer esta requisição!",
    });
}
