import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Img,
	Preview,
	Section,
	Tailwind,
	Text,
} from "react-email";

interface Props {
	type: "sign-in" | "email-verification" | "forget-password" | "change-email";
	otp: string;
}

export default function OtpEmail({ type, otp }: Props) {
	const getTitle = () => {
		switch (type) {
			case "email-verification":
				return "Verify your email address";
			case "sign-in":
				return "Verify your login";
			case "change-email":
				return "Confirm your new email address";
			case "forget-password":
				return "Confirm your password change";
		}
	};

	const getText = () => {
		switch (type) {
			case "email-verification":
				return "To verify your account, enter OTP code below.";
			case "sign-in":
				return "To login, enter OTP code below.";
			case "change-email":
				return "To change your email address, enter OTP code below.";
			case "forget-password":
				return "To reset your password, enter OTP code below.";
		}
	};

	return (
		<Html>
			<Tailwind>
				<Head></Head>
				<Body className="m-0 text-center font-sans">
					<Preview>{getTitle()}</Preview>
					<Container className="mbs-6 mx-auto w-full max-w-[640px] rounded-lg p-6 text-neutral-950">
						<Section className="rounded-[8px] bg-neutral-100 text-center">
							<Section>
								<Img
									src="https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/02d_mq4g8w.svg"
									alt="Logo"
									width={48}
									className="mbs-5 mx-auto block"
								/>
								<Heading as="h1" className="mbs-8">
									{getTitle()}
								</Heading>
							</Section>

							{type === "change-email" && (
								<Text className="mbs-4 mx-auto mt-0 max-w-[380px] text-center font-16 text-neutral-700">
									We have receive a request to change your email address.
								</Text>
							)}

							{type === "forget-password" && (
								<Text className="mbs-4 mx-auto mt-0 max-w-[380px] text-center font-16 text-neutral-700">
									We have receive a request to reset your password.
								</Text>
							)}

							<Text className="mbs-4 mx-auto mt-0 max-w-[380px] text-center font-16 text-neutral-700">
								{getText()}
							</Text>

							<Section className="mbs-6 text-center">
								<Text className="font-bold text-3xl tracking-wide">{otp}</Text>
							</Section>

							<Text className="mbs-6">
								This code will expire in 5 minutes. Don’t share the code with
								anyone.
							</Text>

							<Text className="mbs-4 mx-auto mt-8 max-w-[400px] text-center text-neutral-700">
								If you didn't request this,
								<br />
								please ignore this email.
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
			;
		</Html>
	);
}
