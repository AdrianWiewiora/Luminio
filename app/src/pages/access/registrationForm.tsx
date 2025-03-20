import React, { useState } from "react";
import "./access.scss";
import Submit from "../../components/btn/submit/submit.tsx";
import FormInput from "../../components/inputs/formInput/formInput.tsx";
import { RegistrationRequest } from "../../../../common/requests/user_requests.ts";
import DialogPopup from "../../components/pop-ups/dialog/dialogPopup.tsx";

const regiForm = [
    { id: "email", label: "Email", type: "email" },
    { id: "first_name", label: "Imię", type: "text" },
    { id: "last_name", label: "Nazwisko", type: "text" },
    { id: "password", label: "Hasło", type: "password" },
    { id: "confirm_password", label: "Potwórz Hasło", type: "password" }
];

function RegistrationForm() {
    const [formData, setFormData] = useState<RegistrationRequest & { [key: string]: string }>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        user_description: "",
        phone_number: "",
        city: ""
    });

    const [confirmPassword, setConfirmPassword] = useState(""); // Osobny stan
    const [errorMessage, setErrorMessage] = useState("");
    const [showDialog, setShowDialog] = useState(false); // Stan do pokazywania dialogu

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        if (id === "confirm_password") {
            setConfirmPassword(value);
        } else {
            setFormData(prev => ({
                ...prev,
                [id]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.password !== confirmPassword) {
            setErrorMessage("Hasła muszą się zgadzać.");
            return;
        }

        const dataToSend = {
            ...formData,
            user_description: "",
            phone_number: "",
            city: "",
        };

        console.log("Dane do rejestracji:", dataToSend);

        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        });

        const data = await response.json();

        if (response.ok) {
            setShowDialog(true);
        } else {
            setErrorMessage(data.message || "Wystąpił błąd podczas rejestracji.");
        }
    };

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                {regiForm.map(({ id, label, type }) => (
                    <FormInput
                        key={id}
                        id={id}
                        label={label}
                        type={type}
                        value={id === "confirm_password" ? confirmPassword : formData[id] || ""}
                        onChange={handleChange}
                    />
                ))}
                {errorMessage && <div className="error">{errorMessage}</div>}
                <Submit title="Zarejestruj się" />
            </form>

            {showDialog && (
                <DialogPopup
                    message="Zarejestrowano pomyślnie. Kliknij dalej, aby przejść do logowania."
                    redirectPath="/login"
                    onClose={() => setShowDialog(false)}
                />
            )}
        </div>
    );
}


export default RegistrationForm;
