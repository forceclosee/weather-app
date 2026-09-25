import GithubIcon from "#/components/icons/github-icon";
import XIcon from "#/components/icons/x-icon";

export default function Footer() {
	return (
		<footer className="border-border border-bs">
			<div className="max-inline-304 inline-full mx-auto px-fluid-500">
				<div className="flex flex-col items-center justify-between gap-4 py-4 *:shrink-0 min-[20rem]:flex-row">
					<p className="text-center">
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
								className="inline-6 block-6 text-text-muted hover:text-text focus-visible:text-text"
								aria-hidden="true"
							/>
						</a>

						<a
							href="https://github.com/forceclosee"
							aria-label="X"
							target="_blank"
							rel="noopener noreferrer">
							<XIcon
								className="inline-6 block-6 text-text-muted hover:text-text focus-visible:text-text"
								aria-hidden="true"
							/>
						</a>
					</div>
				</div>

				<p className="border-border-muted border-bs py-2 text-center font-dm-sans text-3xs">
					Challenge by{" "}
					<a
						className="hover-underline pbe-1 text-text-primary"
						href="https://www.frontendmentor.io?ref=challenge"
						target="_blank"
						rel="noopener noreferrer">
						Frontend Mentor
					</a>
					. Coded by{" "}
					<a
						className="hover-underline pbe-1 text-text-primary"
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
