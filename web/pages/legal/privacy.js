import React from "react";
import PrivacyComponent from "../../components/legals/PrivacyComponent";
import LegalTemplate from "../../components/templates/LegalTemplate";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Privacy() {
  return (
    <LegalTemplate name="Privacy Policy">
      <PrivacyComponent />
    </LegalTemplate>
  );
}
