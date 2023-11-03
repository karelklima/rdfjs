import {useEffect, useState} from "react";
import {getSolidDataset, saveSolidDatasetAt, SolidDataset} from "@inrupt/solid-client";
import {useSolidAuth} from "@ldo/solid-react";

type SaveFunction = (updatedDataset: SolidDataset) => Promise<void>

export default function useSolidDataset(url: string | undefined, onError: (error: Error) => void): [SolidDataset | null, SaveFunction] {
    const {fetch} = useSolidAuth();
    const [dataset, setDataset] = useState<SolidDataset | null>(null);

    useEffect(() => {
        if (!url) return;
        getSolidDataset(url, {fetch}).then(setDataset)
            .catch(onError)
    }, [fetch, onError, url]);

    const saveDataset: SaveFunction = async (updatedDataset) => {
        if (!url) return;
        return saveSolidDatasetAt(url, updatedDataset, {fetch}).then(setDataset)
            .catch(onError);
    };

    return [dataset, saveDataset]
}