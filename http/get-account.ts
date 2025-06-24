import { Caregiver, SelfMonitor, User } from "@/contexts/UserContext";

export async function getAccount(token: string): Promise<{
  account: User;
  selfMonitor: SelfMonitor | null;
  caregiver: Caregiver | null;
}> {
  const response = await fetch("https://sanare-api.vercel.app/account", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch account information");
  }

  const data = await response.json() as {
    account: User;
    selfMonitor: SelfMonitor | null;
    caregiver: Caregiver | null;
  };

  return {
    account: data.account,
    selfMonitor: data.selfMonitor,
    caregiver: data.caregiver,
  };
}