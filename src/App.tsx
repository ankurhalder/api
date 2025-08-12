import React, { useState, useEffect, useRef } from "react";
import type { FC, ReactNode } from "react";
import { documentationData } from "./data";
import type { Section as SectionType, Endpoint as EndpointType } from "./types";
import "./styles.css";

const MenuIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);
const XIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
const ClipboardIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);
const CheckIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);
const SunIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);
const MoonIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const CodeBlock: FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    const textArea = document.createElement("textarea");
    textArea.value = code;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="code-block">
      <pre>
        <code>{code}</code>
      </pre>
      <button onClick={handleCopy}>
        {copied ? (
          <CheckIcon style={{ color: "var(--accent-green)" }} />
        ) : (
          <ClipboardIcon />
        )}
      </button>
    </div>
  );
};

const Endpoint: FC<{ endpoint: EndpointType }> = ({ endpoint }) => {
  const getMethodClass = (method: string) => {
    switch (method.toUpperCase()) {
      case "GET":
        return "get";
      case "POST":
        return "post";
      case "PATCH":
        return "patch";
      case "DELETE":
        return "delete";
      default:
        return "";
    }
  };

  return (
    <div id={endpoint.id} className="endpoint">
      <h4>{endpoint.title}</h4>
      <div className="endpoint-meta">
        <span className={`endpoint-method ${getMethodClass(endpoint.method)}`}>
          {endpoint.method}
        </span>
        <code className="endpoint-path">{endpoint.path}</code>
      </div>
      <p>{endpoint.description}</p>
      {endpoint.sampleRequest && (
        <div>
          <h5>Request Body</h5>
          <CodeBlock code={endpoint.sampleRequest} />
        </div>
      )}
      {endpoint.sampleResponse && (
        <div>
          <h5>Sample Response</h5>
          <CodeBlock code={endpoint.sampleResponse} />
        </div>
      )}
    </div>
  );
};

const Section: FC<{ section: SectionType }> = ({ section }) => {
  const parseContent = (text: string): ReactNode[] => {
    const parts = text.split(/(`[^`]+`)/g);
    return parts.map((part, i) =>
      part.startsWith("`") && part.endsWith("`") ? (
        <code key={i}>{part.slice(1, -1)}</code>
      ) : (
        part
      )
    );
  };

  return (
    <section id={section.id} className="section">
      <h2>{section.title}</h2>
      {section.content && <p>{parseContent(section.content)}</p>}
      {section.points && (
        <div>
          {section.points.map((point, index) => (
            <div key={index} className="point">
              <h3>{point.title}</h3>
              <div>{parseContent(point.content)}</div>
            </div>
          ))}
        </div>
      )}
      {section.subSections &&
        section.subSections.map((subSection, index) => (
          <div key={index} id={subSection.id}>
            {subSection.title && <h3>{subSection.title}</h3>}
            {subSection.endpoints &&
              subSection.endpoints.map((endpoint) => (
                <Endpoint key={endpoint.id} endpoint={endpoint} />
              ))}
          </div>
        ))}
    </section>
  );
};

const Sidebar: FC<{
  sections: SectionType[];
  activeSection: string;
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
  isOpen: boolean;
  theme: string;
  toggleTheme: () => void;
}> = ({ sections, activeSection, onLinkClick, isOpen, theme, toggleTheme }) => {
  return (
    <aside className={`sidebar custom-scrollbar ${isOpen ? "open" : "closed"}`}>
      <h3>API Sections</h3>
      <nav>
        <ul>
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(e) => onLinkClick(e, section.id)}
                className={activeSection === section.id ? "active" : ""}
              >
                {section.title}
              </a>
              {section.subSections && (
                <ul>
                  {section.subSections.map(
                    (sub) =>
                      sub.title && (
                        <li key={sub.id}>
                          <a
                            href={`#${sub.id}`}
                            onClick={(e) => onLinkClick(e, sub.id)}
                            className={activeSection === sub.id ? "active" : ""}
                          >
                            {sub.title}
                          </a>
                        </li>
                      )
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <button onClick={toggleTheme} className="theme-switcher">
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </button>
    </aside>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState("dark");
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const intersectingEntry = entries.find((entry) => entry.isIntersecting);
        if (intersectingEntry) {
          setActiveSection(intersectingEntry.target.id);
        }
      },
      { rootMargin: "-40% 0px -60% 0px", threshold: 0 }
    );

    const allIds: string[] = [];
    documentationData.sections.forEach((section) => {
      allIds.push(section.id);
      if (section.subSections) {
        section.subSections.forEach((sub) => {
          if (sub.title) allIds.push(sub.id);
        });
      }
    });

    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        sectionRefs.current[id] = el;
        observer.observe(el);
      }
    });

    const refs = sectionRefs.current;
    return () => {
      Object.values(refs).forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setSidebarOpen(false);
  };

  return (
    <div className="app-container">
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="sidebar-toggle"
      >
        {isSidebarOpen ? <XIcon /> : <MenuIcon />}
      </button>
      <div
        className={`sidebar-backdrop ${isSidebarOpen ? "visible" : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <Sidebar
        sections={documentationData.sections}
        activeSection={activeSection}
        onLinkClick={handleLinkClick}
        isOpen={isSidebarOpen}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="main-content">
        <div className="content-wrapper">
          <header className="header">
            <div className="header-gradient-box">
              <h1>{documentationData.title}</h1>
              <p>
                Version {documentationData.version} | Base URL:{" "}
                <code>{documentationData.baseUrl}</code>
              </p>
            </div>
          </header>

          <section id="quick-start" className="section">
            <h2>Quick Start Guide</h2>
            <div>
              {documentationData.quickStart.map((item, index) => (
                <div key={index} className="point">
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="introduction" className="section">
            <h2>Introduction</h2>
            <p>{documentationData.introduction}</p>
          </section>

          {documentationData.sections.map((section) => (
            <Section key={section.id} section={section} />
          ))}
        </div>
      </main>
    </div>
  );
}
