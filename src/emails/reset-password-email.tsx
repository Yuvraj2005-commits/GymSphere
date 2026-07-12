import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface Props {
  resetLink: string;
}

export default function ResetPasswordEmail({
  resetLink,
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>
        Reset your GymSphere password
      </Preview>

      <Body
        style={{
          backgroundColor: "#f6f9fc",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            margin: "40px auto",
            padding: "40px",
            borderRadius: "12px",
            maxWidth: "520px",
          }}
        >
          <Heading
            style={{
              textAlign: "center",
              color: "#111827",
            }}
          >
            Reset Password 🔒
          </Heading>

          <Text
            style={{
              color: "#4b5563",
              lineHeight: "24px",
            }}
          >
            We received a request to reset your GymSphere
            account password.
          </Text>

          <Text
            style={{
              color: "#4b5563",
              lineHeight: "24px",
            }}
          >
            Click the button below to create a new password.
            This link will expire in 30 minutes.
          </Text>

          <Section
            style={{
              textAlign: "center",
              margin: "32px 0",
            }}
          >
            <Button
              href={resetLink}
              style={{
                backgroundColor: "#2563eb",
                color: "#ffffff",
                padding: "14px 28px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Reset Password
            </Button>
          </Section>

          <Text
            style={{
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            If you didn't request a password reset,
            you can safely ignore this email.
          </Text>

          <Text
            style={{
              color: "#9ca3af",
              fontSize: "12px",
              marginTop: "24px",
            }}
          >
            © {new Date().getFullYear()} GymSphere
          </Text>
        </Container>
      </Body>
    </Html>
  );
}