import { useEffect, useRef } from "react";
import "./textArea.scss";

type TextAreaProps = {
    label: string;
};

function TextArea({ label }: TextAreaProps) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textArea = textAreaRef.current;

        if (textArea) {
            textArea.addEventListener("scroll", () => {
                if (textArea.scrollTop <= 0) {
                    textArea.scrollTop = 1; 
                }
            });
        }
    }, []);

    return (
        <label className="textarea-container">
            {label}
            <textarea ref={textAreaRef} className="textarea-container__textarea" required>
            </textarea>
        </label>
    );
}

export default TextArea;
