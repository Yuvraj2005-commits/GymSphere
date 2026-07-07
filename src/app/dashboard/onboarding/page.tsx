import GymForm from "@/components/onboarding/gym-form";

export default function OnboardingPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 py-10">
      <div>
        <h1 className="text-4xl font-bold">
          Welcome to GymSphere 👋
        </h1>

        <p className="text-muted-foreground mt-2">
          Let's create your gym before you start managing members.
        </p>
      </div>

      <GymForm />
    </div>
  );
}