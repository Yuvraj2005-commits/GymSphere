import { getGymSettings } from "@/actions/settings";
import SettingsFormClient from "./settings-form-client";

export default async function SettingsForm() {
  const gym = await getGymSettings();

  return <SettingsFormClient gym={gym} />;
}