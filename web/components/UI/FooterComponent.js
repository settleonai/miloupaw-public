import React from "react";

export default function FooterComponent() {
  return (
    <footer className="py-12 bg-secondary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span>{`miloupaw © all rights reserved - Copyrights ${new Date().getFullYear()}`}</span>
      </div>
    </footer>
  );
}
