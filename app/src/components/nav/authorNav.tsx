import "./authorNav.scss";

const navElements = [
    { id: 0, name: "Kolekcje zdjęć", action: "viewPicture" },
    { id: 1, name: "Dostosuj profil", action: "customizeProfile" },
    { id: 2, name: "Dodaj" },
    { id: 3, name: "Robocze" }
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
