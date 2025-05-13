import "./authorNav.scss";

const navElements = [
    { id: 0, name: "Kolekcje zdjęć", action: "openPicturePopup" }, 
    { id: 1, name: "Dostosuj profil", action: "customizeProfile" },
    { id: 2, name: "Dodaj", action: "openAlbumPopup" }
];

interface AuthorNavProps {
    onCustomizeProfileClick: () => void;
    onAlbumPopupClick: () => void;
    onPicturePopupClick: () => void;
}

function AuthorNav({ 
    onCustomizeProfileClick, 
    onAlbumPopupClick, 
    onPicturePopupClick 
}: AuthorNavProps) {
    return (
        <nav className="navigation">
            {navElements.map(({ id, name, action }) => (
                <span
                    key={id}
                    onClick={
                        action === "customizeProfile" ? onCustomizeProfileClick
                        : action === "openAlbumPopup" ? onAlbumPopupClick
                        : action === "openPicturePopup" ? onPicturePopupClick
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
