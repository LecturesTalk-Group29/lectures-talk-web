"use client";

import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
// import { isAuthenticated } from './authUtils';
import { useRouter } from 'next/navigation'
import { User, userPublisher }  from "./user";


// I feels that logic of this button is flawed and can be significantly improved
// CURRENT PROBLEM: Takes too long to process, UI shows unauth version for too long
// I want the app to have some kind on animation while the entire app is not loaded
// Problem: too user needs to wait longer untill the first paint.
// but it has an app with already properly applied CSS and JS that already ran
export default function TryNowButton({
    size,
    className,
    overrideText
}: {
    size: "small" | "medium" | "large";
    className?: string;
    overrideText?: string;
}) {
    const router = useRouter();
    // const { session, googleLogin } = useSession();
    // const [text, setText] = useState<string>("Try Now");
    const [userAuth, setUserAuth] = useState<User | null>(null);

    useEffect(() => {
        userPublisher.subscribe((value) => {
          setUserAuth(value);
        })
    }, []);

    // useEffect(() => {
    //     if (overrideText) {
    //         setText(overrideText);
    //         return;
    //     }
    //     if (isAuthenticated()) {
    //         setText('Post a lecture');
    //     } else {
    //         setText('Try Now');
    //     }
    // }, []);


    // GitHub Copilot yells at me: Yo, the endpoint you probably wanted to use is /lectures/new
    // not /lectures :P
    const handleClick = async () => {
        if (userAuth) {
            await router.push('/lectures');
        } else {
            await router.push('/login');
        }
    };

    return (
        <Button
            onClick={handleClick}
            variant="contained"
            size={size}
            className={className}
        >
            {userAuth ? (
                <p>Post a lecture</p>
            ) : (
                <p>Try Now</p>
            )}
        </Button>
    );
}