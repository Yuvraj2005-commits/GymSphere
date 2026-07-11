import { sendOTP } from "@/actions/send-otp";

export default function TestEmailPage() {
  async function test() {
    "use server";

    const result = await sendOTP("yuvrajprakash4321@gmail.com");

    console.log(result);
  }

  return (
    <form action={test}>
      <button
        type="submit"
        className="rounded-lg bg-black px-6 py-3 text-white"
      >
        Send Test OTP
      </button>
    </form>
  );
}