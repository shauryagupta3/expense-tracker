"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Image
          src={`${session.user?.image}`}
          width={70}
          height={100}
          alt={`${session.user?.name}'s image`}
          className="rounded-full"
        />
        {session.user?.name}
        <br />
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  } else {
    return (
      <>
        Not Signed in
        <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }
}

import React from "react";

const NavMenu = () => {
  return (
    <div>
      <AuthButton />
    </div>
  );
};

export default NavMenu;
