import Intro from "./1-intro.mdx";
import Install from "./2-install.mdx";
import LocalDemo from "./3-local-demo.mdx";
import SolidDemo from "./4-solid-demo.mdx";
import DownstreamDemo from "./5-downstream-demo.mdx";
import Review from "./5-review.mdx";
import React from "./6-react.mdx";
import Bias from "./7-bias.mdx";
import {LIBRARY_RDFLIB} from "../../constants.ts";
import LibraryLayout from "../library-layout";

export default function Rdflib() {
    return (
        <LibraryLayout library={LIBRARY_RDFLIB}>
            <Intro/>
            <Install />
            <LocalDemo />
            <SolidDemo />
            <DownstreamDemo />
            <React/>
            <Review/>
            <Bias/>
        </LibraryLayout>
    )
}