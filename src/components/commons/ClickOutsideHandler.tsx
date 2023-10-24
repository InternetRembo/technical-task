import React, {useRef, useEffect, ReactNode} from "react";

interface ClickOutsideHandlerProps {
	children: ReactNode;
	onAwayClick: () => void;
}

function ClickOutsideHandler({children, onAwayClick}: ClickOutsideHandlerProps) {

	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node)
			) {
				onAwayClick();
			}
		}

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [onAwayClick]);

	return <div ref={wrapperRef}>{children}</div>;
}

export default ClickOutsideHandler;