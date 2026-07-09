import TrainerForm from "@/components/trainers/trainer-form";

export default function NewTrainerPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Add Trainer
        </h1>

        <p className="text-muted-foreground">
          Create a new trainer.
        </p>
      </div>

      <TrainerForm />
    </div>
  );
}