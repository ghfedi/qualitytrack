import React, { useState } from "react";
import { ProductionData } from "@/entities/ProductionData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

export default function DataImporter({ onImportComplete }) {
    const [isImporting, setIsImporting] = useState(false);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsImporting(true);

        try {
            const text = await file.text();
            const jsonData = JSON.parse(text);

            // Valider et nettoyer les données
            const validData = jsonData.filter(item =>
                item.date && item.poste && item.production_totale && item.quantite_rebut
            );

            // Insérer en lot
            await ProductionData.bulkCreate(validData);

            alert(`${validData.length} enregistrements importés avec succès !`);
            onImportComplete();

        } catch (error) {
            console.error("Erreur lors de l'import:", error);
            alert("Erreur lors de l'import du fichier JSON");
        } finally {
            setIsImporting(false);
        }
    };

    return (
        <div className="flex items-center gap-4">
            <Input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                disabled={isImporting}
            />
            <Button disabled={isImporting}>
                <Upload className="w-4 h-4 mr-2" />
                {isImporting ? "Import en cours..." : "Importer JSON"}
            </Button>
        </div>
    );
}
