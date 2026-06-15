import Link from "next/link";

type Variant = "dark-filled" | "cream-outlined" | "green-outlined" | "wine-outlined";

const base =
  "inline-block uppercase font-sans font-bold text-[10px] tracking-[2.5px] px-[35px] py-[18px] border transition-colors duration-300 cursor-pointer";

const variants: Record<Variant, string> = {
  // dark green fill, cream text -> hover inverts to cream bg / green text
  "dark-filled":
    "bg-dark-green text-cream border-dark-green hover:bg-cream hover:text-dark-green",
  // transparent over dark sections, cream border/text -> hover fills cream
  "cream-outlined":
    "bg-transparent text-cream border-cream hover:bg-cream hover:text-dark-green",
  // transparent over light sections, green border/text -> hover fills green
  "green-outlined":
    "bg-transparent text-dark-green border-dark-green hover:bg-dark-green hover:text-cream",
  // wine red border/text -> hover fills wine red
  "wine-outlined":
    "bg-transparent text-wine-red border-wine-red hover:bg-wine-red hover:text-cream",
};

export default function CtaButton({
  children,
  variant = "dark-filled",
  href = "#",
  className = "",
}: {
  children: React.ReactNode;
  variant?: Variant;
  href?: string;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
