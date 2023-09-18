import { NextApiRequest, NextApiResponse } from "next";
import { returnLocationInfo } from "../../components/api/dataReqs";
import { verifyInformations } from "../../components/api/verifyContentFunctions";

export default async function returnData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { lat, lon, myApiSecret } = req.query;
  if (myApiSecret === process.env.MY_API_SECRET) {
    const localization = await returnLocationInfo(Number(lat), Number(lon));
    res.status(200).json(await verifyInformations(localization));
  } else
    res.status(200).json({
      cod: 403,
      msg: "Você não tem autorização para fazer esta requisição!",
    });
}
