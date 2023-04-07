import { useState } from "react";
import { Magic } from "magic-sdk";
import { Button } from "@chakra-ui/react";
import type { MagicUserMetadata } from 'magic-sdk/types';

const magic = new Magic("pk_live_47057EC7DC7D2202");

function ConnectMagic() {
  const [userMetadata, setUserMetadata] = useState<MagicUserMetadata | null>(null);

  async function connect() {
    try {
      await magic.auth.loginWithMagicLink({ email: "your@email.com" });
      const metadata = await magic.user.getMetadata();
      setUserMetadata(metadata);
    } catch (error) {
      console.error(error);
    }
  }

  async function logOut() {
    await magic.user.logout();
    setUserMetadata(null);
  }

  function log() {
    if (userMetadata === null || userMetadata === undefined) {
      connect();
    } else {
      logOut();
    }
  }

  const getEllipsisTxt = (str, n = 4) => {
    if (str) {
      return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
    }
    return "";
  };

  return (
    <>
      <Button
        ml={2}
        colorScheme="teal"
        variant="outline"
        fontSize={{ base: "ms", md: "md" }}
        cursor="pointer"
        textAlign="center"
        borderColor="teal"
        borderRadius="2xl"
        maxW="100%"
        onClick={log}
      >
        {userMetadata != null
          ? userMetadata.email + " as " + getEllipsisTxt(userMetadata.publicAddress)
          : "Login with Magic"}
      </Button>
    </>
  );
}

export default ConnectMagic;
