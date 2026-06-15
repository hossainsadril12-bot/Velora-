import Link from "next/link";

function CircleIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border border-cream text-cream">
      {children}
    </span>
  );
}

function Emblem() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-10 w-10 text-cream"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        {Array.from({ length: 16 }).map((_, i) => (
          <line
            key={i}
            x1="12"
            y1="12"
            x2="12"
            y2="2"
            transform={`rotate(${i * 22.5} 12 12)`}
          />
        ))}
      </g>
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

const GROUPS = {
  wine: {
    heading: "Wine & Estates",
    links: [
      { text: "San Felice Chianti Classico", href: "#" },
      { text: "Campogiovanni Montalcino", href: "#" },
      { text: "Bell'Aja Bolgheri", href: "#" },
      { text: "Our Wines", href: "#" },
    ],
  },
  info: {
    heading: "Info",
    links: [
      { text: "About Us", href: "#" },
      { text: "News & Events", href: "#" },
      { text: "Contact Us", href: "#" },
      { text: "Agents Area", href: "https://riservata.agricolasanfelice.it" },
    ],
  },
  allianz: {
    heading: "Allianz",
    links: [
      { text: "Code of Contact", href: "#" },
      { text: "Binding Corporate", href: "#" },
      { text: "Cookie Policy", href: "#" },
      { text: "Privacy Policy", href: "#" },
      { text: "Code of Ethics", href: "#" },
      { text: "Organization, Management and Control Model", href: "#" },
      { text: "Vendor Code of Conduct", href: "#" },
    ],
  },
};

function FooterGroup({
  heading,
  links,
}: {
  heading: string;
  links: { text: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="m-0 border-b border-cream pb-4 font-serif text-[18px] font-normal uppercase leading-none text-cream">
        {heading}
      </h4>

      <ul className="mt-6 flex flex-col gap-[14px]">
        {links.map((link) => (
          <li key={link.text}>
            <Link
              href={link.href}
              className="font-sans text-[15px] font-bold leading-none text-cream transition-opacity hover:opacity-70"
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-dark-green text-cream">
      <div className="mx-auto flex min-h-[760px] max-w-[1780px] flex-col px-6 pb-8 pt-[86px] lg:px-[78px]">
        {/* TOP AREA */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[48fr_52fr]">
          {/* LEFT CONTACT AREA */}
          <div className="pt-[110px]">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr] lg:gap-10">
              {/* Phone + Email */}
              <div className="flex flex-col gap-[22px]">
                <a
                  href="tel:+390577399111"
                  className="flex items-center gap-3 transition-opacity hover:opacity-80"
                >
                  <CircleIcon>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 3.5c0 5 4.5 9.5 9.5 9.5l1.5-2-3-1.5-1 1.2A8 8 0 014.8 5.5L6 4.5 4.5 1.5 3 3.5z"
                        fill="currentColor"
                      />
                    </svg>
                  </CircleIcon>

                  <span className="font-sans text-[16px] font-bold leading-none text-cream">
                    +39 0577 39911
                  </span>
                </a>

                <a
                  href="mailto:info@sanfelice.com"
                  className="flex items-center gap-3 transition-opacity hover:opacity-80"
                >
                  <CircleIcon>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <rect
                        x="2"
                        y="4"
                        width="12"
                        height="8"
                        rx="1"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M2.5 4.5L8 9l5.5-4.5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                    </svg>
                  </CircleIcon>

                  <span className="font-sans text-[16px] font-bold leading-none text-cream">
                    info@sanfelice.com
                  </span>
                </a>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <CircleIcon>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 1.5a4.5 4.5 0 00-4.5 4.5c0 3.3 4.5 8.5 4.5 8.5s4.5-5.2 4.5-8.5A4.5 4.5 0 008 1.5z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <circle cx="8" cy="6" r="1.6" fill="currentColor" />
                  </svg>
                </CircleIcon>

                <span className="max-w-[330px] font-sans text-[16px] font-bold leading-[1.25] text-cream">
                  Località San Felice
                  <br />
                  53019 Castelnuovo Berardenga (Siena)
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT AREA */}
          <div>
            {/* LOGO */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-4 leading-none">
                <span className="font-serif text-[48px] font-normal uppercase tracking-[0.12em] text-cream">
                  San
                </span>

                <Emblem />

                <span className="font-serif text-[48px] font-normal uppercase tracking-[0.12em] text-cream">
                  Felice
                </span>
              </div>

              <span className="mt-3 font-sans text-[8px] font-bold uppercase tracking-[4px] text-cream">
                Toscana A.D. 714
              </span>
            </div>

            {/* LINKS */}
            <div className="mt-[72px] grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
              <FooterGroup
                heading={GROUPS.wine.heading}
                links={GROUPS.wine.links}
              />

              <FooterGroup
                heading={GROUPS.info.heading}
                links={GROUPS.info.links}
              />

              <div className="sm:col-start-1">
                <FooterGroup
                  heading={GROUPS.allianz.heading}
                  links={GROUPS.allianz.links}
                />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM LEGAL TEXT */}
        <div className="mt-auto pt-20">
          <p className="mx-auto max-w-[1680px] text-center font-sans text-[15px] font-bold leading-[1.35] text-cream/35">
            Società Agricola San Felice S.p.a. Piazza Tre Torri 3, 20145 Milan
            Cod. Fisc. Partiva Iva e Registro Imprese di Siena N. 04116430150 -
            Capitale Sociale euro 21.052.800,00 I.V. - Società con Unico Socio,
            appartenente al Gruppo Assicurativo ALLIANZ,
            <br />
            iscritto all&apos;albo GRUPPI ASSICURATIVI N 018 soggetta alla
            direzione e coordinamento di ALLIANZ S.p.A
          </p>
        </div>
      </div>
    </footer>
  );
}