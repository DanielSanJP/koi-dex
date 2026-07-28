import { KoiFirstFrameImage } from "@/components/admin/koi-first-frame-image";
import { r2PublicUrl } from "@/lib/r2";
import type { Koi } from "@/lib/types";

type Props = {
  koi: Koi;
  className?: string;
  bufferWidth?: number;
};

/** A koi drawn the way the app draws it: body + tinted white fin sheets. */
export default function KoiComposite({ koi, className, bufferWidth }: Props) {
  return (
    <KoiFirstFrameImage
      bodyUrl={r2PublicUrl(koi.body)!}
      dominantTint={koi.fins.dominant}
      tailTint={koi.fins.tail}
      dorsalTint={koi.fins.dorsal}
      backFinTint={koi.fins.back}
      sideFinTint={koi.fins.side}
      alt={`${koi.name} koi`}
      className={className}
      bufferWidth={bufferWidth}
    />
  );
}
