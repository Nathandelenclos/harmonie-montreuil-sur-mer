import Image from "next/image"

export default function BrandLogo() {
  return (
    <span className="inline-flex items-center gap-3">
      <Image src="/assets/brand/crest.webp" alt="" width={48} height={48} className="shrink-0" />
      <span className="flex flex-col gap-1">
        <span className="font-heading text-xl font-bold leading-none">Harmonie</span>{" "}
        <span className="text-xs font-medium leading-none">Montreuil-sur-Mer</span>
      </span>
    </span>
  )
}
