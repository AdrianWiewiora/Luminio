import { useState } from "react";
import Submit from "../../components/btn/submit/submit.tsx";
import FormInput from "../../components/inputs/formInput/formInput.tsx";
import { LoginRequest } from "../../../../common/requests/user_requests.ts";

const loginForm = [
    { id: "email", label: "Email", type: "email" },
    { id: "password", label: "Hasło", type: "password" }
];

function LoginForm() {
    const [formData, setFormData] = useState<LoginRequest>({ email: "", password: "" });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include"
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Błąd logowania");
            }

            window.location.href = "/";
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            {loginForm.map(({ id, label, type }) => (
                <FormInput key={id} id={id} label={label} type={type} value={formData[id as keyof typeof formData]} onChange={handleChange} />
            ))}

            {error && <p className="error">{error}</p>}

            <Submit title="Zaloguj się" />
        </form>
    );
}

export default LoginForm;
