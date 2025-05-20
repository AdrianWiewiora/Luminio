import "./authorNav.scss";

const navElements = [
  { id: 0, name: "Dostosuj profil", action: "customizeProfile" },
  { id: 1, name: "Dodaj", action: "openAlbumPopup" },
];

interface AuthorNavProps {
  onCustomizeProfileClick: () => void;
  onAlbumPopupClick: () => void;
}

function AuthorNav({
  onCustomizeProfileClick,
  onAlbumPopupClick,
}: AuthorNavProps) {
  return (
    <nav className="navigation">
      {navElements.map(({ id, name, action }) => (
        <span
          key={id}
          onClick={action === "customizeProfile"
            ? onCustomizeProfileClick
            : action === "openAlbumPopup"
            ? onAlbumPopupClick
            : undefined}
        >
          {name}
        </span>
      ))}
    </nav>
  );
}

export default AuthorNav;