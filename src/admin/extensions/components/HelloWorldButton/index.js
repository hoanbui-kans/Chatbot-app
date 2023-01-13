import React from "react";
import { Button } from "@strapi/design-system/Button";
import Cross from "@strapi/icons/Cross";

const HelloWorldButton = () => {
  return (
    <Button
      variant="secondary"
      startIcon={<Cross />}
      onClick={() => alert("Hello World")}
    >
      Hello World
    </Button>
  );
};

export default HelloWorldButton;