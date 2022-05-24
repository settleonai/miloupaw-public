import React from "react";
import TermsComponent from "../../components/legals/TermsComponent";
import LegalTemplate from "../../components/templates/LegalTemplate";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function terms() {
  return (
    <LegalTemplate name="Terms and Conditions">
      <TermsComponent />
    </LegalTemplate>
  );
}
