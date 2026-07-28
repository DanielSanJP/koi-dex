"use client"

import type { ReactNode } from "react"
import { r2PublicUrl } from "@/lib/r2"
import { KoiFirstFrameImage } from "@/components/admin/koi-first-frame-image"
import {
  LayeredPreviewImage,
  type PreviewCrop,
} from "@/components/admin/layered-preview-image"
import type { KoiTint } from "@/lib/koi-fin-urls"

export type ThumbnailItem = {
  category: string
  display_name: string
  preview_url?: string | null
  file_url?: string | null
  /** Runtime fin tint for koi composites; absent on other categories. */
  koiTint?: KoiTint | null
  /** render_layers stack (white masters + per-layer tint) — accessory/decoration.
   *  This is the on-koi/world art; the dashboard's Pond Preview reads it. */
  render_layers?:
    | { url: string; tint_hex?: string | null; blend?: string | null }[]
    | null
  /** Separately-framed preview stack for the card; preferred over render_layers
   *  and rendered with NO crop (it's already framed). */
  preview_render_layers?:
    | { url: string; tint_hex?: string | null; blend?: string | null }[]
    | null
  /** Stored derive transforms (normalized crop + rotation deg). */
  preview_crop?: PreviewCrop | null
  preview_rotation?: number | null
}

/**
 * Single source of truth for "how do we render a content item's thumbnail?".
 * Previously the koi-composite-vs-flat branch lived inline in 4 places
 * (asset cards, content overview, pass tier editor, reward picker modal).
 *
 * Per [[feedback-admin-koi-render]]: koi MUST use the body+fins composite via
 * KoiFirstFrameImage — never the static preview_url, which is stale for koi.
 * Other categories fall back to preview_url then file_url.
 */
export function ContentThumbnail({
  item,
  koiClassName,
  koiBufferWidth = 320,
  imgClassName,
  fallback,
  imageVersion,
}: {
  item: ThumbnailItem
  /** Class applied to the koi composite canvas. */
  koiClassName?: string
  /**
   * Canvas internal pixel width for the koi composite, in CSS pixels.
   * KoiFirstFrameImage multiplies by devicePixelRatio internally for
   * retina sharpness. Default 320 matches KoiFirstFrameImage's own default.
   * For tiles smaller than ~80px, pass a tighter value to save memory.
   */
  koiBufferWidth?: number
  /** Class applied to the flat img element. */
  imgClassName?: string
  /** Rendered when the item has no resolvable image. */
  fallback?: ReactNode
  /** Cache-buster appended to the flat img URL. Ignored by koi composite. */
  imageVersion?: number
}) {
  if (item.category === "koi" && item.file_url) {
    return (
      <KoiFirstFrameImage
        bodyUrl={r2PublicUrl(item.file_url) ?? ""}
        dominantTint={item.koiTint?.dominant ?? null}
        tailTint={item.koiTint?.tail ?? null}
        dorsalTint={item.koiTint?.dorsal ?? null}
        backFinTint={item.koiTint?.backFin ?? null}
        sideFinTint={item.koiTint?.sideFin ?? null}
        bodyTint={item.koiTint?.body ?? null}
        alt={item.display_name}
        className={koiClassName}
        bufferWidth={koiBufferWidth}
      />
    )
  }

  // Accessory/decoration with no baked preview → derive it live from the
  // render_layers stack (composite → crop → rotate), so a color variant needs
  // no per-color preview file. A set preview_url (custom upload or legacy bake)
  // takes precedence and falls through to the flat <img> below.
  const layerable =
    item.category === "accessory" || item.category === "decoration"
  if (layerable && !item.preview_url) {
    // Prefer the dedicated, pre-framed preview stack (rendered with NO crop);
    // else derive the card from the on-koi render_layers (crop + rotate).
    const usePreview = !!item.preview_render_layers?.length
    const src = usePreview ? item.preview_render_layers : item.render_layers
    const layers = (src ?? [])
      .map((l) => ({
        url: r2PublicUrl(l.url, imageVersion) ?? "",
        tint: l.tint_hex ?? null,
        blend: l.blend ?? null,
      }))
      .filter((l) => l.url)
    if (layers.length > 0) {
      return (
        <LayeredPreviewImage
          layers={layers}
          crop={usePreview ? null : item.preview_crop ?? null}
          rotation={usePreview ? null : item.preview_rotation ?? null}
          alt={item.display_name}
          className={imgClassName}
          bufferWidth={koiBufferWidth}
        />
      )
    }
  }

  const flat = r2PublicUrl(
    item.category === "koi"
      ? item.file_url
      : item.preview_url || item.file_url,
    imageVersion,
  )

  if (flat) {
    return <img src={flat} alt={item.display_name} className={imgClassName} />
  }

  return fallback ? <>{fallback}</> : null
}
