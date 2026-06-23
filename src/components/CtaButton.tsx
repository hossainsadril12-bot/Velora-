import TransitionLink from "./TransitionLink";

type Variant = "dark-filled" | "cream-outlined" | "green-outlined" | "wine-outlined" | "mustard" | "tan" | "dark-outlined";

const base =
  "inline-block text-center uppercase font-sans font-bold text-[10px] tracking-[2.5px] px-[35px] py-[18px] border transition-colors duration-300 cursor-pointer";

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
  // wine red border/text -> inactive: filled, hover: outline
  "wine-outlined":
    "bg-wine-red text-cream border-wine-red hover:bg-transparent hover:text-wine-red",
  // mustard border/text -> inactive: filled, hover: outline/stroke only
  "mustard":
    "bg-mustard text-white border-mustard hover:bg-transparent hover:text-mustard",
  // tan border/text -> inactive: filled, hover: outline/stroke only
  "tan":
    "bg-tan text-white border-tan hover:bg-transparent hover:text-tan",
  // dark outline/text -> inactive: transparent, hover: fills dark
  "dark-outlined":
    "bg-transparent text-dark-text border-dark-text hover:bg-dark-text hover:text-cream",
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
    <TransitionLink href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </TransitionLink>
  );
}
