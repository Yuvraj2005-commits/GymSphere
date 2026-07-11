import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface OTPEmailProps {
  otp: string;
}

export default function OTPEmail({
  otp,
}: OTPEmailProps) {
  return (
    <Html>
      <Head />

      <Preview>
        Verify your GymSphere account
      </Preview>

      <Body
        style={{
          backgroundColor: "#f6f9fc",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Container
          style={{
            backgroundColor: "#fff",
            margin: "40px auto",
            padding: "40px",
            borderRadius: "12px",
            maxWidth: "500px",
          }}
        >
          <Heading>
            Verify your email
          </Heading>

          <Text>
            Welcome to GymSphere!
          </Text>

          <Text>
            Use the OTP below to verify your
            account.
          </Text>

          <Section
            style={{
              textAlign: "center",
              margin: "30px 0",
            }}
          >
            <Text
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                letterSpacing: "8px",
              }}
            >
              {otp}
            </Text>
          </Section>

          <Text>
            This OTP expires in 10 minutes.
          </Text>

          <Text>
            If you didn't request this, you can
            safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}