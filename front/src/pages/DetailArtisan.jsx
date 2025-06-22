import { useParams } from "react-router-dom";

export default function DetailArtisan() {
  const { id } = useParams();
  return (
    <div className="py-5">
      <h2>Détails de l’artisan #{id}</h2>
      {/* À compléter avec l’appel API et l’affichage */}
    </div>
  );
}
