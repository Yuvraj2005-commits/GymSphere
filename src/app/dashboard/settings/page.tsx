import SettingsForm from "@/components/settings/settings-form";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        <p className="text-muted-foreground">
          Manage your gym information.
        </p>
      </div>

      <SettingsForm />
    </div>
  );
}