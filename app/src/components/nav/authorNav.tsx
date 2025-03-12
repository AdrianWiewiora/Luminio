import "./authorNav.scss";

const navElements = [
    { id: 1, name: "Kolekcje zdjęć", action: "viewPicture" },
    { id: 2, name: "Dostosuj profil", action: "customizeProfile" },
    { id: 3, name: "Dodaj" },
    { id: 4, name: "Robocze" }
];

interface AuthorNavProps {
    onCustomizeProfileClick: () => void;
    onViewPictureClick: () => void;
}

function AuthorNav({ onCustomizeProfileClick, onViewPictureClick }: AuthorNavProps) {
    return (
        <nav className="navigation">
            {navElements.map(({ id, name, action }) => (
                <span
                    key={id}
                    onClick={
                        action === "customizeProfile" ? onCustomizeProfileClick
                        : action === "viewPicture" ? onViewPictureClick
                        : undefined
                    }
                >
                    {name}
                </span>
            ))}
        </nav>
    );
}

export default AuthorNav;
