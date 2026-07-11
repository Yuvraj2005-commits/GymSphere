import ProfileForm from "@/components/settings/profile-form";
import GymForm from "@/components/settings/gym-form";
import PasswordForm from "@/components/settings/password-form";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your account and gym settings.
        </p>
      </div>

      <ProfileForm />

      <GymForm />

      <PasswordForm />
    </div>
  );
}