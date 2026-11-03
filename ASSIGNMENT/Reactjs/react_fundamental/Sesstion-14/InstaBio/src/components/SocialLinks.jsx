import React from "react";

function SocialLinks({ links, theme = "light" }) {
  return (
    <div className={`social-links ${theme}`}>
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          title={link.name}
        >
          {link.name}
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;