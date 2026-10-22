import { getRouteApi } from "@tanstack/react-router";
import {
	useEffect,
	useState,
	useTransition,
	type Dispatch,
	type SetStateAction,
} from "react";

import { authClient } from "#/lib/auth-client";
import { classList } from "#/utils/class-helper";

import { useToastManager } from "#/components/ui/base-toast";

const RouteApi = getRouteApi("__root__");

export default function ResendOtp() {
	const { user } = RouteApi.useRouteContext();

	const [isDisabled, setIsDisabled] = useState(true);

	const [isSending, startTransition] = useTransition();

	const toastManager = useToastManager();

	const handleClick = async () => {
		if (!user) return;

		startTransition(async () => {
			// send OTP
			await authClient.emailOtp.sendVerificationOtp({
				email: user.email,
				type: "email-verification",

				fetchOptions: {
					// error state
					onError: ({ error }) => {
						toastManager.add({
							type: "error",
							title: "Resend OTP failed",
							description: error.message
								? `${error.message}, Please try again later`
								: "Something went wrong, Please try again later",
						});
					},

					// success state
					onSuccess: () => {
						setIsDisabled(true);

						toastManager.add({
							type: "success",
							title: "Successfully sent new OTP",
							description: "New OTP has been sent to your email address",
						});
					},
				},
			});
		});
	};

	return (
		<div className="text-center">
			<p>
				Please enter the OTP we just send to your email address{" "}
				<strong className="font-semibold">{user?.email}</strong>
			</p>

			<p className="mbs-6">Didn't receive the OTP?</p>
			{isDisabled ? (
				<ResendButtonTimer
					isDisabled={isDisabled}
					setIsDisabled={setIsDisabled}
				/>
			) : (
				<button
					type="button"
					onClick={handleClick}
					disabled={isDisabled || isSending}
					className={classList(
						"not-disabled:hover-underline pbe-1 cursor-pointer text-text-primary disabled:cursor-not-allowed disabled:text-text-primary/50",
						{ "sending-loader": isSending },
					)}>
					{!isSending && "Resend OTP"}
				</button>
			)}
		</div>
	);
}

interface ResendButtonTimerProps {
	isDisabled: boolean;
	setIsDisabled: Dispatch<SetStateAction<boolean>>;
}

function ResendButtonTimer({
	isDisabled,
	setIsDisabled,
}: ResendButtonTimerProps) {
	const [disabledTimer, setDisabledTimer] = useState(20);

	// countdown timer
	useEffect(() => {
		if (!isDisabled) {
			setDisabledTimer(20);
			return;
		}

		const interval = setInterval(() => {
			setDisabledTimer((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [isDisabled]);

	// enable button when timer reaches 0
	useEffect(() => {
		if (disabledTimer <= 0) {
			setIsDisabled(false);
		}
	}, [disabledTimer, setIsDisabled]);

	return (
		<div>
			<span className="text-text-muted">
				{`You can resend OTP in ${disabledTimer}s`}
			</span>
		</div>
	);
}
