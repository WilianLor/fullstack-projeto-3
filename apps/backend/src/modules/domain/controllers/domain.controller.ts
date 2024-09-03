import { Request, Response } from "express";
import Domain from "../../../schemas/domain.schema";
import User from "../../../schemas/user.schema";
import { redis } from "../../../config/redis.config";
import { sanitizeInput } from "../../../utils/sanitize";

const createDomain = async (req: Request, res: Response) => {
  const userId = (req as any).userId as string;
  let { domain } = req.body;

  domain = sanitizeInput(domain);

  if (!domain) {
    return res.json({
      status: "error",
      message: "É necessário informar um domínio",
    });
  }

  if (!(domain as string).includes(".")) {
    return res.json({ status: "error", message: "Domínio inválido" });
  }

  if (await Domain.findOne({ domain })) {
    return res.json({
      status: "error",
      message: "Esse domínio está indisponível",
    });
  }

  const user = await User.findById(userId);

  const createdDomain = await Domain.create({ domain, user });

  await redis.del(createdDomain.domain);

  return res.status(201).json({ status: "success", data: createdDomain });
};

const listUserDomains = async (req: Request, res: Response) => {
  const userId = (req as any).userId as string;

  const userDomains = await Domain.find({ user: { _id: userId } });

  return res.status(200).json({ status: "success", data: userDomains });
};

const verifyDomain = async (req: Request, res: Response) => {
  let { domain } = req.body;

  domain = sanitizeInput(domain);

  const cacheDomain = await redis.get(domain);

  if (cacheDomain) {
    console.log("cache");
    return res
      .status(200)
      .json({ status: "success", data: JSON.parse(cacheDomain) });
  }

  if (!domain) {
    return res.json({
      status: "error",
      message: "É necessário informar um domínio",
    });
  }

  if (!(domain as string).includes(".")) {
    return res.json({ status: "error", message: "Domínio inválido" });
  }

  const domainToVeify = await Domain.findOne({ domain });

  await redis.set(domain, JSON.stringify(domainToVeify), "EX", 60);

  return res.status(200).json({ status: "success", data: domainToVeify });
};

const removeDomain = async (req: Request, res: Response) => {
  const userId = (req as any).userId as string;
  const domainId = req.params.domainId;

  const domain = await Domain.findOne({ _id: domainId, user: { _id: userId } });

  if (!domain) {
    return res.json({ status: "error", message: "Domínio não encontrado" });
  }

  await redis.del(domain.domain);

  const deletedDomain = await domain.deleteOne();

  return res.status(200).json({ status: "success", data: deletedDomain });
};

export default { createDomain, listUserDomains, verifyDomain, removeDomain };
