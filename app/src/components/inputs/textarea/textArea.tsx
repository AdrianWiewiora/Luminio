import { useEffect, useRef } from "react";
import "./textArea.scss";

type TextAreaProps = {
    id: string; 
    label: string;
    value: string; 
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; 
    required?: boolean; 
};

function TextArea({ id, label, value, onChange, required = false }: TextAreaProps) {
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

        return () => {
            if (textArea) {
                textArea.removeEventListener("scroll", () => {});
            }
        };
    }, []);

    return (
        <label htmlFor={id} className="textarea-container">
            {label}
            <textarea
                id={id}
                ref={textAreaRef}
                className="textarea-container__textarea"
                required={required}
                value={value}
                onChange={onChange}
            />
        </label>
    );
}

export default TextArea;