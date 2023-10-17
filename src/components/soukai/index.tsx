import SoukaiLocalDemo from "./local-demo";
import Code from "../code";
import localDemoCode from "./local-demo/index.tsx?raw";
import solidDemoCode from "./solid-demo/index.tsx?raw";
import IntroSection from "./intro.mdx";
import LocalCodeSection from "./local-demo/code.mdx";
import SolidCodeSection from "./solid-demo/code.mdx";
import Content from "../content";
import LogoutButton from "../logout-button";
import Login from "../login";
import {useSolidAuth} from "@ldo/solid-react";
import SoukaiSolidDemo from "./solid-demo";
import Review from "./review.mdx";
import LibraryHeader from "../library-header";
import {LIBRARY_SOUKAI} from "../../constants.ts";
import ReviewHeader from "../review-header";

export default function Soukai() {
    const {login, session} = useSolidAuth();
    return (
        <>
            <LibraryHeader library={LIBRARY_SOUKAI}/>
            <Content><IntroSection/></Content>
            <ReviewHeader library={LIBRARY_SOUKAI}/>
            <div id="local">
                <Code language={"tsx"} id="SoukaiLocalDemo" code={localDemoCode}>
                    <h2 className="subtitle is-3">Local demo</h2>
                    <SoukaiLocalDemo/>
                    <Content><LocalCodeSection/></Content>
                </Code>
            </div>
            <div id="solid">
                <Code language={"tsx"} id="SoukaiSolidDemo" code={solidDemoCode}>
                    <h2 className="subtitle is-3">Solid demo</h2>
                    {session.isLoggedIn ? <>
                        <SoukaiSolidDemo/>
                        <LogoutButton/>
                    </> : <Login login={(issuer) => login(issuer, {redirectUrl: location.href.replace(/#\S+$/, "")})}/>}
                    <Content><SolidCodeSection/></Content>
                </Code>
            </div>
            <Review/>
        </>
    )
}