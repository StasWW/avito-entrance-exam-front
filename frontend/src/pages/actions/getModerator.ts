import {getModeratorsMe, type Moderator} from "../../serverCalls/moderator.ts";

export async function getModerator(): Promise<Moderator | string>{
  try {
    const res = await getModeratorsMe()
    return res as Moderator;
  } catch (e) {
    return e as string;
  }
}