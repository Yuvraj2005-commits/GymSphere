import TrainerFormClient from "./trainer-form-client";

interface TrainerFormProps {
  trainer?: {
    id: string;
    specialization: string | null;
    user: {
      name: string | null;
      email: string | null;
    };
  };
}

export default function TrainerForm({
  trainer,
}: TrainerFormProps) {
  return <TrainerFormClient trainer={trainer} />;
}