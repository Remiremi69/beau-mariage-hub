import { Sheet, SheetContent } from "@/components/ui/sheet";

// ── Types ──

export type DrawerSectionText = { type: 'text'; content: { body: string } };
export type DrawerSectionHighlight = { type: 'highlight'; content: { text: string } };
export type DrawerSectionList = { type: 'list'; content: { title?: string; items: string[] } };
export type DrawerSectionGallery = { type: 'gallery'; content: { images: string[]; caption?: string } };
export type DrawerSectionProfile = {
  type: 'profile';
  content: {
    imageSlot: string;
    imageUrl?: string;
    name: string;
    role: string;
    bio: string;
    details: string[];
  };
};

export type DrawerSection =
  | DrawerSectionText
  | DrawerSectionHighlight
  | DrawerSectionList
  | DrawerSectionGallery
  | DrawerSectionProfile;

export type DrawerContent = {
  label: string;
  title: string;
  subtitle?: string;
  sections: DrawerSection[];
};

type PresentationDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  content: DrawerContent;
};

// ── Section renderers ──

const SectionText = ({ body }: { body: string }) => (
  <p style={{
    fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 14,
    color: "rgba(232,221,208,0.65)", lineHeight: 1.85,
  }}>
    {body}
  </p>
);

const SectionHighlight = ({ text }: { text: string }) => (
  <p style={{
    fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic",
    fontSize: 22, color: "rgba(201,169,110,0.85)", lineHeight: 1.5,
    borderLeft: "2px solid rgba(201,169,110,0.40)", paddingLeft: 20,
  }}>
    {text}
  </p>
);

const SectionList = ({ title, items }: { title?: string; items: string[] }) => (
  <div>
    {title && (
      <p style={{
        fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 11,
        letterSpacing: "0.25em", textTransform: "uppercase",
        color: "rgba(201,169,110,0.55)", marginBottom: 14,
      }}>
        {title}
      </p>
    )}
    <div className="flex flex-col" style={{ gap: 10 }}>
      {items.map((item, i) => (
        <span key={i} style={{
          fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13,
          color: "rgba(232,221,208,0.65)", lineHeight: 1.6,
        }}>
          <span style={{ color: "rgba(201,169,110,0.60)" }}>— </span>{item}
        </span>
      ))}
    </div>
  </div>
);

const SectionGallery = ({ images, caption }: { images: string[]; caption?: string }) => (
  <div>
    <div className="grid grid-cols-2" style={{ gap: 8 }}>
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          style={{
            width: "100%", height: 160, objectFit: "cover",
            borderRadius: 2, border: "1px solid rgba(201,169,110,0.10)",
          }}
        />
      ))}
    </div>
    {caption && (
      <p style={{
        fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11,
        color: "rgba(232,221,208,0.30)", fontStyle: "italic",
        marginTop: 8, textAlign: "center",
      }}>
        {caption}
      </p>
    )}
  </div>
);

const SectionProfile = ({ content }: { content: DrawerSectionProfile['content'] }) => (
  <div>
    <div className="flex items-center" style={{ gap: 16 }}>
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: 72, height: 72, borderRadius: "50%",
          border: "1px solid rgba(201,169,110,0.40)",
          overflow: "hidden",
          background: "rgba(201,169,110,0.08)",
        }}
      >
        {content.imageUrl ? (
          <img src={content.imageUrl} alt={content.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.30)" strokeWidth="1.5">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
          </svg>
        )}
      </div>
      <div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 24, color: "#faf8f4" }}>
          {content.name}
        </p>
        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.45)" }}>
          {content.role}
        </p>
      </div>
    </div>
    <p style={{
      fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13,
      color: "rgba(232,221,208,0.65)", lineHeight: 1.8, marginTop: 16,
    }}>
      {content.bio}
    </p>
    {content.details.length > 0 && (
      <div className="flex flex-col" style={{ gap: 10, marginTop: 16 }}>
        {content.details.map((d, i) => (
          <span key={i} style={{
            fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13,
            color: "rgba(232,221,208,0.65)", lineHeight: 1.6,
          }}>
            <span style={{ color: "rgba(201,169,110,0.60)" }}>— </span>{d}
          </span>
        ))}
      </div>
    )}
  </div>
);

const renderSection = (section: DrawerSection, i: number) => {
  switch (section.type) {
    case 'text': return <SectionText key={i} body={section.content.body} />;
    case 'highlight': return <SectionHighlight key={i} text={section.content.text} />;
    case 'list': return <SectionList key={i} title={section.content.title} items={section.content.items} />;
    case 'gallery': return <SectionGallery key={i} images={section.content.images} caption={section.content.caption} />;
    case 'profile': return <SectionProfile key={i} content={section.content} />;
  }
};

// ── Main component ──

const PresentationDrawer = ({ isOpen, onClose, content }: PresentationDrawerProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent
        side="right"
        className="p-0 border-0 overflow-hidden"
        style={{
          width: "min(520px, 100vw)",
          maxWidth: "100vw",
          background: "#0d0b08",
          borderLeft: "1px solid rgba(201,169,110,0.20)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between"
          style={{
            padding: "32px 36px 24px",
            borderBottom: "1px solid rgba(201,169,110,0.10)",
          }}
        >
          <div>
            <p style={{
              fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 10,
              letterSpacing: "0.35em", textTransform: "uppercase",
              color: "rgba(201,169,110,0.55)", marginBottom: 8,
            }}>
              {content.label}
            </p>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
              fontStyle: "italic", fontSize: 32, color: "#faf8f4",
            }}>
              {content.title}
            </h3>
            {content.subtitle && (
              <p style={{
                fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13,
                color: "rgba(232,221,208,0.45)", marginTop: 4,
              }}>
                {content.subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center transition-colors duration-200"
            style={{
              width: 44, height: 44, background: "transparent", border: "none",
              fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 24,
              color: "rgba(232,221,208,0.40)", cursor: "pointer", flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(232,221,208,0.80)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(232,221,208,0.40)"; }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div
          className="flex flex-col"
          style={{
            overflowY: "auto",
            padding: "32px 36px 48px",
            gap: 36,
            height: "calc(100% - 120px)",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {content.sections.map((section, i) => renderSection(section, i))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PresentationDrawer;
