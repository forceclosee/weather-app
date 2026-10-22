import GithubIcon from "#/components/icons/github-icon";
import XIcon from "#/components/icons/x-icon";

export default function Footer() {
	return (
		<footer className="border-bs border-border">
			<div className="mx-auto px-fluid-500 inline-full max-inline-316">
				<div className="flex flex-col items-center justify-between gap-4 py-4 *:shrink-0 min-[20rem]:flex-row">
					<p className="text-center text-base">
						© 2026{" "}
						<span className="font-bricolage-grotesque font-medium">
							ForeCast
						</span>
					</p>

					<div className="flex gap-4 *:shrink-0">
						<a
							href="https://github.com/forceclosee"
							aria-label="Github"
							target="_blank"
							rel="noopener noreferrer">
							<GithubIcon
								className="text-text-muted block-6 inline-6 hover:text-text focus-visible:text-text"
								aria-hidden="true"
							/>
						</a>

						<a
							href="https://github.com/forceclosee"
							aria-label="X"
							target="_blank"
							rel="noopener noreferrer">
							<XIcon
								className="text-text-muted block-6 inline-6 hover:text-text focus-visible:text-text"
								aria-hidden="true"
							/>
						</a>
					</div>
				</div>

				<p className="font-dm-sans border-bs border-border-muted py-2 text-center text-3xs">
					Challenge by{" "}
					<a
						className="pbe-1 text-text-primary hover-underline"
						href="https://www.frontendmentor.io?ref=challenge"
						target="_blank"
						rel="noopener noreferrer">
						Frontend Mentor
					</a>
					. Coded by{" "}
					<a
						className="pbe-1 text-text-primary hover-underline"
						href="https://github.com/forceclosee"
						target="_blank"
						rel="noopener noreferrer">
						ForceClose
					</a>
					.
				</p>
			</div>
		</footer>
	);
}
