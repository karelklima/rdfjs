import {useSolidAuth} from "@ldo/solid-react";
import Login from "../login";

export default function SolidWarning() {
    const {session, login, logout} = useSolidAuth();

    return <>
        <h3 className={"subtitle is-4"}>A note on the use of Solid</h3>
        {session.isLoggedIn ? <>
            <div className="message is-success">
                <div className="message-body">You're all good! (Thanks for trusting us, we won't abuse that trust.)
                </div>
            </div>
            <button className="button is-small" onClick={logout}>Log out</button>
        </> : <>
            <div className="message is-warning">
                <div className="message-body">
                    The demos allow you to change the name described in your WebID profile. This means we will need at
                    least <strong>READ</strong> and <strong>APPEND</strong> access to your WebID resource. The latter
                    access mode provides a lot of possibilities for an app with malicious intent. Although we can
                    promise we won't betray that trust (and we do, pinky promise!), but you might want to consider
                    using this app (and other experimental apps like it) with a WebID that isn't vulnerable
                    (e.g. use a test account).
                </div>
            </div>
            <p>If you want, you can log in here, to verify that everything connects as it should.</p>
            <Login login={login}/>
        </>}
    </>;
}