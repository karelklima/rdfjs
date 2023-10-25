import {SubmitHandler} from "react-hook-form";
import {useEffect, useMemo, useState} from "react";
import {
    getLiteral, getSolidDataset, getThing, saveSolidDatasetAt, setLiteral, setThing, SolidDataset
} from "@inrupt/solid-client";
import {FOAF} from "@inrupt/vocab-common-rdf";
import {Literal} from "@rdfjs/types"
import {lit} from "rdflib";
import {useSolidAuth} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";

export default function InruptSolidDemo() {
    const {session, fetch} = useSolidAuth();
    const [dataset, setDataset] = useState<SolidDataset | null>(null);
    const profile = useMemo(
        () => dataset && session.webId && getThing(dataset, session.webId),
        [dataset, session.webId]
    );
    const name = useMemo(
        () => profile ? getLiteral(profile, FOAF.name)?.value || "" : "",
        [profile]
    );

    useEffect(() => {
        if (!session.webId) return;
        getSolidDataset(session.webId, {fetch}).then(setDataset)
    }, [fetch, session.webId]);

    if (!dataset || !session.webId || !profile) {
        return <Loading/>
    }

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const updatedProfile = setLiteral(profile, FOAF.name, lit(data.name) as Literal);
        const updatedDataset = setThing(dataset, updatedProfile);
        const savedDataset = await saveSolidDatasetAt(session.webId!, updatedDataset, {fetch});
        setDataset(savedDataset);
    };

    return <Demo name={name} onSubmit={onSubmit}/>
}